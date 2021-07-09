import React from "react";
import { useEffect, useState } from "react";

const backend = window.location.origin + "/api";

function useApi() {
  //Could fit multiple hooks for different purposes

  /**Function to fetch data from the rest API
   *@param url, Designates what to GET from the DB
   * -> f.ex. givers or recipients
   **/
  const useFetch = <T extends any>(url: string) => {
    const [response, setResponse] = useState<T>();
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${backend}/${url}`);
          if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
          }
          const json = await res.json();
          setResponse(json);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error };
  };
  return {
    useFetch,
  };

  //More functions here
}

export default useApi;
