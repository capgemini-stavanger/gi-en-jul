using Azure;
using Azure.Data.Tables;
using System;

namespace GiEnJul.Entities;

public class EntityBase : ITableEntity
{
    public EntityBase()
    { }

    public EntityBase(string partitionKey, string rowKey)
    {
        PartitionKey = partitionKey ?? throw new ArgumentNullException(nameof(partitionKey));
        RowKey = rowKey ?? throw new ArgumentNullException(nameof(rowKey));
    }

    public string PartitionKey { get; set; } = null!;
    public string RowKey { get; set; } = null!;
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
