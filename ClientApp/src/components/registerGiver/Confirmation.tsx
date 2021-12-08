import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import IFormData from "./IFormData";
import useStyles from "components/registerGiver/Styles";
import snowmanFull from "styling/img/snowmanFull.svg";
import snowDown from "styling/img/snow_down2.svg";
import logo from "styling/img/logo_green.svg";
import { ArrowForwardIos } from "@material-ui/icons";

type Props = {
  values: IFormData;
  confirmationOK?: boolean;
};

const Confirmation: React.FC<Props> = ({ values, confirmationOK }) => {
  const history = useHistory();
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
            Tusen takk for innsatsen du skal gjøre! Vi har nå registrert deg
            som giver til årets Gi en jul og har sendt en oppsummering av din
            registrering til
          </Typography>
          <Typography className={classes.paragraphBold}>
            {values.email}
          </Typography>
          <Typography className={classes.paragraph}>
            Når det nærmer seg jul vil du motta mer informasjon som ønskelister,
            sted og tidspunkt for innlevering av ditt bidrag.
          </Typography>
        </>
      ) : (
        <>
          <Typography className={classes.headingBold}>
            {" "}
            Ånei! {values.fullname}!
          </Typography>
          <Typography className={classes.paragraph}>
            Desverre har det skjedd en feil og vi har ikke fått registrert
            deg. Gjerne prøv igjen senere og ta kontakt på epost dersom feilen vedvarer.
          </Typography>
        </>
      ),
    [confirmationOK]
  );

  return (
    <>
      <Button
        size="large"
        endIcon={<ArrowForwardIos />}
        className={classes.buttonMainPage}
        onClick={React.useCallback(() => history.push("/"), [history])}
      >
        Hovedsiden
      </Button>
      <img className={classes.smallLogo} src={logo}></img>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <img className={classes.imageSnow} src={snowDown}></img>
        </Grid>
        <Grid item>
          <Container className={classes.giverForm}>
            {confirmationOK !== undefined ? getMessage() : <Spinner />}
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
