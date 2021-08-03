import { Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import LoadingPage from "../../common/components/LoadingPage";
import ApiService from "../../common/functions/apiServiceClass";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface VerifyConnection extends RouteComponentProps<RouteParameters> {}

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } =
    useParams<RouteParameters>();

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const apiservice = new ApiService();

  useEffect(() => {
    apiservice
      .post(`verify/${giverRowKey}/${recipientRowKey}/${partitionKey}`, {})
      .then((response) => {
        setSuccess(response.status == 200);
      });
  }, []);

  if (success) return <Typography align="center">Takk til deg!</Typography>;
  else if (!success)
    return (
      <Typography align="center">
        En feil oppsto, prøv igjen senere. Hvis feilen vedvarer, ta kontakt med
        din lokale Gi En Jul administrator.
      </Typography>
    );
  else {
    return <LoadingPage />;
  }
};
export default VerifyConnection;
