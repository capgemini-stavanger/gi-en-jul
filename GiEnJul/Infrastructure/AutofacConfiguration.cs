﻿using Autofac;
using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Serilog;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder, IConfiguration configuration)
        {
            var settings = new Settings(configuration);
            builder.Register(c => settings).As<ISettings>().InstancePerLifetimeScope();

            builder.RegisterInstance(AutoMapperConfiguration.Initialize()).SingleInstance();
            builder.RegisterType<HasScopeHandler>().As<IAuthorizationHandler>().SingleInstance();
            builder.RegisterType<PersonRepository>().As<IPersonRepository>().InstancePerLifetimeScope();
            builder.RegisterType<GiverRepository>().As<IGiverRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ConnectionRepository>().As<IConnectionRepository>().InstancePerLifetimeScope();
            builder.RegisterType<RecipientRepository>().As<IRecipientRepository>().InstancePerLifetimeScope();
            builder.RegisterType<EventRepository>().As<IEventRepository>().InstancePerLifetimeScope();
            builder.RegisterType<AutoIncrementRepository>().As<IAutoIncrementRepository>().InstancePerLifetimeScope();
            builder.RegisterType<EmailClient>().As<IEmailClient>().InstancePerLifetimeScope();
            builder.RegisterType<RecaptchaVerifier>().As<IRecaptchaVerifier>().InstancePerLifetimeScope();

            var logger = new LoggerConfiguration()
                                .MinimumLevel.Is(settings.LogLevel)
                                .WriteTo.Console()
                                .WriteTo.AzureTableStorage(CloudStorageAccount.Parse(settings.TableConnectionString), 
                                                        storageTableName: settings.LogTableName, 
                                                        writeInBatches: true)
                                .CreateLogger();

            builder.Register(c => logger).As<ILogger>().SingleInstance();
        }
    }
}
