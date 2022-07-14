import { Container, Grid, Typography } from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import ConnectButton from "./ConnectButton";
import Giver from "./GiverSearch";
import Recipient from "./RecipientSearch";
import Statistics from "./Statistics";
import { GiverType, RecipientType, SelectedConnectionType } from "components/shared/Types";

const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};
interface IOverviewMacro {
  location: string;
  accessToken: string;
}

const OverviewMacro: React.FC<IOverviewMacro> = ({ accessToken, location }) => {
  const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService(accessToken);

  async function fetchGivers() {
    await apiservice
      .get("admin/Overview/Givers", { params: { location: location } })
      .then((resp) => {
        setGiverData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }
  async function fetchRecipients() {
    await apiservice
      .get("admin/Overview/Recipients", { params: { location: location } })
      .then((resp) => {
        setRecipientData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  useEffect(() => {
    fetchRecipients();
    fetchGivers();
  }, []);

  const refreshData = () => {
    fetchGivers();
    fetchRecipients();
    setSelectedConnection(initState);
  };

  const handleGiverChange = useCallback((newGiver: GiverType) => {
    if (!newGiver.isSuggestedMatch && !newGiver.hasConfirmedMatch) {
      if (selectedConnection.giver?.giverId === newGiver.giverId) {
        setSelectedConnection((prevState) => {
          return {
            ...prevState,
            giver: undefined,
          };
        });
      } else {
        setSelectedConnection((prevState) => {
          return {
            ...prevState,
            giver: newGiver,
          };
        });
      }
    } else {
    }
  }, []);

  const handleRecipientChange = useCallback((newRecipient: RecipientType) => {
    if (!newRecipient.isSuggestedMatch && !newRecipient.hasConfirmedMatch) {
      if (selectedConnection.recipient?.recipientId === newRecipient.recipientId) {
        setSelectedConnection((prevState) => {
          return {
            ...prevState,
            recipient: undefined,
          };
        });
      } else {
        setSelectedConnection((prevState) => {
          return {
            ...prevState,
            recipient: newRecipient,
          };
        });
      }
    }
  }, []);

  const connectGiverRecipient = async () => {
    await apiservice
      .post(
        "admin/",
        JSON.stringify({
          GiverRowKey: selectedConnection.giver?.giverId,
          GiverPartitionKey: selectedConnection.giver?.event,
          RecipientRowKey: selectedConnection.recipient?.recipientId,
          RecipientPartitionKey: selectedConnection.recipient?.event,
        })
      )
      .then((response) => {
        //use this for sending a response to the user
        if (response.status === 200) {
          fetchRecipients();
          fetchGivers();
          setSelectedConnection(initState);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  return (
    <>
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={2}>
            <Statistics givers={giverData} recipients={recipientData} />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">
              Givere
            </Typography>
            <Giver
              data={giverData}
              handleGiverChange={handleGiverChange}
              refreshData={() => refreshData()}
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">
              Familier
            </Typography>
            <Recipient
              data={recipientData}
              refreshData={() => refreshData()}
              handleRecipientChange={handleRecipientChange}
            />
          </Grid>
        </Grid>
        <ConnectButton
          selectedConnection={selectedConnection}
          connectGiverRecipient={connectGiverRecipient}
        />
      </Container>
    </>
  );
};
export default OverviewMacro;
