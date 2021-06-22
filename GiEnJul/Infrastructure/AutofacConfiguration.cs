﻿using Autofac;
using Serilog;
using GiEnJul.Models;
using GiEnJul.Features;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Configuration;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder, IConfiguration configuration)
        {
            var settings = new Settings(configuration);
            builder.Register(c => settings).As<ISettings>().InstancePerLifetimeScope();

            builder.RegisterInstance(AutoMapperConfiguration.Initialize()).SingleInstance();
            builder.RegisterType<PersonRepository>().As<IPersonRepository>().InstancePerLifetimeScope();
            builder.Register(c => new LoggerConfiguration()
                                .MinimumLevel.Debug()
                                .WriteTo.Console()
                                .CreateLogger()).As<ILogger>().SingleInstance();
        }
    }
}
