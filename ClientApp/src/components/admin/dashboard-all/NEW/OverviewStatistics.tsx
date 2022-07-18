import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GiverType, RecipientType } from "components/shared/Types";
import { FiberManualRecord } from "@material-ui/icons";
import useStyles from "components/admin/dashboard-all/Styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

type IStatistics = {
  givers: GiverType[];
  recipients: RecipientType[];
};
type StatisticsType = {
  totalGivers: number;
  totalRecipints: number;
  noMatch: number;
  suggestedMatch: number;
  confirmedMatch: number;
  giversWithoutRecipient: number;
  recipientsWithoutGiver: number;
};

const OverviewStatistics: React.FC<IStatistics> = ({ givers, recipients }) => {
  const [statistics, setStatistics] = useState<StatisticsType>();

  const getStatistics = () => {
    setStatistics((prevState) => {
      return {
        ...prevState,
        totalGivers: givers.length,
        totalRecipints: recipients.length,
        noMatch: givers.filter(
          (giver) => giver.isSuggestedMatch === false && giver.hasConfirmedMatch === false
        ).length,
        suggestedMatch: givers.filter(
          (giver) => giver.isSuggestedMatch === true && giver.hasConfirmedMatch === false
        ).length,
        confirmedMatch: givers.filter((giver) => giver.hasConfirmedMatch === true).length,
        giversWithoutRecipient: givers.filter((giver) => giver.isSuggestedMatch === false).length,
        recipientsWithoutGiver: recipients.filter(
          (recipient) => recipient.isSuggestedMatch === false
        ).length,
      };
    });
  };
  useEffect(() => {
    getStatistics();
  }, [recipients, givers]);
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4}>
      <Grid item>
        <Typography variant="h5">Oversikt</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5"> {statistics?.totalRecipints} Givere </Typography>
        <Typography className={classes.textWarning}>
          {statistics?.giversWithoutRecipient} uten giver
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5"> {statistics?.totalRecipints} Givere </Typography>
        <Typography>
          <PeopleOutlineIcon /> SIZE - ANTALL
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> SIZE - ANTALL
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> SIZE - ANTALL
        </Typography>
        <Typography className={classes.textWarning}>
          {statistics?.recipientsWithoutGiver} uten familie
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">Koblinger</Typography>
        <Typography>
          <FiberManualRecord fontSize="large" color="primary" />
          {statistics?.confirmedMatch} Bekreftede
        </Typography>
        <Typography>
          <FiberManualRecord
            fontSize="large"
            //not possible to use color="warning"
            style={{ color: "#f4cf8a" }}
          />
          {statistics?.suggestedMatch} Foreslåtte
        </Typography>
        <Typography>
          <FiberManualRecord fontSize="large" color="error" /> {statistics?.noMatch} Ikke koblet
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OverviewStatistics;
