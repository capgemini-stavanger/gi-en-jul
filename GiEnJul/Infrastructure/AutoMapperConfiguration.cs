using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static IMapper Initialize()
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
                mc.AddProfile(new ExcelProfile());
            });

            return mapperConfig.CreateMapper();
        }
    }
}
