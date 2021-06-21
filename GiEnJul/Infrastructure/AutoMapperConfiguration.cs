using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static IMapper Initialize()
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.CreateMap<Entities.Person, Models.Person>();
                mc.CreateMap<Models.Person, Entities.Person>();
                mc.AddProfile(new AutoMapperProfile());
            });
            return mapperConfig.CreateMapper();
        }
    }
}
