using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;

namespace GiEnJul.Test.ControllerTests
{
    public class BaseControllerTest
    {
        protected readonly ILogger _log = new LoggerConfiguration().WriteTo.Console().CreateLogger();
        protected IMapper _mapper = AutoMapperConfiguration.Initialize();
    }
}
