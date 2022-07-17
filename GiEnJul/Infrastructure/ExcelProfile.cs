using AutoMapper;

namespace GiEnJul.Infrastructure
{
    public class ExcelProfile : Profile
    {
        public ExcelProfile()
        {
            CreateMap<Entities.Connection, Utilities.ExcelClasses.DeliveryExcel>()
                .ForMember(dest => dest.Check, opt => opt.Ignore());

            CreateMap<Models.Recipient, Utilities.ExcelClasses.SubmittedFamiliesExcel>();

            CreateMap<Models.Person, Utilities.ExcelClasses.SubmittedPersonExcel>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age > 0 ? $"{src.Age}" : $"{src.Months} mnd"))
                .ForMember(dest => dest.FamilyId, opt => opt.Ignore())
                .ForMember(dest => dest.ReferenceId, opt => opt.Ignore());
        }
    }
}
