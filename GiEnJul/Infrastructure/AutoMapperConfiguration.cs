using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static IMapper Initialize()
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {


                mc.CreateMap<Entities.Person, Models.Person>();//.ForMember(x => x.Gender, opt => opt.MapFrom(src => src.Gender));
                mc.CreateMap<Models.Person, Entities.Person>();//.ForMember(x => x.Gender, opt => opt.MapFrom(src => src.Gender));


                mc.AddProfile(new AutoMapperProfile());
            });
            return mapperConfig.CreateMapper();
        }
    }
}
