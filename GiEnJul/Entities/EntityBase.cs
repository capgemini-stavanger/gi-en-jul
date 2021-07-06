using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Entities
{
    public class EntityBase : ITableEntity
    {
        public EntityBase()
        { }

        public EntityBase(string partitionKey, string rowKey)
        {
            PartitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
            RowKey = rowKey ?? throw new ArgumentNullException(nameof(rowKey));
        }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public string ETag { get; set; }

        public void ReadEntity(IDictionary<string, EntityProperty> properties, OperationContext operationContext)
        {
            var errorList = new List<string>();

            foreach (var entityProperty in GetType().GetProperties())
            {
                if (properties.TryGetValue(entityProperty.Name, out var value))
                {
                    try
                    {
                        entityProperty.SetValue(this, value.PropertyAsObject);
                    }
                    catch (ArgumentException ex)
                    {
                        errorList.Add($"{entityProperty.Name} : {ex.Message}");
                    }
                }
            }

            if (errorList.Any())
            {
                throw new ArgumentException($"{GetType().Name}{Environment.NewLine}{string.Join(Environment.NewLine, errorList)}");
            }
        }

        public IDictionary<string, EntityProperty> WriteEntity(OperationContext operationContext)
        {
            return TableEntity.Flatten(this, operationContext);
        }
    }
}
