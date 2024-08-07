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
import { isMobile } from "common/functions/IsMobile";

interface RouteParameters {
  giverRowKey: string;
  recipientRowKey: string;
  partitionKey: string;
}

interface IFeedback {
  deleteGiver: boolean;
  feedbackGiver: string;
}

type ConnectionDenied = RouteComponentProps<RouteParameters>;

const ConnectionDenied: React.FC<ConnectionDenied> = () => {
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

          if (response.data.status !== 3) {
            setPageLoadedResult(false);
            console.error(response.data.text);
            setErrorCheck(true);
            setErrorText(response.data);
          }
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
      <Container className={classes.fillBackground}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          {pageLoaded ? (
            <Grid item xs={4}>
              {pageLoadedResult ? (
                <Container className={classes.verifyDenyConnectionContainer}>
                  {!feedbackSubmitted ? (
                    <React.Fragment>
                      <Typography className={classes.headingBold}>
                        Du har valgt å avslå forbindelsen! <br />
                      </Typography>

                      <Typography className={classes.paragraph}>
                        Dersom du ønsker en annen størrelse på familien, kommenter det her, men vi
                        kan ikke garantere en ny familie. Vi kan ikke hensynta ønsker om alder på
                        barna.
                      </Typography>
                      <Typography className={classes.paragraph}>
                        Ønsker du å trekke deg som giver, kan du krysse av boksen under. <br />
                        Du vil da bli fjernet helt fra våre systemer.
                        <br /> Vi vil da ikke trenge din tilbakemelding.
                      </Typography>
                      {!finishedCheck && (
                        <TextField
                          type="text"
                          label="Tilbakemelding"
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
                      <Typography className={classes.spacingBottom}>
                        {" "}
                        Jeg trekker meg som giver{" "}
                      </Typography>
                      <Button variant="contained" type="submit" color="primary" onClick={onSubmit}>
                        Send Tilbakemelding
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
                      <Button
                        size="large"
                        style={{ marginTop: "1rem" }}
                        endIcon={<ArrowForwardIos />}
                        className={classes.buttonNext}
                        onClick={() => history.push("/")}
                      >
                        Til hjemsiden
                      </Button>
                    </React.Fragment>
                  )}
                </Container>
              ) : (
                <Container className={classes.verifyDenyConnectionContainer}>
                  <Typography className={classes.headingBold}>Det har oppstått en feil</Typography>
                  <Typography className={classes.paragraphBold}>
                    Det har desverre sjedd noe feil i våre systemer. Denne handlingen du prøvde på
                    gikk ikke igjennom. Før du eventuelt tar kontakt med oss, sjekk mailboksen din
                    for en mail fra oss.
                  </Typography>
                </Container>
              )}
            </Grid>
          ) : (
            <Grid item>
              <DotLoader />
            </Grid>
          )}
          {!isMobile() && (
            <Grid item>
              <img className={classes.backgroundImage} src={snowmanFull}></img>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
export default ConnectionDenied;
