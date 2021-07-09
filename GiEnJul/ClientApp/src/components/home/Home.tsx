import * as React from "react";
import { Route } from "react-router-dom";
import How from "./How";
import Questions from "./Questions";
import Companies from "./Companies";
import Tab from "../../common/components/Tab";
import { Typography, Container, Button, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const classes = useStyles();
  const { response, error } = useFetch("givers", {});
  if (error == null) {
    console.log("text: " + response);
  } else {
    console.log("error: " + error);
  }

  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography variant="h2">Gi en jul</Typography>
        <Grid container direction="row" justify="center" alignItems="center">
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Tab maxPagePosition={140} path="/bli-giver" />
      </Grid>
    </Container>
  );
};

export default Home;
