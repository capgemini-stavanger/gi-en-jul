import { Typography, Container, Grid } from "@material-ui/core";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import useStyles from "components/landing-page/Styles";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import useIsMobile from "hooks/useIsMobile";
import Footer from "components/shared/Footer";

interface iHowtoStartInfo {
  ContentType: string;
  info: string;
  index: string;
}

const initHowtoStartInfo: iHowtoStartInfo = {
  ContentType: "",
  info: "",
  index: "",
};
const StartJul = () => {
  const classes = useStyles();
  const [howToStartInfo, setHowToStartInfo] = useState<iHowtoStartInfo>(initHowtoStartInfo);
  const apiservice = new ApiService();
  const isMobile = useIsMobile();

  useEffect(() => {
    getHowToStartInfo();
  }, []);

  const getHowToStartInfo = () => {
    apiservice
      .get("cms/getall", { params: { ContentType: "HowToStart" } })
      .then((response) => {
        setHowToStartInfo(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <NavBarPublic />
      <Container className={classes.rootNavBarPages} maxWidth={false}>
        <div className={classes.headLineContainer}>
          <Typography style={{ marginTop: "3em" }} className={classes.textHeadline}>
            Hvordan du starter Gi en jul i din kommune
          </Typography>
        </div>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={isMobile ? 12 : 6}>
            {parse(howToStartInfo.info)}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default StartJul;
