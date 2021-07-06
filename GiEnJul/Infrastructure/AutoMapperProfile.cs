using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Person mapping
            CreateMap<Dtos.PostPersonDto, Models.Person>()
                .ForMember(dest => dest.RowKey, act => act.Ignore())
                .ForMember(dest => dest.PartitionKey, act => act.Ignore());

            CreateMap<Models.Person, Entities.Person>()
                .ConstructUsing(src => new Entities.Person(src.PartitionKey))
                .ForMember(dest => dest.RowKey, act => act.Ignore())
                .ForMember(dest => dest.PartitionKey, act => act.Ignore())
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());

            //Recipient mapping
            CreateMap<Dtos.PostRecipientDto, Models.Recipient>()
                .ForMember(dest => dest.RowKey, act => act.Ignore())
                .ForMember(dest => dest.PartitionKey, act => act.Ignore())
                .ForMember(dest => dest.EventName, act => act.Ignore())
                .ForMember(dest => dest.FamilyMembers, opt => opt.MapFrom(src => src.FamilyMembers))
                .ForMember(dest => dest.HasConfirmedMatch, act => act.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, act => act.Ignore())
                .ForMember(dest => dest.MatchedGiver, act => act.Ignore());

            CreateMap<Models.Recipient, Entities.Recipient>()
                .ConstructUsing(x => new Entities.Recipient(x.Location, x.EventName))
                .ForMember(dest => dest.RowKey, act => act.Ignore())
                .ForMember(dest => dest.PartitionKey, act => act.Ignore())
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            //Giver mapping
            CreateMap<Dtos.PostGiverDto, Models.Giver>()
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.HasConfirmedMatch, act => act.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, act => act.Ignore())
                .ForMember(dest => dest.MatchedRecipient, act => act.Ignore());

            CreateMap<Models.Giver, Entities.Giver>()
                .ConstructUsing(x => new Entities.Giver(x.Location, x.EventName))
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());
        }
    }
}
