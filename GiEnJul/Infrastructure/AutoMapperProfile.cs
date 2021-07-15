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

            CreateMap<Entities.Person, Models.Person>();

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
                .ForMember(dest => dest.RowKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.RowKey))))
                .ForMember(dest => dest.PartitionKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.PartitionKey))))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            CreateMap<Entities.Recipient, Models.Recipient>().ForMember(dest => dest.FamilyMembers, opt => opt.Ignore());

            //Giver mapping
            CreateMap<Dtos.PostGiverDto, Models.Giver>()
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.HasConfirmedMatch, act => act.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, act => act.Ignore())
                .ForMember(dest => dest.MatchedRecipient, act => act.Ignore());

            CreateMap<Models.Giver, Entities.Giver>()
                .ForMember(dest => dest.RowKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.RowKey))))
                .ForMember(dest => dest.PartitionKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.PartitionKey))))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());

            CreateMap<Entities.Giver, Models.Giver>();

            CreateMap<Models.Giver, Dtos.PostGiverResultDto>();

        }
    }
}
