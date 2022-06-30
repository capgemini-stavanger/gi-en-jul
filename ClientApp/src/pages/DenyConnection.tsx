import { Button, Checkbox, Container, Grid, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/register-as-giver/Styles";
import snowmanFull from "styling/img/snowmanFull.svg";
import snowDown from "styling/img/snow_down2.svg";

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

  const [finishedCheck, setFinishedCheck] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");

  const apiservice = new ApiService();
  const classes = useStyles();

  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishedCheck(e.target.checked);
  };
  const onFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackInput(e.target.value);
  };

  const onSubmit = () => {
    console.log("SUBMIT");

    const feedback: IFeedback = {
      deleteGiver: finishedCheck,
      feedbackGiver: feedbackInput,
    };

    apiservice
      .post(`verify/${giverRowKey}/${recipientRowKey}/${partitionKey}/deny`, feedback)
      .then((response) => {
        if (response.status == 200) {
          console.log("SUCCESS");
        } else {
          console.log("FAIL");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className={classes.summaryDesign}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <img className={classes.imageSnow} src={snowDown}></img>
          </Grid>
          <Grid item>
            <Container className={classes.giverForm}>
              <Typography className={classes.headingBold}>
                Du har valgt å avslå forbindelsen! <br />
              </Typography>
              <Typography className={classes.paragraph}>
                Vennligst gi en kort tilbakemelding på hvorfor du ønsket å avslå forbindelsen. Om du
                ønsker å trekke deg som giver, så kan du krysse av nedenfor, og tilbakemelding er
                ikke nødvendig.
              </Typography>
              <Checkbox checked={finishedCheck} onChange={onCheckChange} color="primary" /> Jeg
              trekker meg <br />
              <TextField
                variant="standard"
                type="text"
                label="Feedback"
                placeholder="Familien var større enn ønsket.."
                minRows={3}
                value={feedbackInput}
                onChange={onFeedbackChange}
                multiline
              ></TextField>
              <br />
              <br />
              <Button variant="contained" type="submit" color="primary" onClick={onSubmit}>
                Send Feedback
              </Button>
            </Container>
          </Grid>
          <Grid item className={classes.imageContainer}>
            <img className={classes.backgroundImage} src={snowmanFull}></img>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default DenyConnection;
