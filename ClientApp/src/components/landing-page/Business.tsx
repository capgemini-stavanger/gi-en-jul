import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "components/landing-page/Styles";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { Link, useHistory } from "react-router-dom";
import { isMobile } from "common/functions/IsMobile";
import Footer from "components/shared/Footer";

interface businessInfo {
  question: string;
  info: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
}

const initBusinessInfo: businessInfo = {
  question: "",
  info: "",
  partitionKey: "",
  rowKey: "",
  timestamp: "",
};

const Business = () => {
  const classes = useStyles();
  const apiservice = new ApiService();
  const [businessInfo, setBedriftInfo] = useState<businessInfo>(initBusinessInfo);
  const history = useHistory();

  useEffect(() => {
    getBedriftInformation();
  }, []);

  const getBedriftInformation = () => {
    apiservice
      .get("cms/getall", { params: { contentType: "Bedrift" } })
      .then((response) => {
        setBedriftInfo(response.data[0]);
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
            For bedrifter
          </Typography>
        </div>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {isMobile() ? (
            <Grid item xs={12}>
              {parse(businessInfo.info)}
              <Link
                to="/bli-giver"
                onClick={() => {
                  history.push("/");
                }}
                style={{ textDecoration: "none" }}
              >
                <Typography>
                  Ønsker du å Gi en jul som privatperson? Klikk her for registrering.
                </Typography>
              </Link>
            </Grid>
          ) : (
            <Grid item xs={6}>
              {parse(businessInfo.info)}
              <Link
                to="/bli-giver"
                onClick={() => {
                  history.push("/");
                }}
                style={{ textDecoration: "none" }}
              >
                <Typography>
                  Ønsker du å Gi en jul som privatperson? Klikk her for registrering.
                </Typography>
              </Link>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Business;
