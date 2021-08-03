import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import { GiverType, RecipientType, SelectedConnectionType } from "./Types";
import { FiberManualRecord } from "@material-ui/icons";
import useStyles from "./Styles";

type IStatistics = {
  givers: GiverType[] | [];
  recipients: RecipientType[] | [];
};

const Statistics: React.FC<IStatistics> = ({ givers, recipients }) => {
  const totalGivers: number = givers.length;
  const totalRecipints: number = recipients.length;
  let suggestedMatch: number = 0;
  let confirmedMatch: number = 0;
  givers.map((giver) => {
    if (giver.isSuggestedMatch) {
      if (giver.hasConfirmedMatch) {
        confirmedMatch++;
      } else {
        suggestedMatch++;
      }
    }
  });
  const giversWithoutRecipient: number = totalGivers - suggestedMatch;
  const recipientsWithoutGiver: number = totalRecipints - suggestedMatch;
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" justifyContent="flex-start" className={classes.statisticsContainer}>
        <Grid item className={classes.infoContainer}>
          <Typography  variant="h4">
            {" "}
            {totalRecipints.toString()} familier
          </Typography>
          <Typography className={classes.textWarning}>
            {" "}
            {recipientsWithoutGiver.toString()} uten giver
          </Typography>
        </Grid>
        <Grid item className={classes.infoContainer}>
          <Typography variant="h4"> {totalGivers.toString()} givere</Typography>
          <Typography className={classes.textWarning}>
            {" "}
            {giversWithoutRecipient.toString()} uten familie
          </Typography>
        </Grid>
        <Grid item className={classes.infoContainer}>
          <Typography  variant="h4">Koblinger:</Typography>
          <Typography>
            <FiberManualRecord fontSize="large" style={{ color: "#49a591" }} />{" "}
            {suggestedMatch.toString()}
            <FiberManualRecord
              fontSize="large"
              style={{ color: "#f4cf8a" }}
            />{" "}
            {confirmedMatch.toString()}
          </Typography>
        </Grid>
        <Grid item className={classes.explanationContainer}>
            <Typography variant="h4">Forklaring</Typography>
          <Typography>
            <FiberManualRecord fontSize="large" color="primary" /> = bekreftet
            kobling
          </Typography>
          <br />
          <Typography>
            <FiberManualRecord
              fontSize="large"
              //not possible to use color="warning"
              style={{ color: "#f4cf8a" }}
            />{" "}
            = foreslått kobling
          </Typography>
          <br />
          <Typography>
            <FiberManualRecord fontSize="large" color="error" /> = ikke koblet
            enda
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
