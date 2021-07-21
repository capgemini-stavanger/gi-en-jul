using System;
using System.Runtime.Serialization;

namespace GiEnJul.Exceptions
{
    [Serializable]
    internal class InvalidConnectionCreationException : Exception
    {
        public InvalidConnectionCreationException()
        {
        }

        public InvalidConnectionCreationException(string message) : base(message)
        {
        }

        public InvalidConnectionCreationException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidConnectionCreationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}