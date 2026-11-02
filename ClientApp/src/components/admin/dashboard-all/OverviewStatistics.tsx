import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GiverType, RecipientType, User } from "components/shared/Types";
import useStyles from "components/admin/dashboard-all/Styles";
import { CheckCircleOutline, CancelOutlined } from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PeopleIcon from "@material-ui/icons/People";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import ApiService from "common/functions/apiServiceClass";
import SendLocationEmail from "components/admin/SendLocationEmail";

type IStatistics = {
  givers: GiverType[];
  recipients: RecipientType[];
  municipality: string;
  accessToken: string;
  user: User;
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

const OverviewStatistics: React.FC<IStatistics> = ({
  givers,
  recipients,
  municipality,
  accessToken,
  user,
}) => {
  const [statistics, setStatistics] = useState<StatisticsType>();
  const [sendEmailOpen, setSendEmailOpen] = useState(false);

  const apiService = new ApiService(accessToken);

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

  const downloadExcelOverview = () => {
    apiService.downloadFile(
      `admin/${municipality}/overview`,
      `oppsummering_${municipality}_${new Date().getFullYear()}${(new Date().getMonth() + 1)
        .toString()
        .padStart(2, "0")}${new Date().getDate().toString().padStart(2, "0")}.xlsx`
    );
  };

  return (
    <Box className={classes.oversiktBoxContent}>
      <Box>
        <Typography variant="h5" className={classes.semiBoldText}>
          Oversikt
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5" className={classes.semiBoldText} gutterBottom>
          Givere: {statistics?.totalGivers}
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>Størrelse</Grid>
          <Grid item>Antall</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
            {formatFamily(1)}
          </Grid>
          <Grid item>{statistics?.giverSmallFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
            {formatFamily(4)}
          </Grid>
          <Grid item>{statistics?.giverMedFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
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
        <Typography variant="h5" className={classes.semiBoldText} gutterBottom>
          Familier: {statistics?.totalRecipints}
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>Størrelse</Grid>
          <Grid item>Antall</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
            {formatFamily(1)}
          </Grid>
          <Grid item>{statistics?.recipientSmallFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
            {formatFamily(4)}
          </Grid>
          <Grid item>{statistics?.recipientMedFam}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <PeopleIcon />
            {formatFamily(10)}
          </Grid>
          <Grid item>{statistics?.recipientLargeFam}</Grid>
        </Grid>
        <Typography className={classes.textWarning}>
          {statistics?.recipientsWithoutGiver} uten giver
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5" className={classes.semiBoldText} gutterBottom>
          Koblinger{"  "}
          <Tooltip placement="top" title="Koblingene som er vist under er basert på giverne">
            <InfoOutlinedIcon />
          </Tooltip>
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>Koblinger</Grid>
          <Grid item>Antall</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <CancelOutlined className={classes.noneIcon} /> Ikke koblet
          </Grid>
          <Grid item>{statistics?.noMatch}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <QueryBuilderOutlinedIcon className={classes.waitingIcon} /> Foreslått
          </Grid>
          <Grid item>{statistics?.suggestedMatch}</Grid>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <CheckCircleOutline className={classes.confirmIcon} /> Bekreftet
          </Grid>
          <Grid item>{statistics?.confirmedMatch}</Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item>
          <Button color="primary" variant="contained" onClick={downloadExcelOverview}>
            Last ned oversikt
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Box className={classes.oversiktBoxSpacing}>
        <Typography variant="h5" className={classes.semiBoldText} gutterBottom>
          Send E-post
        </Typography>
        <Grid container>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => setSendEmailOpen(true)}
            >
              Send e-post
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={sendEmailOpen}
        onClose={() => setSendEmailOpen(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="send-location-email-title"
      >
        <DialogTitle id="send-location-email-title">
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Send e-post</Typography>
            <IconButton aria-label="Lukk" onClick={() => setSendEmailOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {sendEmailOpen && <SendLocationEmail accessToken={accessToken} user={user} hideHeading />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OverviewStatistics;
