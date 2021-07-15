import React, { useState } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { Grid, Typography } from "@material-ui/core";

export interface SelectedConnectionType {
  giverRowKey: string;
  giverPartitionKey: string;
  recipientRowKey: string;
  recipientPartitionKey: string;
};

function OverviewMacro() {
  const [selectedConnection, setSelectedConnection] =
    useState<SelectedConnectionType>({
      giverRowKey: "",
      giverPartitionKey: "",
      recipientRowKey: "",
      recipientPartitionKey: "",
    });

  const handleGiverChange = (
    newGiverRowKey: string,
    newGiverPartitionKey: string
  ) => {
    setSelectedConnection((prev) => ({ ...prev, giverRowKey: newGiverRowKey }));
    setSelectedConnection((prev) => ({
      ...prev,
      giverPartitionKey: newGiverPartitionKey,
    }));
  };

  const handleRecipientChange = (
    newRecipientRowKey: string,
    newRecipientPartitionKey: string
  ) => {
    setSelectedConnection((prev) => ({
      ...prev,
      recipientRowKey: newRecipientRowKey,
    }));
    setSelectedConnection((prev) => ({
      ...prev,
      recipientPartitionKey: newRecipientPartitionKey,
    }));
  };

  return (
    <>{console.log(selectedConnection)}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Givere
          </Typography>
          <Giver handleGiverChange={handleGiverChange}/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <Recipient handleRecipientChange={handleRecipientChange}/>
        </Grid>
      </Grid>
    </>
  );
}
export default OverviewMacro;
