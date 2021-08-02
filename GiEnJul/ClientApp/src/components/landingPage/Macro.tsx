import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import ScrollToTop from "../../common/components/ScrollToTop";
import Companies from "./Companies";
import How from "./How";
import Questions from "./Questions";
import useStyles from "./Styles";
import logo from "./../../styling/img/logo_green.svg";
import Contact from "./Contact";
import NavBar from "../../common/components/NavBar";
import Footer from "../../common/components/Footer";

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container className={classes.root} maxWidth={false}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Container className={classes.circle}>
            <img className={classes.logoLarge} src={logo}></img>
          </Container>
          <Typography className={classes.logoText}>Gi en jul</Typography>
        </Grid>
        <How />
        <Questions />
        <Companies />
        <Contact />
        <ScrollToTop maxPagePosition={300} />
        <Footer/>
      </Container>
    </>
  );
};

export default Home;
