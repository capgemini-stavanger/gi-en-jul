import { Container, Grid} from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import {ContactData} from "components/landing-page/Contact";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import City from "components/municipalities/City";

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
        <City cities={cities} >
        </City>
        <ScrollToTop maxPagePosition={300} />
        <Footer/>
      </Container>
        </>
      );
};

export default Municipality;