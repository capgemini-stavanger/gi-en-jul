﻿import { Button, Container, Grid, Typography } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import LoadingPage from "pages/LoadingPage";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/register-as-giver/Styles";
import snowmanFull from "styling/img/snowmanFull.svg";
import snowDown from "styling/img/snow_down2.svg";
import { isMobile } from "common/functions/IsMobile";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

type VerifyConnection = RouteComponentProps<RouteParameters>;

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } = useParams<RouteParameters>();

  const [content, setContent] = useState(<LoadingPage />);

  const apiservice = new ApiService();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    apiservice
      .post(`connection/${giverRowKey}/${recipientRowKey}/${partitionKey}/verify`, {})
      .then((response) => {
        if (response.status == 200) {
          setContent(
            <Container className={classes.fillBackground}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                  <img className={classes.imageSnow} src={snowDown}></img>
                </Grid>
                {isMobile() ? (
                  <Grid item xs={12}>
                    <Container className={classes.verifyDenyConnectionContainer}>
                      <Typography className={classes.headingBold}>
                        Tusen takk for at du skal Gi en jul! <br />
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Familiene setter utrolig stor pris på det, og det blir mange tårevåte
                        øyeblikk når de får eskene sine. Håper at du koser deg med handlingen!
                        Hilsen oss i Gi en jul.
                      </Typography>
                    </Container>
                  </Grid>
                ) : (
                  <Grid item xs={4}>
                    <Container className={classes.verifyDenyConnectionContainer}>
                      <Typography className={classes.headingBold}>
                        Tusen takk for at du skal Gi en jul! <br />
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Familiene setter utrolig stor pris på det, og det blir mange tårevåte
                        øyeblikk når de får eskene sine. Håper at du koser deg med handlingen!
                        Hilsen oss i Gi en jul.
                      </Typography>
                    </Container>
                  </Grid>
                )}

                <Grid item>
                  <img className={classes.backgroundImage} src={snowmanFull}></img>
                </Grid>
              </Grid>
            </Container>
          );
        }
      })
      .catch(() =>
        setContent(
          <Container className={classes.fillBackground}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item>
                <img className={classes.imageSnow} src={snowDown}></img>
              </Grid>
              {isMobile() ? (
                <Grid item xs={12}>
                  <Container className={classes.verifyDenyConnectionContainer}>
                    <Typography className={classes.headingBold}>
                      Tusen takk for innsatsen du skal gjøre!
                    </Typography>
                    <Typography className={classes.paragraphBold}>
                      Det har desverre sjedd noe feil i våre systemer. Denne handlingen kunne ikke
                      gjennomføres, vennligst sjekk mailboksen din for mulig mail fra Gi en jul før
                      du tar kontakt med oss.
                    </Typography>
                    <Typography className={classes.paragraph}>
                      Vit at familiene setter utrolig stor pris på dette, og det blir mange tårevåte
                      øyeblikk når familiene får eskene sine. Håper du koser deg med finne en fin
                      gave
                    </Typography>
                    <Typography className={classes.paragraph}>
                      Du finner kontaktinformasjon for din kommune nederst på hjemsiden
                    </Typography>
                    <Button
                      size="large"
                      endIcon={<ArrowForwardIos />}
                      style={{ marginTop: "1rem", marginBottom: "1rem" }}
                      className={classes.buttonNext}
                      onClick={() => history.push("/")}
                    >
                      Til hjemsiden
                    </Button>
                  </Container>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Container className={classes.verifyDenyConnectionContainer}>
                    <Typography className={classes.headingBold}>
                      Tusen takk for innsatsen du skal gjøre!
                    </Typography>
                    <Typography className={classes.paragraphBold}>
                      Det har desverre sjedd noe feil i våre systemer. Denne handlingen kunne ikke
                      gjennomføres, vennligst sjekk mailboksen din for mulig mail fra Gi en jul før
                      du tar kontakt med oss.
                    </Typography>
                    <Typography className={classes.paragraph}>
                      Vit at familiene setter utrolig stor pris på dette, og det blir mange tårevåte
                      øyeblikk når familiene får eskene sine. Håper du koser deg med finne en fin
                      gave
                    </Typography>
                    <Typography className={classes.paragraph}>
                      Du finner kontaktinformasjon for din kommune nederst på hjemsiden
                    </Typography>
                    <Button
                      size="large"
                      endIcon={<ArrowForwardIos />}
                      style={{ marginTop: "1rem", marginBottom: "1rem" }}
                      className={classes.buttonNext}
                      onClick={() => history.push("/")}
                    >
                      Til hjemsiden
                    </Button>
                  </Container>
                </Grid>
              )}

              <Grid item>
                <img className={classes.backgroundImage} src={snowmanFull}></img>
              </Grid>
            </Grid>
          </Container>
        )
      );
  }, []);

  return <>{content}</>;
};
export default VerifyConnection;
