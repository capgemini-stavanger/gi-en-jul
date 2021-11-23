using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Helpers
{
    public static class ObjectToDictionaryHelper
    {
        public static Dictionary<string, string> MakeStringValueDict(object o, string keyPrefix = "")
        {
            if (o == null)
                throw new ArgumentNullException("object","Unable to make dictionary out of a null object");
            
            var dict = new Dictionary<string, string>();

            var props = o.GetType().GetProperties();
            foreach (var prop in props)
            {
                var key = keyPrefix + prop.Name;
                var value = prop.GetValue(o);
                if (value == null)
                {
                    dict.Add(key, String.Empty);
                    continue;
                }
                var valueString = value is DateTime time ? time.ToShortDateString() : value.ToString();
                dict.Add(key, valueString);
            }

            return dict;
        }

        /// <summary>
        /// Adds all non duplikate keys and their values to the dictionary
        /// </summary>
        /// <typeparam name="TKey">Dictionary Key</typeparam>
        /// <typeparam name="TVal">Dictionary Value</typeparam>
        /// <param name="dict">working dictionary</param>
        /// <param name="other">dictionary to add non duplicates from</param>
        public static void AddDictionary<TKey, TVal>(this Dictionary<TKey, TVal> dict, Dictionary<TKey, TVal> other)
        {
            foreach (var item in other)
            {
                if (!dict.ContainsKey(item.Key))
                    dict.Add(item.Key, item.Value);
            }
        }
    }
}
