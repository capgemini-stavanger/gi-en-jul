import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "components/landing-page/Styles";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { Link, useHistory } from "react-router-dom";
import Footer from "components/shared/Footer";
import useIsMobile from "hooks/useIsMobile";
import DotLoader from "common/constants/DotLoader";

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
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackText, setFallbackText] = useState("");
  const history = useHistory();
  const isMobile = useIsMobile();

  useEffect(() => {
    getBedriftInformation();
  }, []);

  const getBedriftInformation = () => {
    setIsLoading(true);
    setFallbackText("Henter info...");
    apiservice
      .get("cms/getall", { params: { contentType: "Bedrift" } })
      .then((response) => {
        setBedriftInfo(response.data[0]);
        setIsLoading(false);
        setFallbackText("");
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setFallbackText("Kunne ikke hente info, vennligst prøv igjen senere");
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
          <Grid item xs={isMobile ? 12 : 8}>
            {fallbackText && (
              <Typography>
                {fallbackText}
                <br />
              </Typography>
            )}
            {isLoading ? <DotLoader /> : <>{parse(businessInfo.info)}</>}
          </Grid>
          <Grid item xs={isMobile ? 12 : 8}>
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Business;
