import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { SelectedConnectionType } from "components/shared/Types";
import useStyles from "../Styles";
import { PeopleOutline } from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";
import ConfirmationBox from "components/shared/ConfirmationBox";

type IStatistics = {
  connection: SelectedConnectionType;
  connectGiverRecipient: () => void;
};

const OverviewConnection: React.FC<IStatistics> = ({ connection, connectGiverRecipient }) => {
  const classes = useStyles();

  const [openConfirmBox, setOpenConfirmBox] = useState(false);

  const handleConfirmation = (response: boolean) => {
    if (response) {
      connectGiverRecipient();
      setOpenConfirmBox(false);
    }
  };

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={4}>
        <Box className={classes.gridBoxLeft}>
          {connection.giver ? (
            <Box>
              <Typography variant="h5">{connection.giver.fullName}</Typography>
              <Typography variant="h5">
                <PeopleOutline />
                {formatFamily(connection.giver.maxReceivers)}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5">Ingen valgt kobling</Typography>
              <Typography variant="h5">Velg en giver</Typography>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className={classes.gridBoxCenter}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!connection.giver || !connection.recipient}
            onClick={() => {
              setOpenConfirmBox(true);
            }}
          >
            <Typography>Koble sammen</Typography>
          </Button>
          <ConfirmationBox
            open={openConfirmBox}
            text={"Er du sikker på at du vil koble sammen giver og familie?"}
            handleClose={() => {
              setOpenConfirmBox(false);
            }}
            handleResponse={handleConfirmation}
          />
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
                <PeopleOutline />
                {connection.recipient.familyMembers.length}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" align="right">
                Ingen valgt kobling
              </Typography>
              <Typography variant="h5" align="right">
                Velg en familie
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default OverviewConnection;
