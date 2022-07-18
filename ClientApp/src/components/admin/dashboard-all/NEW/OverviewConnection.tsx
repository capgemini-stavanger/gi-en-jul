import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { SelectedConnectionType } from "components/shared/Types";
import useStyles from "../Styles";

type IStatistics = {
  connection: SelectedConnectionType;
};

const OverviewConnection: React.FC<IStatistics> = ({ connection }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Box className={classes.gridBox}>
          <Typography variant="h5">{connection.giver?.fullName}</Typography>
          <Typography variant="h5">{connection.giver?.maxReceivers}</Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box className={classes.gridBox}>
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
        <Box className={classes.gridBox}>
          <Typography variant="h5">Familie ID: {connection.recipient?.familyId}</Typography>
          <Typography variant="h5">{connection.recipient?.familyMembers.length}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OverviewConnection;
