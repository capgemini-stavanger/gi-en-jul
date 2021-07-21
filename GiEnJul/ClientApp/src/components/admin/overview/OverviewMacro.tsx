import React, { useEffect, useState, useCallback } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { Button, Grid, Typography } from "@material-ui/core";
import { SelectedConnectionType, GiverType, RecipientType } from "./Types";

const initState: SelectedConnectionType = {
  giverRowKey: "",
  giverPartitionKey: "",
  recipientRowKey: "",
  recipientPartitionKey: "",
};

function OverviewMacro() {
  const [selectedConnection, setSelectedConnection] =
    useState<SelectedConnectionType>(initState);
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

  const handleGiverChange = useCallback(
    (newGiverRowKey: string, newGiverPartitionKey: string) => {
      if (selectedConnection.giverRowKey === newGiverRowKey) {
        setSelectedConnection((prev) => ({ ...prev, giverRowKey: "" }));
        setSelectedConnection((prev) => ({
          ...prev,
          giverPartitionKey: "",
        }));
      } else {
        setSelectedConnection((prev) => ({
          ...prev,
          giverRowKey: newGiverRowKey,
        }));
        setSelectedConnection((prev) => ({
          ...prev,
          giverPartitionKey: newGiverPartitionKey,
        }));
      }
    },
    [selectedConnection.giverPartitionKey, selectedConnection.giverRowKey]
  );

  const handleRecipientChange = useCallback(
    (newRecipientRowKey: string, newRecipientPartitionKey: string) => {
      if (selectedConnection.recipientRowKey === newRecipientRowKey) {
        setSelectedConnection((prev) => ({
          ...prev,
          recipientRowKey: "",
        }));
        setSelectedConnection((prev) => ({
          ...prev,
          recipientPartitionKey: "",
        }));
      } else {
        setSelectedConnection((prev) => ({
          ...prev,
          recipientRowKey: newRecipientRowKey,
        }));
        setSelectedConnection((prev) => ({
          ...prev,
          recipientPartitionKey: newRecipientPartitionKey,
        }));
      }
    },
    [
      selectedConnection.recipientPartitionKey,
      selectedConnection.recipientRowKey,
    ]
  );

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
        //use this for sending a response to the user
        if (response.status === 201) {
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
    fetchRecipients();
    fetchGivers();
    setSelectedConnection(initState);
  };

  return (
    <>
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
          <Giver
            data={giverData}
            handleGiverChange={handleGiverChange}
            selectedConnection={selectedConnection}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <Recipient
            data={recipientData}
            handleRecipientChange={handleRecipientChange}
            selectedConnection={selectedConnection}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default OverviewMacro;
