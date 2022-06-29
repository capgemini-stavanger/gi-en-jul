import { Container, Grid} from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
<<<<<<< HEAD
=======
import Companies from "components/landing-page/Companies";
import How from "components/landing-page/How";
import Questions from "components/landing-page/Questions";
>>>>>>> b531a44 (improvements for making it more dynamic)
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
<<<<<<< HEAD
=======
import Contact from "components/landing-page/Contact";
>>>>>>> b531a44 (improvements for making it more dynamic)
import {ContactData} from "components/landing-page/Contact";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import City from "components/municipalities/city";

const Municipality = () => {
    const [cities, setMunicipalities] = useState<ContactData[]>([]);
    const classes = useStyles();
    const apiservice = new ApiService;
    useEffect(() => {
        apiservice.get("event/contacts").then((response) => setMunicipalities(response.data));
      }, []);

      return (
        <>
        <NavBarPublic />
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
<<<<<<< HEAD
<<<<<<< HEAD
        <City cities={cities} >
        </City>
=======
        <City cities={cities}/>
>>>>>>> b531a44 (improvements for making it more dynamic)
=======
        <City cities={cities} >
        </City>
>>>>>>> e797592 (improved pages)
        <ScrollToTop maxPagePosition={300} />
        <Footer/>
      </Container>
        </>
      );
};

export default Municipality;