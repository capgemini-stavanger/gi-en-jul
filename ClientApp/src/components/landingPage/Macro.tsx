import { Container, Grid} from "@material-ui/core";
import React from "react";
import ScrollToTop from "../../common/components/ScrollToTop";
import Companies from "./Companies";
import How from "./How";
import Questions from "./Questions";
import useStyles from "./Styles";
import logo from "./../../styling/img/logo_background.svg";
import family from "./../../styling/img/familyTop.svg";
import snowDown from "./../../styling/img/snow_down.svg";
import Contact from "./Contact";
import {ContactData} from "./Contact";
import NavBar from "../../common/components/NavBar";
import Footer from "../../common/components/Footer";
import { useState, useEffect } from "react";
import ApiService from "../../common/functions/apiServiceClass";

const Home = () => {

  const [contacts, setContacts] = useState<ContactData[]>([]);

  const apiservice = new ApiService;
  useEffect(() => {
    apiservice.get("event/contacts").then((response) => setContacts(response.data));
  }, []);

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
          <Grid item>
            <img className={classes.logo} src={logo}></img>
          </Grid>
          <Grid item >
          <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
        <img className={classes.snowDown} src={snowDown}></img>
        </Grid>
        </Grid>
        <How />
        <Questions />
        <Companies />
        <Contact contacts={contacts}/>
        <ScrollToTop maxPagePosition={300} />
        <Footer/>
      </Container>
    </>
  );
};

export default Home;
