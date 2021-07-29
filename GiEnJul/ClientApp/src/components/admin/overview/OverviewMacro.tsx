import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../../common/functions/apiServiceClass";
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
  const apiservice = new ApiService();

  async function fetchGivers() {
    await apiservice
      .get("admin/givers")
      .then((resp) => setGiverData(resp.data))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }
  async function fetchRecipients() {
    await apiservice
      .get("admin/recipients")
      .then((resp) => setRecipientData(resp.data))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  useEffect(() => {
    fetchRecipients();
    fetchGivers();
  }, []);

  const handleGiverChange = (
    newGiver: GiverType
  ) => {  
    if (selectedConnection.current.giverRowKey === newGiver.rowKey) {
      selectedConnection.current.giverRowKey = "";
      selectedConnection.current.giverPartitionKey = "";
    } else {
      selectedConnection.current.giverRowKey = newGiver.rowKey;
      selectedConnection.current.giverPartitionKey = newGiver.partitionKey;
    }
  };

  const handleRecipientChange = (
    newRecipient: RecipientType,
  ) => {
    if (selectedConnection.current.recipientRowKey === newRecipient.rowKey) {
      selectedConnection.current.recipientRowKey = "";
      selectedConnection.current.recipientPartitionKey = "";
    } else {
      selectedConnection.current.recipientRowKey = newRecipient.rowKey;
      selectedConnection.current.recipientPartitionKey =
        newRecipient.partitionKey;
    }
  };

  const connectGiverRecipient = async () => {
    await apiservice
      .post(
        "admin/",
        JSON.stringify({
          GiverRowKey: selectedConnection.current.giverRowKey,
          GiverPartitionKey: selectedConnection.current.giverPartitionKey,
          RecipientRowKey: selectedConnection.current.recipientRowKey,
          RecipientPartitionKey:
            selectedConnection.current.recipientPartitionKey,
        })
      )
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
