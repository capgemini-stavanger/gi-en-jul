import React, { useEffect, useState } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { Button, Grid, Typography } from "@material-ui/core";
import { SelectedConnectionType, GiverType, RecipientType } from "./Types";

function OverviewMacro() {
  const [selectedConnection, setSelectedConnection] =
    useState<SelectedConnectionType>({
      giverRowKey: "",
      giverPartitionKey: "",
      recipientRowKey: "",
      recipientPartitionKey: "",
    });
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);

  async function fetchGivers() {
    await fetch("api/admin/givers", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setGiverData(json))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }
  async function fetchRecipients() {
    await fetch("./api/admin/recipients", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setRecipientData(json))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  useEffect(() => {
    fetchRecipients();
    fetchGivers();
  }, []);

  const handleGiverChange = (
    newGiverRowKey: string,
    newGiverPartitionKey: string
  ) => {
    setSelectedConnection((prev) => ({ ...prev, giverRowKey: newGiverRowKey }));
    setSelectedConnection((prev) => ({
      ...prev,
      giverPartitionKey: newGiverPartitionKey,
    }));
    setGiverData(
      giverData.map((item) =>
        item.rowKey === newGiverRowKey && item.isSuggestedMatch === false
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
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
    setRecipientData(
      recipientData.map((item) =>
        item.rowKey === newRecipientRowKey && item.isSuggestedMatch === false
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  };

  const connectGiverRecipient = async () => {
    console.log(selectedConnection.giverPartitionKey);
    await fetch("api/admin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        GiverRowKey: selectedConnection.giverRowKey,
        GiverPartitionKey: selectedConnection.giverPartitionKey,
        RecipientRowKey: selectedConnection.recipientRowKey,
        RecipientPartitionKey: selectedConnection.recipientPartitionKey,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
        }
      })
      .catch((errorStack) => {
        console.log(errorStack);
      });
    fetchRecipients();
    fetchGivers();
  };

  return (
    <>
      <Button onClick={connectGiverRecipient} >Koble sammen</Button>
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
          <Giver data={giverData} handleGiverChange={handleGiverChange} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <Recipient
            data={recipientData}
            handleRecipientChange={handleRecipientChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default OverviewMacro;
