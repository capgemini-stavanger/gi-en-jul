import { Button, Container, Grid, Typography } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import LoadingPage from "../../common/components/LoadingPage";
import ApiService from "../../common/functions/apiServiceClass";
import useStyles from "../registerGiver/Styles";
import snowmanFull from "./../../styling/img/snowmanFull.svg";
import snowDown from "./../../styling/img/snow_down2.svg";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface VerifyConnection extends RouteComponentProps<RouteParameters> {}

const VerifyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } =
    useParams<RouteParameters>();

  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const apiservice = new ApiService();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    apiservice
      .post(`verify/${giverRowKey}/${recipientRowKey}/${partitionKey}`, {})
      .then((response) => {
        setSuccess(response.status == 200);
      });
  }, []);

  if (success)
    return (
      <Container className={classes.summaryDesign}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          <Grid item>
            <Container className={classes.giverForm}>
              <Typography className={classes.headingBold}>
                Tusen takk for innsatsen <br />
                du skal gjøre!
              </Typography>
              <Typography className={classes.paragraph}>
                Vit at familiene setter utrolig stor pris på dette, og
                barnevernet og de andre forteller om mange tårevåte øyeblikk når
                familiene får eskene sine. Håper du koser deg med finne en fin
                gave.
              </Typography>
            </Container>
          </Grid>
          <Grid item className={classes.imageContainer}>
            <img className={classes.backgroundImage} src={snowmanFull}></img>
          </Grid>
        </Grid>
      </Container>
    );
  else if (!success)
    return (
      <Container className={classes.summaryDesign}>
        <Button
          size="large"
          endIcon={<ArrowForwardIos />}
          className={classes.buttonMainPage}
          onClick={React.useCallback(() => history.push("/"), [history])}
        >
          Finn kontaktinformasjon
        </Button>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          <Grid item>
            <Container className={classes.giverForm}>
              <Typography className={classes.headingBold}>
                Tusen takk for innsatsen <br />
                du skal gjøre!
              </Typography>
              <Typography className={classes.paragraphBold}>
                Det har desverre sjedd noe feil i våre systemer så vi fikk ikke
                registrert din bekreftelse som giver. Ta kontakt med Gi en jul
                der du bor så skal vi registrere ditt bidrag.
              </Typography>
              <Typography className={classes.paragraph}>
                Vit at familiene setter utrolig stor pris på dette, og
                barnevernet og de andre forteller om mange tårevåte øyeblikk når
                familiene får eskene sine.
              </Typography>
            </Container>
          </Grid>
          <Grid item className={classes.imageContainer}>
            <img className={classes.backgroundImage} src={snowmanFull}></img>
          </Grid>
        </Grid>
      </Container>
    );
  else {
    return <LoadingPage />;
  }
};
export default VerifyConnection;
