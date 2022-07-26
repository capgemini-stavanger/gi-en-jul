import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GiverType, RecipientType } from "components/shared/Types";
import useStyles from "components/admin/dashboard-all/Styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { ErrorOutlineOutlined, CheckCircleOutline, CancelOutlined } from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";
import { FAMILY_SIZES } from "common/constants/FamilySizes";

type IStatistics = {
  givers: GiverType[];
  recipients: RecipientType[];
};
type StatisticsType = {
  totalGivers: number;
  giverSmallFam: number;
  giverMedFam: number;
  giverLargeFam: number;
  totalRecipints: number;
  recipientSmallFam: number;
  recipientMedFam: number;
  recipientLargeFam: number;
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
        giverSmallFam: getGiversSmallFamily(givers),
        giverMedFam: getGiversMedFamily(givers),
        giverLargeFam: getGiversLargeFamily(givers),
        totalRecipints: recipients.length,
        recipientSmallFam: getRecipientsSmallFamily(recipients),
        recipientMedFam: getRecipientsMedFamily(recipients),
        recipientLargeFam: getRecipientsLargeFamily(recipients),
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

  const getGiversSmallFamily = (givers: GiverType[]) => {
    return givers.filter((giver) => giver.maxReceivers <= FAMILY_SIZES[0].value).length;
  };
  const getGiversMedFamily = (givers: GiverType[]) => {
    return givers.filter(
      (giver) =>
        giver.maxReceivers > FAMILY_SIZES[0].value && giver.maxReceivers <= FAMILY_SIZES[1].value
    ).length;
  };
  const getGiversLargeFamily = (givers: GiverType[]) => {
    return givers.filter(
      (giver) =>
        giver.maxReceivers > FAMILY_SIZES[1].value && giver.maxReceivers <= FAMILY_SIZES[2].value
    ).length;
  };
  const getRecipientsSmallFamily = (recipients: RecipientType[]) => {
    return recipients.filter((recipient) => recipient.familyMembers.length <= FAMILY_SIZES[0].value)
      .length;
  };
  const getRecipientsMedFamily = (recipients: RecipientType[]) => {
    return recipients.filter(
      (recipient) =>
        recipient.familyMembers.length > FAMILY_SIZES[0].value &&
        recipient.familyMembers.length <= FAMILY_SIZES[1].value
    ).length;
  };
  const getRecipientsLargeFamily = (recipients: RecipientType[]) => {
    return recipients.filter(
      (recipient) =>
        recipient.familyMembers.length > FAMILY_SIZES[1].value &&
        recipient.familyMembers.length <= FAMILY_SIZES[2].value
    ).length;
  };

  return (
    <Box>
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5">Oversikt</Typography>
      </Box>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5"> Givere: {statistics?.totalGivers} </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>Størrelse</Grid>
          <Grid item>Antall</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(1)}
          </Grid>
          <Grid item>{statistics?.giverSmallFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(4)}
          </Grid>
          <Grid item>{statistics?.giverMedFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(10)}
          </Grid>
          <Grid item>{statistics?.giverLargeFam}</Grid>
        </Grid>
        <Typography className={classes.textWarning}>
          {statistics?.giversWithoutRecipient} uten familie
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5"> Familier: {statistics?.totalRecipints} </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>Størrelse</Grid>
          <Grid item>Antall</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(1)}
          </Grid>
          <Grid item>{statistics?.recipientSmallFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(4)}
          </Grid>
          <Grid item>{statistics?.recipientMedFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleOutlineIcon />
            {formatFamily(10)}
          </Grid>
          <Grid item>{statistics?.recipientLargeFam}</Grid>
        </Grid>
        <Typography className={classes.textWarning}>
          {statistics?.recipientsWithoutGiver} uten familie
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Grid item>
          <Typography variant="h5">Koblinger</Typography>
          <Typography>
            <CheckCircleOutline style={{ color: "green" }} />
            {statistics?.confirmedMatch} Bekreftede
          </Typography>
          <Typography>
            <ErrorOutlineOutlined style={{ color: "yellow" }} />
            {statistics?.suggestedMatch} Foreslåtte
          </Typography>
          <Typography>
            <CancelOutlined style={{ color: "red" }} /> {statistics?.noMatch} Ikke koblet
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default OverviewStatistics;

/*
Grid container direction="column" alignItems="flex-start" spacing={4}>
      <Grid item>
        <Typography variant="h5">Oversikt</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5"> {statistics?.totalGivers} Givere </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(1)} - {statistics?.giverSmallFam}
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(4)} - {statistics?.giverMedFam}
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(10)} - {statistics?.giverLargeFam}
        </Typography>
        <Typography className={classes.textWarning}>
          {statistics?.giversWithoutRecipient} uten familie
        </Typography>
      </Grid>
      <Divider />
      <Grid item className={classes.statsGrow}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>STR</Grid>
          <Grid item>ANTALL</Grid>
        </Grid>
        <Typography variant="h5"> {statistics?.totalRecipints} Familier </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(1)} - {statistics?.recipientSmallFam}
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(4)} - {statistics?.recipientMedFam}
        </Typography>
        <Typography>
          <PeopleOutlineIcon /> {formatFamily(10)} - {statistics?.recipientLargeFam}
        </Typography>
        <Typography className={classes.textWarning}>
          {statistics?.recipientsWithoutGiver} uten giver
        </Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography variant="h5">Koblinger</Typography>
        <Typography>
          <CheckCircleOutline style={{ color: "green" }} />
          {statistics?.confirmedMatch} Bekreftede
        </Typography>
        <Typography>
          <ErrorOutlineOutlined style={{ color: "yellow" }} />
          {statistics?.suggestedMatch} Foreslåtte
        </Typography>
        <Typography>
          <CancelOutlined style={{ color: "red" }} /> {statistics?.noMatch} Ikke koblet
        </Typography>
      </Grid>
    </Grid>
*/
