import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { SelectedConnectionType } from "components/shared/Types";
import useStyles from "../Styles";
import { PeopleOutline } from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";

type IStatistics = {
  connection: SelectedConnectionType;
};

const OverviewConnection: React.FC<IStatistics> = ({ connection }) => {
  const classes = useStyles();

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
            onClick={() => console.log("CLICK")}
          >
            <Typography>Koble sammen</Typography>
          </Button>
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
