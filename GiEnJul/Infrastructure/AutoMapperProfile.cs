using AutoMapper;
using GiEnJul.Dtos;
using System;

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

            CreateMap<Dtos.PutPersonDto, Models.Person>();

            CreateMap<Models.Person, Dtos.RecipientDataTableDto.PersonDataTableDto>();

            CreateMap<Entities.Person, Models.Person>();

            CreateMap<Models.Person, Entities.Person>()
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.RowKey) ? Guid.NewGuid().ToString() : src.RowKey))
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());
            CreateMap<(Models.Giver, Models.Recipient), GetConnectionDto>()
                .ForMember(dest => dest.Confirmed, opt => opt.MapFrom(src => src.Item1.HasConfirmedMatch))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Item1.FullName))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Item1.PhoneNumber))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.Item2.PersonCount))
                .ForMember(dest => dest.FamilyId, opt => opt.MapFrom(src => src.Item2.FamilyId));

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

            CreateMap<Dtos.PutRecipientDto, Models.Recipient>()
                .ForMember(dest => dest.FamilyMembers, opt => opt.MapFrom(src => src.FamilyMembers))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count));

            CreateMap<Models.Recipient, Entities.Recipient>()
                .ForMember(dest => dest.RowKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.RowKey))))
                .ForMember(dest => dest.PartitionKey, opt => opt.Condition(src => (!string.IsNullOrEmpty(src.PartitionKey))))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.PersonCount));

            CreateMap<Entities.Recipient, Models.Recipient>().ForMember(dest => dest.FamilyMembers, opt => opt.Ignore());

            CreateMap<Models.Recipient, Dtos.RecipientDataTableDto>();


            //Giver mapping
            CreateMap<Dtos.PostGiverDto, Models.Giver>()
                .ForMember(x => x.PartitionKey, opt => opt.Ignore())
                .ForMember(x => x.RowKey, opt => opt.Ignore())
                .ForMember(x => x.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.HasConfirmedMatch, act => act.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, act => act.Ignore())
                .ForMember(dest => dest.MatchedRecipient, act => act.Ignore())
                .ForMember(dest => dest.RegistrationDate, opt => opt.Ignore());
            

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
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.GiverLocation))
                .ForMember(dest => dest.RegistrationDate, opt => opt.Ignore());


            CreateMap<Entities.Connection, Models.Recipient>()
                .ForMember(dest => dest.ContactFullName, opt => opt.MapFrom(src => src.SubmitterFullName))
                .ForMember(dest => dest.ContactEmail, opt => opt.MapFrom(src => src.SubmitterEmail))
                .ForMember(dest => dest.ContactPhoneNumber, opt => opt.MapFrom(src => src.SubmitterPhoneNumber))
                .ForMember(dest => dest.MatchedGiver, opt => opt.MapFrom(src => src.RowKey.Substring(0, src.RowKey.IndexOf('_') - 1))) //same as above
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.ReceiverLocation))
                .ForMember(dest => dest.FamilyMembers, act => act.Ignore());

            //Event mapping
            CreateMap<Dtos.PostEventDto, Models.Event>()
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.EventName))
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => src.City));

            CreateMap<Models.Event, Entities.Event>()
                .ForMember(dest => dest.Timestamp, opt => opt.Ignore())
                .ForMember(dest => dest.ETag, opt => opt.Ignore());

            CreateMap<Entities.Event, Models.Event>();

            CreateMap<Models.Event, GetContactsDto>()
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.RowKey));
        }
    }
}
