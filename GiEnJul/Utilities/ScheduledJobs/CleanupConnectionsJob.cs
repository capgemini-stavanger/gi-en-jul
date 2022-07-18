using GiEnJul.Repositories;
using Quartz;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Utilities.ScheduledJobs
{
    public class CleanupConnectionsJob : IJob
    {
        private readonly ILogger _log;
        private readonly IGiverRepository _giverRepository;

        public CleanupConnectionsJob(ILogger log, IGiverRepository giverRepository)
        {
            _log = log;
            _giverRepository = giverRepository;
        }
        
        public async Task Execute(IJobExecutionContext context)
        {
            _log.Information("Start Job");
            await Task.Delay(150);
            _log.Information("Stop Job");
        }
    }
}
