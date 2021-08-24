import { useEffect, useState } from "react";

const backend = window.location.origin + "/api";

/**
 * Returns a response from the backend as a json.
 * @param url which controller to access and what to fetch "/admin/givers" etc.
 * @param reqOptions where to add headers, {method: GET, ...} etc
 */
const useFetch = <T extends any>(url: string, reqOptions: RequestInit) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backend}/${url}`, reqOptions);
        if (!res.ok) {
          throw new Error(`${res.status}${res.statusText}`);
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
