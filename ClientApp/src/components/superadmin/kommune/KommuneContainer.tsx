import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect } from "react";

interface IKommuneContainer {
  accessToken: string;
}

const KommuneContainer: React.FC<IKommuneContainer> = ({ accessToken }) => {
  const [activeLocations, setActiveLocations] = useState<{ locationName: string[] } | []>([]);
  const apiservice = new ApiService(accessToken);

  const fetchActiveLocations = () => {
    apiservice
      .get("events/contacts", {})
      .then((resp) => {
        // TEMP
        alert(resp.data);
        alert(activeLocations);
        setActiveLocations(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchActiveLocations, []);

  return <>ic</>;
};

export default KommuneContainer;
