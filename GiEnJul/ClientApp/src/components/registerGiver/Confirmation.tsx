import * as React from "react";
import { Route } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import useStyles from "./Styles";
import IGiverInputs from "./IGiverInputs";

type Props = {
  values: IGiverInputs;
  confirmationOK: boolean;
};

const Confirmation: React.FC<Props> = ({ values, confirmationOK }) => {
  const classes = useStyles();
  if (!confirmationOK) {
    return (
      <Container className={classes.paper}>
        <Typography component="h1" variant="h4">
          Takk for at du prøver å gi en jul {values.fullname}!
        </Typography>
        <Typography component="p">
          Det har desverre skjedd en feil å vi har ikke greid å registrert deg
        </Typography>
        <Grid
          item
          container
          spacing={2}
          justify="center"
          className={classes.submit}
        >
          <Route
            render={({ history }) => (
              <Button
                variant="contained"
                onClick={() => {
                  history.push("/");
                }}
              >
                Tilbake
              </Button>
            )}
          />
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container className={classes.paper}>
        <Typography component="h1" variant="h4">
          Takk for at du gir en jul {values.fullname}!
        </Typography>
        <Typography component="p">
          Vi har nå registrert deg som giver til årets Gi en Jul og har sendt en
          oppsummering av din registrering i til {values.email}. Når det nærmer
          seg jul vil vi sende deg mer informasjon.
        </Typography>
        <Grid
          item
          container
          spacing={2}
          justify="center"
          className={classes.submit}
        >
          <Route
            render={({ history }) => (
              <Button
                variant="contained"
                onClick={() => {
                  history.push("/");
                }}
              >
                Tilbake
              </Button>
            )}
          />
        </Grid>
      </Container>
    );
  }
};
export default Confirmation;
