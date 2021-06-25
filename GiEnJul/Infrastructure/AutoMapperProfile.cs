using AutoMapper;

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
            CreateMap<Models.Giver, Entities.Connection>();
            CreateMap<Models.Recipient, Entities.Connection>();
            CreateMap<Models.Giver, Entities.Connection>()
                .ForMember(dest => dest.GiverEmail, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.GiverFullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.GiverLocation, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.GiverPhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.SubmitterEmail, opt => opt.MapFrom(src => src.Receiver.ContactEmail))
                .ForMember(dest => dest.SubmitterFullName, opt => opt.MapFrom(src => src.Receiver.ContactFullName))
                .ForMember(dest => dest.SubmitterPhoneNumber, opt => opt.MapFrom(src => src.Receiver.ContactPhoneNumber))
                .ForMember(dest => dest.ReceiverLocation, opt => opt.MapFrom(src => src.Receiver.Location))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.Receiver.FamilyMembers.Count));
            CreateMap<Models.Recipient, Entities.Connection>()
                .ForMember(dest => dest.GiverEmail, opt => opt.MapFrom(src => src.Giver.Email))
                .ForMember(dest => dest.GiverFullName, opt => opt.MapFrom(src => src.Giver.FullName))
                .ForMember(dest => dest.GiverLocation, opt => opt.MapFrom(src => src.Giver.Location))
                .ForMember(dest => dest.GiverPhoneNumber, opt => opt.MapFrom(src => src.Giver.PhoneNumber))
                .ForMember(dest => dest.SubmitterEmail, opt => opt.MapFrom(src => src.ContactEmail))
                .ForMember(dest => dest.SubmitterFullName, opt => opt.MapFrom(src => src.ContactFullName))
                .ForMember(dest => dest.SubmitterPhoneNumber, opt => opt.MapFrom(src => src.ContactPhoneNumber))
                .ForMember(dest => dest.ReceiverLocation, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));
            CreateMap<Entities.Recipient, Models.Recipient>();
            CreateMap<Models.Recipient, Entities.Recipient>();
        }
    }
}
