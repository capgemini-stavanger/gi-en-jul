import { Container, Grid} from "@material-ui/core";
import ScrollToTop from "../../components/shared/ScrollToTop";
import Companies from "../../components/landingPage/Companies";
import How from "../../components/landingPage/How";
import Questions from "../../components/landingPage/Questions";
import useStyles from "../../components/landingPage/Styles";
import logo from "./../../styling/img/logo_background.svg";
import family from "./../../styling/img/familyTop.svg";
import snowDown from "./../../styling/img/snow_down.svg";
import Contact from "../../components/landingPage/Contact";
import {ContactData} from "../../components/landingPage/Contact";
import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer";
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
