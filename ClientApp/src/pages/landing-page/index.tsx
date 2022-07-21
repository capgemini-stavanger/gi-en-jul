import { Box, Container, Grid } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import How from "components/landing-page/How";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import Contact from "components/landing-page/Contact";
import { ContactData } from "components/landing-page/Contact";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Questions from "components/landing-page/Questions";
import What from "components/landing-page/What";
import { rootCertificates } from "tls";

const Home = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const classes = useStyles();
  const apiservice = new ApiService();
  useEffect(() => {
    apiservice.get("event/contacts").then((response) => setContacts(response.data));
  }, []);

  return (
    <>
      <NavBarPublic />
      <Box id="landing">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <img className={classes.logo} src={logo}></img>
          </Grid>
          <Grid item>
            <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
            <img className={classes.snowDown} src={snowDown}></img>
          </Grid>
        </Grid>
        <Box className={classes.rootGreen}>
          <What />
        </Box>
        <Box className={classes.rootWhite}>
          <How />
        </Box>
        <Box className={classes.rootGreen}>
          <Questions />
        </Box>
        <Box className={classes.whiteBackground}>
          <Contact contacts={contacts} />
        </Box>
        <ScrollToTop maxPagePosition={300} />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
