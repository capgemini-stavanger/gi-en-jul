using Microsoft.Extensions.Configuration;
using Quartz;

namespace GiEnJul.Utilities
{
    public static class ServiceCollectionQuartzConfiguratorExtensions
    {
        public static IServiceCollectionQuartzConfigurator AddScheduledJob<T>(
        this IServiceCollectionQuartzConfigurator quartz,
        IConfiguration config)
        where T : IJob
        {
            var jobKey = new JobKey(typeof(T).Name);
            var schedulerStatement = config.GetSection("Jobs")
                                           .GetValue<string>(typeof(T).Name);

            quartz.AddJob<T>(c => c.WithIdentity(jobKey));
            quartz.AddTrigger(c => c.ForJob(jobKey)
#if DEBUG
                                    .StartNow() //Run job on immediatly in debug mode
#else
                                    .WithCronSchedule(schedulerStatement)
#endif                              
                                    );

            return quartz;
        }
    }
}
