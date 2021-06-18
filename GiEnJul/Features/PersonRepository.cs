using GiEnJul.Infrastructure;
using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IPersonRepository : IGenericRepository<Person>
    {

    }

    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(ISettings settings, string tableName = "Person") : base(settings, tableName)
        {
        }

        
    }
}
