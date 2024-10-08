﻿using AutoMapper;
using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Repositories;
using GiEnJul.Services;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http;

namespace GiEnJul.Infrastructure;

public static class ServiceConfiguration
{
    public static IServiceCollection ConfigureServices(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        var settings = new Settings(configuration);
        services.AddSingleton<ISettings>(s => settings);

        services.AddSingleton(AutoMapperConfiguration.Initialize());
        services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
        services.AddSingleton(h => new HttpClient());
        services.AddSingleton<IAuth0ManagementClient, Auth0ManagementClient>();
        services.AddSingleton<IMunicipalityBlobClient, MunicipalityBlobClient>();
        services.AddSingleton<IContactImagesBlobClient, ContactImagesBlobClient>(); 

        services.AddScoped<IPersonRepository, PersonRepository>();
        services.AddScoped<IGiverRepository, GiverRepository>();    
        services.AddScoped<IConnectionRepository, ConnectionRepository>();
        services.AddScoped<IRecipientRepository, RecipientRepository>();
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<IAutoIncrementRepository, AutoIncrementRepository>();
        services.AddScoped<ICmsRepository, CmsRepository>();
        services.AddScoped<IMunicipalityRepository,  MunicipalityRepository>();
        if (environment.IsDevelopment())
            { services.AddScoped<IEmailClient, EmailClient>(); }
        else { services.AddScoped<IEmailClient, SendGridEmailClient>(); }
        services.AddScoped<IRecaptchaVerifier, RecaptchaVerifier>();
        services.AddScoped<IEmailTemplateBuilder,  EmailTemplateBuilder>();
        services.AddScoped<IAuthorization, Authorization>();
        services.AddScoped<IAdminService, AdminService>();
        return services;

    }   
}
