import { Container, Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import IFormData from "./IFormData";
import useStyles from "components/register-as-giver/Styles";
import snowmanFull from "styling/img/snowmanFull.svg";
import DotLoader from "common/constants/DotLoader";

type Props = {
  values: IFormData;
  confirmationOK?: boolean;
};

const Confirmation: React.FC<Props> = ({ values, confirmationOK }) => {
  const classes = useStyles();

  const getMessage = useCallback(
    () =>
      confirmationOK ? (
        <>
          <Typography className={classes.headingBold}>
            {" "}
            Hjertelig takk {values.fullname}!
          </Typography>
          <Typography className={classes.paragraph}>
            Tusen takk for innsatsen du skal gjøre! Vi har nå registrert deg som giver til årets Gi
            en jul og har sendt en oppsummering av din registrering til
          </Typography>
          <Typography className={classes.paragraphBold}>{values.email}</Typography>
          <Typography className={classes.paragraph}>
            Når det nærmer seg jul vil du motta mer informasjon som ønskelister, sted og tidspunkt
            for innlevering av ditt bidrag.
          </Typography>
        </>
      ) : (
        <>
          <Typography className={classes.headingBold}> Ånei! {values.fullname}!</Typography>
          <Typography className={classes.paragraph}>
            Desverre har det skjedd en feil og vi har ikke fått registrert deg. Gjerne prøv igjen
            senere og ta kontakt på epost dersom feilen vedvarer.
          </Typography>
        </>
      ),
    [confirmationOK]
  );

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Container className={classes.giverForm}>
            {confirmationOK !== undefined ? getMessage() : <DotLoader />}
          </Container>
        </Grid>
        <Grid item className={classes.imageContainer}>
          <img className={classes.backgroundImage} src={snowmanFull}></img>
        </Grid>
      </Grid>
    </>
  );
};
export default Confirmation;
