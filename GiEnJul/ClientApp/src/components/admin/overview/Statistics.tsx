import { Card, Grid, Typography } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { GiverType, RecipientType} from "./Types";
import { FiberManualRecord } from "@material-ui/icons";
import useStyles from "./Styles";

type IStatistics = {
  givers: GiverType[] | [];
  recipients: RecipientType[] | [];
};
type StatisticsType = {
  totalGivers: number;
  totalRecipints: number;
  suggestedMatch: number;
  confirmedMatch: number;
  giversWithoutRecipient: number;
  recipientsWithoutGiver: number;

};

const Statistics: React.FC<IStatistics> = ({ givers, recipients }) => {
  const [statistics, setStatistics] = useState<StatisticsType>();

  const getStatistics= () => {
  let suggestedMatch: number = givers.filter(giver => giver.isSuggestedMatch === true).length;
  let confirmedMatch: number = 0;

  
  givers.map((giver) => {

    // if (giver.isSuggestedMatch) {
    //   if (giver.hasConfirmedMatch) {
    //     confirmedMatch++;
    //   } else {
    //     suggestedMatch++;
    //   }
    // }
    setStatistics((prevState) => {
      return {
        ...prevState, 
        totalGivers: givers.length,
        totalRecipints: recipients.length,
        suggestedMatch:suggestedMatch,
        confirmedMatch: confirmedMatch,
        giversWithoutRecipient: (givers.length - suggestedMatch - confirmedMatch),
        recipientsWithoutGiver: (recipients.length - suggestedMatch - confirmedMatch),
      }
    })
  });
}
  useEffect(() => {
    getStatistics();
  }, [recipients]);
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" alignItems="flex-start" className={classes.statisticsContainer}>
        <Grid item className={classes.infoContainer}>
          <Typography  variant="h4">
            {" "}
            {statistics?.totalRecipints.toString()} familier
          </Typography>
          <Typography className={classes.textWarning}>
            {" "}
            {statistics?.recipientsWithoutGiver.toString()} uten giver
          </Typography>
        </Grid>
        <Grid item className={classes.infoContainer}>
          <Typography variant="h4"> {statistics?.totalGivers.toString()} givere</Typography>
          <Typography className={classes.textWarning}>
            {" "}
            {statistics?.giversWithoutRecipient.toString()} uten familie
          </Typography>
        </Grid>
        <Grid item className={classes.infoContainer}>
          <Typography  variant="h4">Koblinger:</Typography>
          <Typography>
            <FiberManualRecord fontSize="large" style={{ color: "#f4cf8a" }} />{" "}
            {statistics?.suggestedMatch.toString()}
            <FiberManualRecord
              fontSize="large"
              color="primary"
            />{" "}
            {statistics?.confirmedMatch.toString()}
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

