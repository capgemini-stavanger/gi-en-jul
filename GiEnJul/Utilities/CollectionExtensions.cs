using System;
using System.Collections.Generic;

namespace GiEnJul.Utilities
{
    public enum CombineStrategy
    {
        error,
        takeFirst,
        takeLast,
    }

    public static class CollectionExtensions
    {
        public static IDictionary<TKey, TValue> CombineWith<TKey, TValue>(this IDictionary<TKey, TValue> dict, 
            IDictionary<TKey, TValue> other, 
            CombineStrategy combineStrategy = CombineStrategy.error)
        {
            foreach (var item in other)
            {
                if (!dict.ContainsKey(item.Key))
                    dict.Add(item.Key, item.Value);
                else
                    switch (combineStrategy)
                    {
                        case CombineStrategy.error:
                            throw new InvalidOperationException($"{item.Key} already exists in dictionary");
                        case CombineStrategy.takeFirst:
                            break;
                        case CombineStrategy.takeLast:
                            dict[item.Key] = item.Value;
                            break;
                        default:
                            break;
                    }
            }

            return dict;
        }
    }
}
