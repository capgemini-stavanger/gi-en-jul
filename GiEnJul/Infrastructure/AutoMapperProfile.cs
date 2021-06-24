using AutoMapper;
using GiEnJul;

namespace GiEnJul.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Entities.Person, Models.Person>();
            CreateMap<Models.Person, Entities.Person>();
            CreateMap<Entities.Giver, Models.Giver>();
            CreateMap<Models.Giver, Entities.Giver>();
            CreateMap<Entities.Recipient, Models.Recipient>();
            CreateMap<Models.Recipient, Entities.Recipient>();
        }
    }
}
