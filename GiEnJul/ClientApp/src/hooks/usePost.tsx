import { useEffect, useState } from "react";

const backend = window.location.origin + "/api";

/**
 * Returns a response from the backend as a json.
 * @param url which controller to access and where to POST "/admin/givers" etc.
 * @param reqOptions where to add headers, {method: POST, ...} etc
 */
const usePost = <T extends any>(url: string, data: any) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backend}/${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
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
export default usePost;
