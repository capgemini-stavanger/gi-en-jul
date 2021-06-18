using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfiguration.Initialize()).SingleInstance();
        }
    }
}
