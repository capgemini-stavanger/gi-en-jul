import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Tab from "../../common/components/Tab";
import Companies from "./Companies";
import How from "./How";
import Questions from "./Questions";
import useStyles from "./Styles";
import logo from './../../styling/img/logo_gronn.svg';
import Contact from "./Contact";
import NavMenu from "../../common/components/NavMenu";
import {ArrowBackIos, ArrowForwardIos} from '@material-ui/icons';

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <> 
    <NavMenu/>
    <Container
    className={classes.root}  maxWidth={false}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container className={classes.circle}>
        <img className={classes.logoLarge}
         src={logo}></img>
        </Container>
        <Typography className={classes.logoText} >Gi en jul</Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            size="large"
            endIcon={<ArrowForwardIos/>}
            className={classes.buttonNext}
            onClick={useCallback(() => {
              history.push("/bli-giver");
            }, [history])}
          >
            Bli Giver
          </Button>
        </Grid>
      </Grid>
      <How />
      <Questions />
      <Companies />
      <Contact/>
      <Grid item xs={1}>
        <Tab maxPagePosition={300} path="top" />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Tab maxPagePosition={140} path="/bli-giver" /> */}
      </Grid>
    </Container>
    </>
  );
};

export default Home;
