using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Entities.Person, Models.Person>();
            CreateMap<Models.Person, Entities.Person>();

            CreateMap<Models.Recipient, Entities.Connection>()
                .ForMember(dest => dest.GiverEmail, opt => opt.MapFrom(src => src.Giver.Email))
                .ForMember(dest => dest.GiverFullName, opt => opt.MapFrom(src => src.Giver.FullName))
                .ForMember(dest => dest.GiverLocation, opt => opt.MapFrom(src => src.Giver.Location))
                .ForMember(dest => dest.GiverPhoneNumber, opt => opt.MapFrom(src => src.Giver.PhoneNumber))
                .ForMember(dest => dest.MaxReceivers, opt => opt.MapFrom(src => src.Giver.MaxRecievers))
                .ForMember(dest => dest.SubmitterEmail, opt => opt.MapFrom(src => src.ContactEmail))
                .ForMember(dest => dest.SubmitterFullName, opt => opt.MapFrom(src => src.ContactFullName))
                .ForMember(dest => dest.SubmitterPhoneNumber, opt => opt.MapFrom(src => src.ContactPhoneNumber))
                .ForMember(dest => dest.ReceiverLocation, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            CreateMap<Entities.Recipient, Models.Recipient>()
                .ForMember(dest => dest.FamilyMembers, act => act.Ignore())
                .ForMember(dest => dest.Giver, act => act.Ignore());

            CreateMap<Models.Recipient, Entities.Recipient>()
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            CreateMap<Dtos.PostGiverDto, Models.Giver>()
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.EventName, opt => opt.Ignore());

            CreateMap<Models.Giver, Entities.Giver>()
                .ConstructUsing(x => new Entities.Giver(x.Location, x.EventName))
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());
        }
    }
}
