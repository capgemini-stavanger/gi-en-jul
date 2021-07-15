using System;

namespace GiEnJul.Exceptions
{
    [Serializable]
    public class InvalidEventException : Exception
    {
        public InvalidEventException()
        {
        }

        public InvalidEventException(string message) : base(message)
        {
        }

        public InvalidEventException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}