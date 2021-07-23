namespace GiEnJul.Entities
{
    public class AutoIncrement : EntityBase
    {
        //RK - Identifyer
        //PK - Table applied to
        public AutoIncrement() { }

        public AutoIncrement(string name, string tableName) : base(name, tableName)
        {
            Value = 1;
        }

        public int Value { get; set; }
    }
}
