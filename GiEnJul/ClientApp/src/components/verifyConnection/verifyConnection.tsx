import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { Spinner } from "reactstrap";
import ApiService from "../../common/functions/apiServiceClass";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface VerifyConnection extends RouteComponentProps<RouteParameters> {}

const useStyles = makeStyles({
  midScreen: {
    textAlign: "center",
    top: "50%",
    left: "50%",
  },
});

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } =
    useParams<RouteParameters>();
  const classes = useStyles();

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const apiservice = new ApiService();

  useEffect(() => {
    apiservice
      .post(`verify/${giverRowKey}/${recipientRowKey}/${partitionKey}`, {})
      .then((response) => {
        setSuccess(response.status == 200);
      });
  }, []);

  if (success)
    return (
      <>
        <h1 className={classes.midScreen}>Takk til deg!</h1>
      </>
    );
  else if (!success)
    return (
      <>
        <h1 className={classes.midScreen}>
          En feil oppsto, prøv igjen senere. Hvis feilen vedvarer, ta kontakt
          med din lokale Gi En Jul administrator.
        </h1>
      </>
    );
  else {
    return (
      <>
        <Spinner className={classes.midScreen} />
      </>
    );
  }
};
export default VerifyConnection;
