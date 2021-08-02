import { Container, Grid, Typography } from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import ApiService from "../../../common/functions/apiServiceClass";
import ConnectButton from "./ConnectButton";
import Giver from "./Giver";
import Recipient from "./Recipient";
import useStyles from "./Styles";
import { GiverType, RecipientType, SelectedConnectionType } from "./Types";

const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};
interface IOverviewMacro {
  location: string;
}

const OverviewMacro: React.FC<IOverviewMacro> = ({ location }) => {
  const [selectedConnection, setSelectedConnection] =
    useState<SelectedConnectionType>(initState);
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService();

  async function fetchGivers() {
    await apiservice
      .get("admin/Overview/Givers", { params: { location: location } })
      .then((resp) => setGiverData(resp.data))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }
  async function fetchRecipients() {
    await apiservice
      .get("admin/Overview/Recipients", { params: { location: location } })
      .then((resp) => setRecipientData(resp.data))
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  useEffect(() => {
    fetchRecipients();
    fetchGivers();
  }, []);

  const handleGiverChange = useCallback((newGiver: GiverType) => {
    if (!newGiver.isSuggestedMatch && !newGiver.hasConfirmedMatch) {
      if (selectedConnection.giver?.rowKey === newGiver.rowKey) {
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
      if (selectedConnection.recipient?.rowKey === newRecipient.rowKey) {
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
          GiverRowKey: selectedConnection.giver?.rowKey,
          GiverPartitionKey: selectedConnection.giver?.partitionKey,
          RecipientRowKey: selectedConnection.recipient?.rowKey,
          RecipientPartitionKey: selectedConnection.recipient?.partitionKey,
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
  const classes = useStyles();
  return (
    <>
      <Container>
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
        <ConnectButton
          selectedConnection={selectedConnection}
          connectGiverRecipient={connectGiverRecipient}
        />
      </Container>
    </>
  );
};
export default OverviewMacro;
