import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { SelectedConnectionType } from "components/shared/Types";
import useStyles from "./Styles";
import { CancelOutlined } from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";
import ConfirmationBox from "components/shared/ConfirmationBox";
import DotLoader from "common/constants/DotLoader";
import PeopleIcon from "@material-ui/icons/People";
import { RequestState } from "./OverviewMacroRemake";

type IStatistics = {
  connection: SelectedConnectionType;
  connectGiverRecipient: () => void;
  resetSelections: () => void;
  requestState: number;
};

const OverviewConnection: React.FC<IStatistics> = ({
  connection,
  connectGiverRecipient,
  resetSelections,
  requestState,
}) => {
  const classes = useStyles();

  const [openConfirmBox, setOpenConfirmBox] = useState(false);

  const handleConfirmation = (response: boolean) => {
    if (response) {
      connectGiverRecipient();
      setOpenConfirmBox(false);
    }
  };

  return (
    <React.Fragment>
      {requestState == RequestState.Init && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <Box className={classes.gridBoxLeft}>
              {connection.giver ? (
                <Box>
                  <Typography variant="h5">{connection.giver.fullName}</Typography>
                  <Typography variant="h5">
                    <PeopleIcon />
                    {formatFamily(connection.giver.maxReceivers)}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5">
                    Velg en
                    <Box
                      style={{ paddingLeft: "5px", paddingRight: "5px" }}
                      className={classes.boldText}
                      display="inline"
                    >
                      <CancelOutlined className={classes.noneIcon} /> ikke koblet
                    </Box>
                    giver
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.gridBoxCenter}>
              <Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!connection.giver || !connection.recipient}
                  onClick={() => {
                    setOpenConfirmBox(true);
                  }}
                  style={{ height: "50px", width: "200px" }}
                >
                  Koble sammen
                </Button>
              </Typography>
              <ConfirmationBox
                open={openConfirmBox}
                text={"Er du sikker på at du vil koble sammen giver og familie?"}
                handleClose={() => {
                  setOpenConfirmBox(false);
                }}
                handleResponse={handleConfirmation}
              />
            </Box>
            <Box className={classes.gridBoxCenter}>
              <Typography
                className={classes.nullstillButton}
                onClick={() => {
                  resetSelections();
                }}
              >
                Nullstill
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.gridBoxRight}>
              {connection.recipient ? (
                <Box>
                  <Typography variant="h5" align="right">
                    Familie ID: {connection.recipient?.familyId}
                  </Typography>
                  <Typography variant="h5" align="right">
                    <PeopleIcon />
                    {connection.recipient.familyMembers.length}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5" align="right">
                    Velg en
                    <Box
                      style={{ paddingLeft: "5px", paddingRight: "5px" }}
                      className={classes.boldText}
                      display="inline"
                    >
                      <CancelOutlined className={classes.noneIcon} /> ikke koblet
                    </Box>
                    familie
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}

      {requestState == RequestState.Waiting && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box className={classes.gridBoxCenter}>
              <DotLoader />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      )}

      {requestState == RequestState.Ok && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box className={classes.gridBoxCenter}>
              <Typography> Vellykket handling </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      )}

      {requestState == RequestState.Error && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Box className={classes.gridBoxCenter}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography>Handlingen var ikke vellykket</Typography>
                </Grid>
                <Grid item>
                  <Typography>Det kan være flere som jobber samtidig</Typography>
                </Grid>
                <Grid item>
                  <Typography>Last inn siden på nytt og prøv igjen</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default OverviewConnection;
