using Autofac;
using GiEnJul.Models;
using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Infrastructure
{
    public static class AutofacConfiguration
    {
        public static void Configure(ContainerBuilder builder)
        {
            builder.RegisterType<GenericRepository<TableEntity>>().As<IGenericRepository<TableEntity>>().InstancePerLifetimeScope();
        }
    }
}
