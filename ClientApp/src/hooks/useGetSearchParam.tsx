import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const useGetSearchParams = () => {
  const location = useLocation();

  const getSearchParam = useCallback(
    (param: string) => {
      const params = location.search.split("?").filter((s) => s.startsWith(param));
      if (!params.length) return null;

      const split = params[0].split("=");
      if (split.length !== 2) return null;

      return split[1];
    },
    [location]
  );

  return getSearchParam;
};

export default useGetSearchParams;
