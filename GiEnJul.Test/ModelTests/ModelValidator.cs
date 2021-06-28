using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Test.ModelTests
{
    public class ModelValidator
    {
        /// <summary>
        /// Validate model using DataAnnotations such as [Required] etc.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>List of ValidationErrors or empty list</returns>
        public IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }
    }
}
