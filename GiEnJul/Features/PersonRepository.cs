using AutoMapper;
using GiEnJul.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiEnJul.Entities;

namespace GiEnJul.Features
{
    public interface IPersonRepository : IGenericRepository<Person>
    {

    }

    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(ISettings settings, IMapper mapper, string tableName = "Person") : base(settings, tableName, mapper)
        {

        }

        
        

    }
}
