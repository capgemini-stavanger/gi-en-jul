import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../../common/functions/apiServiceClass";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { GiverType, RecipientType, SelectedConnectionType } from "./Types";

const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};
interface IOverviewMacro {
  location: string;
}

const OverviewMacro: React.FC<IOverviewMacro> = ({ location }) => {
  const selectedConnection = useRef<SelectedConnectionType>(initState);
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService();

  async function fetchGivers() {
    console.log(location);
    console.log(typeof location);
    await apiservice
      .get("admin/Overview/Givers", { params: { location: location } })
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

  const handleGiverChange = (newGiver: GiverType) => {
    if (!newGiver.isSuggestedMatch && !newGiver.hasConfirmedMatch) {
      if (selectedConnection.current.giver?.rowKey === newGiver.rowKey) {
        selectedConnection.current.giver = undefined;
      } else {
        selectedConnection.current.giver = newGiver;
      }
    } else {
    }
  };

  const handleRecipientChange = (newRecipient: RecipientType) => {
    if (!newRecipient.isSuggestedMatch && !newRecipient.hasConfirmedMatch) {
      if (
        selectedConnection.current.recipient?.rowKey === newRecipient.rowKey
      ) {
        selectedConnection.current.recipient = undefined;
      } else {
        selectedConnection.current.recipient = newRecipient;
      }
    }
  };

  const connectGiverRecipient = async () => {
    await apiservice
      .post(
        "admin/",
        JSON.stringify({
          GiverRowKey: selectedConnection.current.giver?.rowKey,
          GiverPartitionKey: selectedConnection.current.giver?.partitionKey,
          RecipientRowKey: selectedConnection.current.recipient?.rowKey,
          RecipientPartitionKey:
            selectedConnection.current.recipient?.partitionKey,
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
};
export default OverviewMacro;
