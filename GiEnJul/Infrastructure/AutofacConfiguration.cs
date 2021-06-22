using Autofac;
using GiEnJul.Features;
using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfiguration.Initialize()).SingleInstance();
            builder.RegisterType<PersonRepository>().As<IPersonRepository>().InstancePerLifetimeScope();
        }
    }
}
