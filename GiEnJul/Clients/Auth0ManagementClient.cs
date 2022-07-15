﻿using Auth0.ManagementApi;
using GiEnJul.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace GiEnJul.Clients
{
    public interface IAuth0ManagementClient
    {
        Task<string> GetTokenAsync();
        Task<Dictionary<string, string>> GetUserMetadata(string userId, bool forceUpdate = false);
    }

    public class Auth0ManagementClient : IAuth0ManagementClient
    {
        private readonly ISettings _settings;
        private readonly HttpClient _client;
        private static MemoryCache _tokenCache = new MemoryCache("tokenCache");
        private static MemoryCache _metadataCache = new MemoryCache("metadataCache");

        public Auth0ManagementClient(ISettings settings, HttpClient client)
        {
            _settings = settings;
            _client = client;
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

            if(!tokenDict.ContainsKey("access_token"))
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

            var token = await GetTokenAsync(); ;
            var client2 = new ManagementApiClient(token, _settings.Auth0Settings.Domain);
            var us = await client2.Users.GetAsync(userId);

            var userMetadata = (JObject)us.UserMetadata;
            var metadataDict = JsonConvert.DeserializeObject<Dictionary<string, string>>(userMetadata.ToString());

            _metadataCache.Add(userId, metadataDict, DateTime.Now.AddMinutes(10));
            return metadataDict;
        }
    }
}