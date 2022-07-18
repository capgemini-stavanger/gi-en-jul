using AutoMapper;
using GiEnJul.Dtos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace GiEnJul.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Person mapping
            CreateMap<Dtos.PostPersonDto, Models.Person>()
                .ForMember(dest => dest.PersonId, opt => opt.Ignore())
                .ForMember(dest => dest.RecipientId, opt => opt.Ignore());

            CreateMap<Dtos.PutPersonDto, Models.Person>();

            CreateMap<Models.Person, Dtos.RecipientDataTableDto.PersonDataTableDto>();

            CreateMap<Entities.Person, Models.Person>()
                .ForMember(dest => dest.PersonId, opt => opt.MapFrom(src => src.RowKey))
                .ForMember(dest => dest.RecipientId, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.Wishes, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<IEnumerable<string>>(src.Wishes)));

            CreateMap<Models.Person, Entities.Person>()
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PersonId) ? Guid.NewGuid().ToString() : src.PersonId))
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.RecipientId))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.Wishes, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Wishes)));

            CreateMap<(Models.Giver, Models.Recipient), GetConnectionDto>()
                .ForMember(dest => dest.Confirmed, opt => opt.MapFrom(src => src.Item1.HasConfirmedMatch))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Item1.FullName))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Item1.PhoneNumber))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.Item2.PersonCount))
                .ForMember(dest => dest.FamilyId, opt => opt.MapFrom(src => src.Item2.FamilyId))
                .ForMember(dest => dest.SubmitterFullName, opt => opt.MapFrom(src => src.Item2.ContactFullName))
                .ForMember(dest => dest.SubmitterEmail, opt => opt.MapFrom(src => src.Item2.ContactEmail));

            //Recipient mapping
            CreateMap<Dtos.PostRecipientDto, Models.Recipient>()
                .ForMember(dest => dest.RecipientId, opt => opt.Ignore())
                .ForMember(dest => dest.Event, opt => opt.Ignore())
                .ForMember(dest => dest.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.FamilyMembers, opt => opt.MapFrom(src => src.FamilyMembers))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.MatchedGiver, opt => opt.Ignore())
                .ForMember(dest => dest.FamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count))
                .ForMember(dest => dest.Comment, opt => opt.Ignore());

            CreateMap<Dtos.PutRecipientDto, Models.Recipient>()
                .ForMember(dest => dest.Event, opt => opt.Ignore())
                .ForMember(dest => dest.RecipientId, opt => opt.Ignore())
                .ForMember(dest => dest.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.FamilyMembers, opt => opt.MapFrom(src => src.FamilyMembers))
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.FamilyMembers.Count))
                .ForMember(dest => dest.FamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.MatchedGiver, opt => opt.Ignore())
                .ForMember(dest => dest.Location, opt => opt.Ignore())
                .ForMember(dest => dest.ContactFullName, opt => opt.Ignore())
                .ForMember(dest => dest.ContactEmail, opt => opt.Ignore())
                .ForMember(dest => dest.ContactPhoneNumber, opt => opt.Ignore())
                .ForMember(dest => dest.Institution, opt => opt.Ignore())
                .ForMember(dest => dest.Comment, opt => opt.Ignore());

            CreateMap<Models.Recipient, Entities.Recipient>()
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.RecipientId) ? Guid.NewGuid().ToString() : src.RecipientId))
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Event) ? $"{src.EventName}_{src.Location}" : src.Event))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore())
                .ForMember(dest => dest.PersonCount, opt => opt.MapFrom(src => src.PersonCount));

            CreateMap<Entities.Recipient, Models.Recipient>()
                .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.RecipientId, opt => opt.MapFrom(src => src.RowKey))
                .ForMember(dest => dest.FamilyMembers, opt => opt.Ignore());

            CreateMap<Models.Recipient, Dtos.RecipientDataTableDto>();


            //Giver mapping
            CreateMap<Dtos.PostGiverDto, Models.Giver>()
                .ForMember(x => x.Event, opt => opt.Ignore())
                .ForMember(x => x.GiverId, opt => opt.Ignore())
                .ForMember(x => x.EventName, opt => opt.Ignore())
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.Ignore())
                .ForMember(dest => dest.MatchedRecipient, opt => opt.Ignore())
                .ForMember(dest => dest.MatchedFamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.RegistrationDate, opt => opt.Ignore())
                .ForMember(dest => dest.CancelFeedback, opt => opt.Ignore())
                .ForMember(dest => dest.CancelDate, opt => opt.Ignore())
                .ForMember(dest => dest.CancelFamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.Comment, opt => opt.Ignore());


            CreateMap<Models.Giver, Entities.Giver>()
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => src.GiverId))
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.Event))
                .ForMember(dest => dest.MatchedFamilyId, opt => opt.MapFrom(src => src.MatchedFamilyId))
                .ForMember(x => x.Timestamp, opt => opt.Ignore())
                .ForMember(x => x.ETag, opt => opt.Ignore());

            CreateMap<Entities.Giver, Models.Giver>()
                .ForMember(dest => dest.GiverId, opt => opt.MapFrom(src => src.RowKey))
                .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.PartitionKey));

            CreateMap<Models.Giver, Dtos.PostGiverResultDto>();
            CreateMap<Models.Giver, Dtos.GiverDataTableDto>()
                .ForMember(dest => dest.GiverId, opt => opt.MapFrom(src => src.GiverId))
                .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.Event));

            //Connection mapping
            CreateMap<Entities.Connection, Utilities.ExcelClasses.DeliveryExcel>()
                .ForMember(dest => dest.Check, opt => opt.Ignore());

            CreateMap<Entities.Connection, Models.Giver>()
                .ForMember(dest => dest.GiverId, opt => opt.MapFrom(src => src.RowKey.Substring(src.RowKey.IndexOf('_') + 1)))
                .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.GiverFullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.GiverEmail))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.GiverPhoneNumber))
                .ForMember(dest => dest.MatchedRecipient, opt => opt.MapFrom(src => src.RowKey.Substring(0, src.RowKey.IndexOf('_') - 1))) //Rowkey is "rid_gid"
                .ForMember(dest => dest.MatchedFamilyId, opt => opt.MapFrom(src => src.FamilyId))
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.GiverLocation))
                .ForMember(dest => dest.RegistrationDate, opt => opt.Ignore())
                .ForMember(dest => dest.CancelFeedback, opt => opt.Ignore())
                .ForMember(dest => dest.CancelDate, opt => opt.Ignore())
                .ForMember(dest => dest.CancelFamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.Comment, opt => opt.Ignore());


            CreateMap<Entities.Connection, Models.Recipient>()
                .ForMember(dest => dest.RecipientId, opt => opt.MapFrom(src => src.RowKey.Substring(0, src.RowKey.IndexOf('_') - 1)))
                .ForMember(dest => dest.Event, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.ContactFullName, opt => opt.MapFrom(src => src.SubmitterFullName))
                .ForMember(dest => dest.ContactEmail, opt => opt.MapFrom(src => src.SubmitterEmail))
                .ForMember(dest => dest.ContactPhoneNumber, opt => opt.MapFrom(src => src.SubmitterPhoneNumber))
                .ForMember(dest => dest.MatchedGiver, opt => opt.MapFrom(src => src.RowKey.Substring(src.RowKey.IndexOf('_') + 1))) //same as above
                .ForMember(dest => dest.IsSuggestedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.HasConfirmedMatch, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.ReceiverLocation))
                .ForMember(dest => dest.FamilyMembers, opt => opt.Ignore())
                .ForMember(dest => dest.Comment, opt => opt.Ignore());

            //Event mapping
            CreateMap<Dtos.PostEventDto, Models.Event>()
                .ForMember(dest => dest.Municipality, opt => opt.MapFrom(src => src.City));

            CreateMap<Entities.Event, Models.Event>()
                .ForMember(dest => dest.EventName, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.Municipality, opt => opt.MapFrom(src => src.RowKey));

            CreateMap<Models.Event, Entities.Event>()
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.EventName))
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => src.Municipality))
                .ForMember(dest => dest.Timestamp, opt => opt.Ignore())
                .ForMember(dest => dest.ETag, opt => opt.Ignore());

            CreateMap<Models.Event, GetContactsDto>()
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.Municipality));

            //Cms mapping
            CreateMap<Dtos.PostCmsDto, Models.Cms>();

            CreateMap<Models.Cms, Entities.Cms>()
                .ForMember(dest => dest.PartitionKey, opt => opt.MapFrom(src => src.ContentType))
                .ForMember(dest => dest.RowKey, opt => opt.MapFrom(src => src.Index))
                .ForMember(dest => dest.Timestamp, opt => opt.Ignore())
                .ForMember(dest => dest.ETag, opt => opt.Ignore());

            CreateMap<Entities.Cms, Models.Cms>()
                .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.PartitionKey))
                .ForMember(dest => dest.Index, opt => opt.MapFrom(src => src.RowKey));
        }
    }
}
