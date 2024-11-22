using System.Linq;

namespace GiEnJul.Infrastructure;

public static class ExcellMapper
{
    public static Utilities.ExcelClasses.DeliveryExcel ToDeliveryExcel(this Entities.Connection connection)
    {
        return new Utilities.ExcelClasses.DeliveryExcel
        {
            FamilyId = connection.FamilyId,
            ReferenceId = connection.ReferenceId,
            GiverEmail = connection.GiverEmail,
            GiverFullName = connection.GiverFullName,
            GiverPhoneNumber = connection.GiverPhoneNumber,
            Institution = connection.Institution,
            SubmitterEmail = connection.SubmitterEmail,
            SubmitterFullName = connection.SubmitterFullName,
        };
    }

    public static Utilities.ExcelClasses.SubmittedFamiliesExcel ToSubmittedFamiliesExcel(this Models.Recipient model)
    {
        return new Utilities.ExcelClasses.SubmittedFamiliesExcel
        {
            ContactEmail = model.ContactEmail,
            ContactFullName = model.ContactFullName,
            ContactPhoneNumber = model.ContactPhoneNumber,
            FamilyId = model.FamilyId,
            PersonCount = model.PersonCount,
            ReferenceId = model.ReferenceId,
        };
    }

    public static Utilities.ExcelClasses.SubmittedPersonExcel ToSubmittedPersonExcel(this Models.Person model)
    {
        return new Utilities.ExcelClasses.SubmittedPersonExcel
        {
            Age = model.Age > 0 ? $"{model.Age}" : $"{model.Age} mnd",
            Gender = model.Gender,
            RecipientId = model.RecipientId,
            Wishes = model.Wishes.ToList(),
        };
    }
}