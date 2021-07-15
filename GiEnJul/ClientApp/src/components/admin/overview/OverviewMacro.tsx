import React, { useState } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { Button, Grid, Typography } from "@material-ui/core";
import usePost from "../../../hooks/usePost";

export interface SelectedConnectionType {
  giverRowKey: string;
  giverPartitionKey: string;
  recipientRowKey: string;
  recipientPartitionKey: string;
}

function OverviewMacro () {
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

  const connectGiverRecipient = async () => {
    console.log(selectedConnection.giverPartitionKey)
    await fetch("api/admin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        giverRowKey: selectedConnection.giverRowKey,
        giverPartitionKey: selectedConnection.recipientPartitionKey,
        recipientRowKey: selectedConnection.recipientRowKey,
        recipientPartitionKey: selectedConnection.recipientPartitionKey,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
        }
      })
      .catch((errorStack) => {
        console.log(errorStack);
      });
  };

  return (
    <>
      {console.log(selectedConnection)}
      <Button onClick={connectGiverRecipient}>Koble sammen</Button>
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
          <Giver handleGiverChange={handleGiverChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <Recipient handleRecipientChange={handleRecipientChange} />
        </Grid>
      </Grid>
    </>
  );
}
export default OverviewMacro;
