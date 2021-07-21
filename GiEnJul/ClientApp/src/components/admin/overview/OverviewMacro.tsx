import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { GiverType, RecipientType, SelectedConnectionType } from "./Types";

const initState: SelectedConnectionType = {
  giverRowKey: "",
  giverPartitionKey: "",
  recipientRowKey: "",
  recipientPartitionKey: "",
};

function OverviewMacro() {
  const selectedConnection = useRef<SelectedConnectionType>(initState);
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
    if (selectedConnection.current.giverRowKey === newGiverRowKey) {
      selectedConnection.current.giverRowKey = "";
      selectedConnection.current.giverPartitionKey = "";
    } else {
      selectedConnection.current.giverRowKey = newGiverRowKey;
      selectedConnection.current.giverPartitionKey = newGiverPartitionKey;
    }
  };

  const handleRecipientChange = (
    newRecipientRowKey: string,
    newRecipientPartitionKey: string
  ) => {
    if (selectedConnection.current.recipientRowKey === newRecipientRowKey) {
      selectedConnection.current.recipientRowKey = "";
      selectedConnection.current.recipientPartitionKey = "";
    } else {
      selectedConnection.current.recipientRowKey = newRecipientRowKey;
      selectedConnection.current.recipientPartitionKey =
        newRecipientPartitionKey;
    }
  };

  const connectGiverRecipient = async () => {
    await fetch("api/admin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        GiverRowKey: selectedConnection.current.giverRowKey,
        GiverPartitionKey: selectedConnection.current.giverPartitionKey,
        RecipientRowKey: selectedConnection.current.recipientRowKey,
        RecipientPartitionKey: selectedConnection.current.recipientPartitionKey,
      }),
    })
      .then((response) => {
        //use this for sending a response to the user
        if (response.status === 200) {
          fetchRecipients();
          fetchGivers();
          selectedConnection.current = initState;
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
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
            selectedConnection={selectedConnection.current}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <Recipient
            data={recipientData}
            handleRecipientChange={handleRecipientChange}
            selectedConnection={selectedConnection.current}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default OverviewMacro;
