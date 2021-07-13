import { Button, Container, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import { Route } from "react-router-dom";
import Tab from "../../common/components/Tab";
import Companies from "./Companies";
import How from "./How";
import Questions from "./Questions";
import useStyles from "./Styles";

const Home = () => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h2">Gi en jul</Typography>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Route
            render={({ history }) => (
              <Button
                size="large"
                variant="contained"
                className={classes.submit}
                onClick={() => {
                  history.push("/bli-giver");
                }}
              >
                Bli Giver
              </Button>
            )}
          />
        </Grid>
      </Grid>
      <How />
      <Questions />
      <Companies />
      <Grid item xs={1}>
        <Tab maxPagePosition={300} path="top" />
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Tab maxPagePosition={140} path="/bli-giver" />
      </Grid>
    </Container>
  );
};

export default Home;
