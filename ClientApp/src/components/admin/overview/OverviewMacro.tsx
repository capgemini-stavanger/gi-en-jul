import { Container, Grid, Snackbar,Typography, Modal, Box, Button} from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import ApiService from "../../../common/functions/apiServiceClass";
import EditFamily from "../../../common/components/EditFamily";
import ConnectButton from "./ConnectButton";
import Giver from "./Giver";
import Recipient from "./Recipient";
import Statistics from "./Statistics";
import useStyles from "./Styles";
import { GiverType, RecipientType, SelectedConnectionType } from "../../../common/components/Types";
import * as Types from "../../../common/components/Types";
import { Alert } from "@material-ui/lab";

const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};
interface IOverviewMacro {
  location: string;
  accessToken: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  
const OverviewMacro: React.FC<IOverviewMacro> = ({ accessToken, location }) => {
  const [selectedConnection, setSelectedConnection] =
    useState<SelectedConnectionType>(initState);
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService(accessToken);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

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
      .then((resp) => {
        setRecipientData(resp.data)})
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
          <Grid item xs={2}>
            <Statistics givers={giverData} recipients={recipientData}/>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">
              Givere
            </Typography>
            <Giver data={giverData} handleGiverChange={handleGiverChange} />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">
              Familier
            </Typography>
            <Recipient
              data={recipientData}
              refreshRecipients={() => fetchRecipients()}
              handleRecipientChange={handleRecipientChange}
            />
          </Grid>
        </Grid>
        <Modal open={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Bekreft at du vil koble {selectedConnection.giver?.fullName} sammen med familienummer{""}
              {selectedConnection.recipient?.familyId}
              </Typography>
              <Button color="primary" onClick={() => {connectGiverRecipient();closeModal();}}>Yes</Button>
              <Button color="secondary" onClick={closeModal}>Nei</Button>
          </Box>
          </Modal>
        <ConnectButton
          selectedConnection={selectedConnection}
          connectGiverRecipient={connectGiverRecipient}
          confirmModal={openModal}
        />
      </Container>
    </>
  );
};
export default OverviewMacro;
