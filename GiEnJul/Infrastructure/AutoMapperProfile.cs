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

            CreateMap<Models.Person, Dtos.RecipientDataTableDto.PersonDataTableDto>();

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
                .ForMember(dest => dest.MatchedGiver, act => act.Ignore())
                .ForMember(dest => dest.FamilyId, act => act.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));


            CreateMap<Models.Recipient, Entities.Recipient>()
                .ForMember(dest => dest.RowKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.RowKey))))
                .ForMember(dest => dest.PartitionKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.PartitionKey))))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            CreateMap<Entities.Recipient, Models.Recipient>().ForMember(dest => dest.FamilyMembers, opt => opt.Ignore());

            CreateMap<Models.Recipient, Dtos.RecipientDataTableDto>();


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
            CreateMap<Models.Giver, Dtos.GiverDataTableDto>();

            //Connection mapping
            CreateMap<Entities.Connection, Utilities.ExcelClasses.DeliveryExcel>()
                .ForMember(dest => dest.Check, opt => opt.Ignore());

            CreateMap<Entities.Connection, Models.Giver>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.GiverFullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.GiverEmail))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.GiverPhoneNumber))
                .ForMember(dest => dest.MatchedRecipient, opt => opt.MapFrom(src => src.RowKey.Substring(src.RowKey.IndexOf('_') + 1))) //Rowkey is "rid_gid"
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.GiverLocation));

            CreateMap<Entities.Connection, Models.Recipient>()
                .ForMember(dest => dest.ContactFullName, opt => opt.MapFrom(src => src.SubmitterFullName))
                .ForMember(dest => dest.ContactEmail, opt => opt.MapFrom(src => src.SubmitterEmail))
                .ForMember(dest => dest.ContactPhoneNumber, opt => opt.MapFrom(src => src.SubmitterPhoneNumber))
                .ForMember(dest => dest.MatchedGiver, opt => opt.MapFrom(src => src.RowKey.Substring(0, src.RowKey.IndexOf('_') - 1))) //same as above
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.ReceiverLocation))
                .ForMember(dest => dest.FamilyMembers, act => act.Ignore());
        }
    }
}
