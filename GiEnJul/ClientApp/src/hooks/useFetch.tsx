import { useEffect, useState } from "react";

//Example from Martin

const useFetch = <T extends any>(url: string, options: RequestInit) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/${url}`,
          options
        );
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
