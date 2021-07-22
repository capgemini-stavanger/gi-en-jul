import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface VerifyConnection extends RouteComponentProps<RouteParameters> {}

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } =
    useParams<RouteParameters>();

  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`verify/${giverRowKey}/${recipientRowKey}/${partitionKey}`, {
      method: "POST",
    }).then((response) => setError(!response.ok));
  }, []);

  if (error)
    return (
      <>
        <h1>
          En feil oppsto, prøv igjen senere. Hvis feilen vedvarer, ta kontakt
          med din lokale Gi En Jul administrator.
        </h1>
      </>
    );

  return (
    <>
      <h1>Takk til deg!</h1>
    </>
  );
};
export default VerifyConnection;
