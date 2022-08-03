import { Box, Grid } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import How from "components/landing-page/How";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import Contact from "components/landing-page/Contact";
import { ContactData } from "components/landing-page/Contact";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Questions from "components/landing-page/Questions";
import What from "components/landing-page/What";
import bigLandingPagePicture from "styling/img/bigLandingPagePicture.png";
import WavedSeperator from "components/shared/WavedSeparator";

const Home = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const classes = useStyles();
  const apiservice = new ApiService();
  useEffect(() => {
    apiservice.get("municipality/allcontacts").then((response) => setContacts(response.data));
  }, []);

  return (
    <>
      <NavBarPublic />
      <Box id="landing">
        <Grid
          container
          className={classes.rootGreen}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img className={classes.logo} src={logo}></img>
          </Grid>
          <Grid item>
            <img className={classes.familyImage} src={bigLandingPagePicture}></img>
          </Grid>
        </Grid>
        <Box className={classes.rootGreen}>
          <What />
        </Box>
        <WavedSeperator isGreen />
        <Box className={classes.rootWhite}>
          <How />
        </Box>
        <WavedSeperator />
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
