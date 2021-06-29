using GiEnJul.Infrastructure;
using Xunit;

namespace GiEnJul.Test.InfrastructureTests
{
    public class AutoMapperTest
    {
        [Fact] 
        public void TestAutoMapperConfiguration() 
        { 
            AutoMapperConfiguration.Initialize().ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
