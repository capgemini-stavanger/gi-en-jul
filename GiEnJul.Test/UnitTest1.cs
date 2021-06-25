
using Xunit;

namespace GiEnJul.Test
{
    public class Tests
    {
        bool GlobalVariable { get; set; }

        public Tests()
        {
            //Constructor is run before each test
            GlobalVariable = true;
        }

        [Fact]
        public void Test1()
        {
            Assert.True(GlobalVariable);
        }
        
        [Fact]
        public void Test2()
        {
            GlobalVariable = false;
            Assert.False(GlobalVariable);
        }
    }
}