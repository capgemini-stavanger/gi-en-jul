import { Container, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from "./Styles";

type Props = {
  values: IFormData;
  confirmationOK?: boolean;
};

const Confirmation: React.FC<Props> = ({ values, confirmationOK }) => {
  const history = useHistory();
  const classes = useStyles();

  const getHeader = useCallback(
    () =>
      confirmationOK
        ? `Takk for at du gir en jul ${values.fullname}!`
        : `Takk for at du prøver å gi en jul ${values.fullname}!`,
    [confirmationOK]
  );

  const getMessage = useCallback(
    () =>
      confirmationOK
        ? `Vi har nå registrert deg som giver til årets Gi en Jul og har sendt en
          oppsummering av din registrering i til ${values.email}. Når det nærmer
          seg jul vil vi sende deg mer informasjon.`
        : `Det har desverre skjedd en feil å vi har ikke greid å registrert deg.`,
    [confirmationOK]
  );

  return (
    <Container className={classes.paper}>
      {confirmationOK !== undefined ? (
        <>
          <Typography component="h1" variant="h4">
            {getHeader()}
          </Typography>
          <Typography component="p">{getMessage()}</Typography>
        </>
      ) : (
        <Spinner />
      )}
      <Pager onBack={React.useCallback(() => history.push("/"), [history])} />
    </Container>
  );
};
export default Confirmation;
