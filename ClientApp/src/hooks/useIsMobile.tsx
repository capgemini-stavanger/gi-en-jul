import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener("resize", update);
  }, []);
  return isMobile;
};

export default useIsMobile;
