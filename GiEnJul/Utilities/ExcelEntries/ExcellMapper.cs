using System.Linq;

namespace GiEnJul.Utilities.ExcelEntries;

public static class ExcellMapper
{
    public static ExcelClasses.DeliveryExcel ToDeliveryExcel(this Entities.Connection connection)
    {
        return new ExcelClasses.DeliveryExcel
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

    public static ExcelClasses.SubmittedFamiliesExcel ToSubmittedFamiliesExcel(this Models.Recipient model)
    {
        return new ExcelClasses.SubmittedFamiliesExcel
        {
            ContactEmail = model.ContactEmail,
            ContactFullName = model.ContactFullName,
            ContactPhoneNumber = model.ContactPhoneNumber,
            FamilyId = model.FamilyId,
            PersonCount = model.PersonCount,
            ReferenceId = model.ReferenceId,
        };
    }

    public static ExcelClasses.SubmittedPersonExcel ToSubmittedPersonExcel(this Models.Person model)
    {
        return new ExcelClasses.SubmittedPersonExcel
        {
            Age = model.Age > 0 ? $"{model.Age}" : $"{model.Age} mnd",
            Gender = model.Gender,
            RecipientId = model.RecipientId,
            Wishes = model.Wishes.ToList(),
        };
    }
}