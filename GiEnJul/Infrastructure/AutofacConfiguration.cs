﻿using Autofac;
using GiEnJul.Features;
using Microsoft.Azure.Cosmos.Table;
using GiEnJul.Models;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfiguration.Initialize()).SingleInstance();
            builder.RegisterType<GenericRepository<TableEntity>>().As<IGenericRepository<TableEntity>>().InstancePerLifetimeScope();
            builder.RegisterType<PersonRepository>().As<IPersonRepository>().InstancePerLifetimeScope();

        }
    }
}
