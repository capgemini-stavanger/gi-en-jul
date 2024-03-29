﻿using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using GiEnJul.Dtos;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace GiEnJul.Clients
{
    public interface IAuth0ManagementClient
    {
        Task<string> GetTokenAsync();
        Task<Dictionary<string, string>> GetUserMetadata(string userId, bool forceUpdate = false);
        Task<User> CreateUser(CreateUserDto userDto);
        Task<List<User>> GetAllUsers();
        Task DeleteUser(string email);
        Task<User> GetSingleUser(string email);
        Task AddUserRole(User user, string roleId);
        Task UpdateUserRole(User user, List<string> roles);
        Task RemoveUserRole(User user, string roleId);
    }

    public class Auth0ManagementClient : IAuth0ManagementClient
    {
        private readonly ISettings _settings;
        private readonly HttpClient _client;
        private readonly ManagementApiClient _managementApiClient;

        private static MemoryCache _tokenCache = new MemoryCache("tokenCache");
        private static MemoryCache _metadataCache = new MemoryCache("metadataCache");

        public Auth0ManagementClient(ISettings settings, HttpClient client)
        {
            _settings = settings;
            _client = client;
            _managementApiClient = new ManagementApiClient("", settings.Auth0Settings.Domain);
        }

        public async Task<string> GetTokenAsync()
        {
            var cachedToken = _tokenCache.Get("token");
            if (cachedToken != null)
                return (string)cachedToken;

            var request = new HttpRequestMessage(HttpMethod.Post, $"https://{_settings.Auth0Settings.Domain}/oauth/token");

            var parameters = new StringBuilder();
            parameters.Append($"grant_type=client_credentials");
            parameters.Append($"&client_id={_settings.Auth0Settings.ManagementClientId}");
            parameters.Append($"&client_secret={_settings.Auth0Settings.ManagementClientSecret}");
            parameters.Append($"&audience=https%3A%2F%2F{_settings.Auth0Settings.Domain}%2Fapi%2Fv2%2F");

            request.Content = new StringContent(parameters.ToString(), Encoding.UTF8, "application/x-www-form-urlencoded");
            var resp = await _client.SendAsync(request);
            var tokenResp = await resp.Content.ReadAsStringAsync();

            if (!resp.IsSuccessStatusCode)
                throw new Exception($"Could not get token, statusCode: {resp.StatusCode}, message: {tokenResp}");

            var tokenDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(tokenResp);

            if (!tokenDict.ContainsKey("access_token"))
                throw new Exception($"Token response did not contain the access_token key");

            var token = tokenDict["access_token"];
            _tokenCache.Add("token", token, DateTime.Now.AddSeconds(double.Parse(tokenDict?["expires_in"] ?? "3600")));

            return token;
        }

        public async Task<Dictionary<string, string>> GetUserMetadata(string userId, bool forceUpdate = false)
        {
            var cachedMD = (Dictionary<string, string>)_metadataCache.Get(userId);
            if (!forceUpdate && cachedMD != null)
                return cachedMD;

            var token = await GetTokenAsync();
            _managementApiClient.UpdateAccessToken(token);
            var us = await _managementApiClient.Users.GetAsync(userId);

            var userMetadata = (JObject)us.UserMetadata;
            var appMetadata = (JObject)us.AppMetadata;
            var metadataDict = userMetadata.ToObject<Dictionary<string, string>>();

            metadataDict.AddDictionary(appMetadata.ToObject<Dictionary<string, string>>(), CombineStrategy.takeFirst);
            _metadataCache.Add(userId, metadataDict, DateTime.Now.AddMinutes(10));
            return metadataDict;
        }

        public async Task<List<User>> GetAllUsers()
        {
            var token = await GetTokenAsync();
            _managementApiClient.UpdateAccessToken(token);
            var request = new GetUsersRequest();
            var users = await _managementApiClient.Users.GetAllAsync(request);

            var adminUsers = await _managementApiClient.Roles.GetUsersAsync(_settings.Auth0Settings.Admin);
            var superAdminUsers = await _managementApiClient.Roles.GetUsersAsync(_settings.Auth0Settings.SuperAdmin);
            var institutionUsers = await _managementApiClient.Roles.GetUsersAsync(_settings.Auth0Settings.Institution);

            return users.Where(u => adminUsers.Any(a => a.UserId == u.UserId)
                            || superAdminUsers.Any(a => a.UserId == u.UserId)
                            || institutionUsers.Any(a => a.UserId == u.UserId))
                .ToList();
        }

        public async Task<User> GetSingleUser(string email)
        {
            var users = await GetAllUsers();
            return users.Where(u => u.Email == email).SingleOrDefault();
        }

        public async Task DeleteUser(string email)
        {
            var user = await GetSingleUser(email);
            if (user != null)
                await _managementApiClient.Users.DeleteAsync(user.UserId);
            throw new Exception($"Could not find user {email}");
        }

        public async Task<User> CreateUser(CreateUserDto userDto)
        {
            var token = await GetTokenAsync();
            var newUser = new UserCreateRequest
            {
                Connection = "Username-Password-Authentication",
                Email = userDto.Email,
                Password = userDto.Password,
                NickName = userDto.Email.Split('@')[0],
                UserMetadata = new
                {
                    location = userDto.Location,

                },
                AppMetadata = new
                {
                    role = userDto.Role,
                    institution = userDto.Institution
                }
            };
            _managementApiClient.UpdateAccessToken(token);
            return await _managementApiClient.Users.CreateAsync(newUser);
        }

        private JObject GenerateMetadata(MetaDataType type, CreateUserDto userDto)
        {
            if (type == MetaDataType.user_metadata)
                return JObject.FromObject(new Dictionary<string, string>() {
                    { "role", userDto.Role},
                    { "institution", userDto.Institution}
                });
            return JObject.FromObject(new Dictionary<string, string>() {
                    { "location", userDto.Location}
                });
        }

        public async Task AddUserRole(User user, string roleId)
        {
            var currentRoles = await _managementApiClient.Users.GetRolesAsync(user.UserId);
            var roles = currentRoles.Select(role => role.Id).ToList();
            roles.Add(roleId);
            await UpdateUserRole(user, roles);
        }

        public async Task RemoveUserRole(User user, string roleId)
        {
            var currentRoles = await _managementApiClient.Users.GetRolesAsync(user.UserId);
            var roles = currentRoles.Select(role => role.Id).ToList();
            roles.RemoveAll(role => role == roleId);
            await UpdateUserRole(user, roles);
        }

        public async Task UpdateUserRole(User user, List<string> roles)
        {
            var newRoles = new AssignRolesRequest()
            {
                Roles = roles.Distinct().ToArray()
            };
            await _managementApiClient.Users.AssignRolesAsync(user.UserId, newRoles);
        }
    }
}
