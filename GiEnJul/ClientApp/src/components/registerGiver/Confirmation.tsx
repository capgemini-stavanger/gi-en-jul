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

  const getMessage = useCallback(
    () =>
      confirmationOK
        ? (
        <>
        <Typography className={classes.headingBold}> Hjertelig takk {values.fullname}!</Typography>
        <Typography className={classes.paragraph}>Ditt bidrag er svært betydningsfullt. Vi har nå registrert deg som giver til årets Gi en Jul og har sendt en
          oppsummering av din registrering til</Typography>
          <br/>
          <Typography className={classes.paragraphBold}>{values.email}</Typography>
          <br/>
          <Typography className={classes.paragraph} >Når det nærmer
          seg jul vil du motta mer informasjon som ønskelister, sted og tidspunkt for innlevering av ditt bidrag.</Typography>
        </>)
        : (<>
        <Typography className={classes.heading}> Hjertelig takk {values.fullname}!</Typography>
        <Typography className={classes.paragraph}>Desverre har det skjedd en feil og vi fikk ikke registrert deg. Gjerne prøv på ny senere og ta kontakt på epost dersom det ikke går.</Typography>
        </>),
    [confirmationOK]
  );

  return (
    <>
    <Container className={classes.form}>
      {confirmationOK !== undefined ? (
            getMessage()
      ) : (
        <Spinner />
      )}
      <Pager onContinue={React.useCallback(() => history.push("/"), [history])} continueText={"Til hovedsiden"}/>
    </Container>
    </>
  );
};
export default Confirmation;
