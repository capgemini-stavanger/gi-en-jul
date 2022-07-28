import { Button, Checkbox, Container, Grid, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useParams } from "react-router";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/register-as-giver/Styles";
import snowmanFull from "styling/img/snowmanFull.svg";
import snowDown from "styling/img/snow_down2.svg";
import DotLoader from "common/constants/DotLoader";
import React from "react";
import { ArrowForwardIos } from "@material-ui/icons";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface IFeedback {
  deleteGiver: boolean;
  feedbackGiver: string;
}

type VerifyConnection = RouteComponentProps<RouteParameters>;

const DenyConnection: React.FC<VerifyConnection> = () => {
  const { giverRowKey, recipientRowKey, partitionKey } = useParams<RouteParameters>();

  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageLoadedResult, setPageLoadedResult] = useState(false);

  const [finishedCheck, setFinishedCheck] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const apiservice = new ApiService();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishedCheck(e.target.checked);
  };
  const onFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackInput(e.target.value);
  };

  const onLoad = () => {
    apiservice
      .get("connection/connectionStatus", {
        params: { giverId: giverRowKey, recipientId: recipientRowKey, event: partitionKey },
      })
      .then((response) => {
        if (response.status == 200) {
          setPageLoadedResult(true);
        }
      })
      .catch((err) => {
        setPageLoadedResult(false);
        console.error(err);
        setErrorCheck(true);
        setErrorText(err.response.data);
      })
      .finally(() => {
        setPageLoaded(true);
      });
  };

  const onSubmit = () => {
    const feedback: IFeedback = {
      deleteGiver: finishedCheck,
      feedbackGiver: feedbackInput,
    };

    apiservice
      .post(`connection/${giverRowKey}/${recipientRowKey}/${partitionKey}/deny`, feedback)
      .then((response) => {
        if (response.status == 200) {
          setFeedbackSubmitted(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorCheck(true);
        setErrorText(err.response.data);
      });
  };

  return (
    <>
      <Container className={classes.summaryDesign}>
        {!pageLoadedResult && (
          <Button
            size="large"
            endIcon={<ArrowForwardIos />}
            className={classes.buttonMainPage}
            onClick={() => history.push("/")}
          >
            Finn kontaktinformasjon
          </Button>
        )}
        {pageLoadedResult && feedbackSubmitted && (
          <Button
            size="large"
            endIcon={<ArrowForwardIos />}
            className={classes.buttonMainPage}
            onClick={() => history.push("/")}
          >
            Finn kontaktinformasjon
          </Button>
        )}
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          {pageLoaded ? (
            <Grid item>
              {pageLoadedResult ? (
                <Container className={classes.giverForm}>
                  {!feedbackSubmitted ? (
                    <React.Fragment>
                      <Typography className={classes.headingBold}>
                        Du har valgt å avslå forbindelsen! <br />
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Vennligst gi en kort tilbakemelding på hvorfor du ønsket å avslå
                        forbindelsen
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Om du ønsker å trekke deg som giver, så kan du krysse av nedenfor. Du vil da
                        bli fjernet som giver fra våre systemer.
                      </Typography>
                      {!finishedCheck && (
                        <TextField
                          type="text"
                          label="Feedback"
                          variant="outlined"
                          placeholder="Familien var større enn ønsket.."
                          minRows={3}
                          value={feedbackInput}
                          onChange={onFeedbackChange}
                          multiline
                          required
                          error={errorCheck}
                          helperText={errorText}
                          className={classes.feedbackField}
                        ></TextField>
                      )}
                      <Checkbox checked={finishedCheck} onChange={onCheckChange} color="primary" />
                      <Typography className={classes.spacingBottom}> Jeg trekker meg </Typography>
                      <Button variant="contained" type="submit" color="primary" onClick={onSubmit}>
                        Send Feedback
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography className={classes.headingBold}>
                        Takk for tilbakemeldingen! <br />
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Om det er noe mer du lurer på, vennligst ta kontakt
                      </Typography>
                    </React.Fragment>
                  )}
                </Container>
              ) : (
                <Container className={classes.giverForm}>
                  <Typography className={classes.headingBold}>
                    Tusen takk for innsatsen <br />
                    du skal gjøre!
                  </Typography>
                  <Typography className={classes.paragraphBold}>
                    Det har desverre sjedd noe feil i våre systemer så vi fikk ikke registrert din
                    bekreftelse som giver. Ta kontakt med Gi en jul der du bor så skal vi registrere
                    ditt bidrag.
                  </Typography>
                  <Typography className={classes.paragraph}>
                    Vit at familiene setter utrolig stor pris på dette, og det blir mange tårevåte
                    øyeblikk når familiene får eskene sine. Håper du koser deg med finne en fin gave
                  </Typography>
                </Container>
              )}
            </Grid>
          ) : (
            <Grid item>
              <DotLoader />
            </Grid>
          )}
          <Grid item className={classes.imageContainer}>
            <img className={classes.backgroundImage} src={snowmanFull}></img>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default DenyConnection;
