import React from "react";
import { useEffect, useState } from "react";

const backend = window.location.origin + "/api";

const useFetch = <T extends any>(url: string, options: RequestInit) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backend}/${url}`, options);
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
export default useFetch;
