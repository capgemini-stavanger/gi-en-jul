using AutoMapper;
using GiEnJul.Infrastructure;
using GiEnJul.Models;

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
