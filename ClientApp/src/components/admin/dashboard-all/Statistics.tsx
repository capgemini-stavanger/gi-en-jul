import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GiverType, RecipientType } from "components/shared/Types";
import { FiberManualRecord } from "@material-ui/icons";
import useStyles from "components/admin/dashboard-all/Styles";

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

  const getStatistics = () => {
    setStatistics((prevState) => {
      return {
        ...prevState,
        totalGivers: givers.length,
        totalRecipints: recipients.length,
        suggestedMatch: givers.filter((giver) => giver.isSuggestedMatch === true && giver.hasConfirmedMatch === false).length,
        confirmedMatch: givers.filter((giver) => giver.hasConfirmedMatch === true).length,
        giversWithoutRecipient: (givers.filter((giver) => giver.isSuggestedMatch === false).length),
        recipientsWithoutGiver: (recipients.filter((recipient) => recipient.isSuggestedMatch === false).length),
      };
    });
  };
  useEffect(() => {
    getStatistics();
  }, [recipients, givers]);
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.statisticsContainer}
    >
      <Grid item className={classes.infoContainer}>
        <Typography variant="h4">
          {" "}
          {statistics?.totalRecipints} familier
        </Typography>
        <Typography className={classes.textWarning}>
          {" "}
          {statistics?.recipientsWithoutGiver} uten giver
        </Typography>
      </Grid>
      <Grid item className={classes.infoContainer}>
        <Typography variant="h4"> {statistics?.totalGivers} givere</Typography>
        <Typography className={classes.textWarning}>
          {" "}
          {statistics?.giversWithoutRecipient} uten familie
        </Typography>
      </Grid>
      <Grid item className={classes.infoContainer}>
        <Typography variant="h4">Koblinger:</Typography>
        <Typography>
          <FiberManualRecord fontSize="large" style={{ color: "#f4cf8a" }} />{" "}
          {statistics?.suggestedMatch}
          <FiberManualRecord fontSize="large" color="primary" />{" "}
          {statistics?.confirmedMatch}
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
  );
};

export default Statistics;
