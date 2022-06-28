import { Container, Grid} from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import Companies from "components/landing-page/Companies";
import How from "components/landing-page/How";
import Questions from "components/landing-page/Questions";
import Start from "components/landing-page/StartJul";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import Contact from "components/landing-page/Contact";
import {ContactData} from "components/landing-page/Contact";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";

const Home = () => {

  const [contacts, setContacts] = useState<ContactData[]>([]);
  const classes = useStyles();
  const apiservice = new ApiService;
  useEffect(() => {
    apiservice.get("event/contacts").then((response) => setContacts(response.data));
  }, []);


  return (
    <>
      <NavBarPublic />
      <Container id="landing" className={classes.root} maxWidth={false}>
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
