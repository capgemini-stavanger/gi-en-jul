import React, {useState} from "react";
import useStyles from "./Styles";
import { SelectedConnectionType } from "../../../components/shared/Types";
import { Grid, Typography, Modal, Box, Button} from "@material-ui/core";


type ConnectButtonProps = {
  selectedConnection: SelectedConnectionType;
  connectGiverRecipient: () => void;
};


const ConnectButton: React.FC<ConnectButtonProps> = ({
  selectedConnection,
  connectGiverRecipient,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const displayButton = () => {
    if (
      selectedConnection.giver != undefined &&
      selectedConnection.recipient == undefined
    ) {
      return (
        <Button
          onClick={connectGiverRecipient}
          className={classes.waitingButton}
        >
          Velg en familie å koble sammen med <br />{" "}
          {selectedConnection.giver?.fullName}
        </Button>
      );
    }
    if (
      selectedConnection.giver == undefined &&
      selectedConnection.recipient != undefined
    ) {
      return (
        <Button
          onClick={connectGiverRecipient}
          className={classes.waitingButton}
        >
          Velg en giver å koble sammen med <br /> med familienummer{" "}
          {selectedConnection.recipient?.familyId}
        </Button>
      );
    }
    if (
      selectedConnection.giver != undefined &&
      selectedConnection.recipient != undefined
    ) {
      return (
        <div>
        <Button
          onClick={() => {openModal();}}
          className={classes.finishedButton}
        >
          Koble sammen <br />
          {selectedConnection.giver?.fullName} med familienummer{" "}
          {selectedConnection.recipient?.familyId}
        </Button>
        <Modal open={open}>
        <Box className={classes.modalStyle}>
          <Typography variant="h6" component="h2">
            Bekreft at du vil koble {selectedConnection.giver?.fullName} sammen med familienummer {""}
            {selectedConnection.recipient?.familyId}
            </Typography>
            <Grid container direction="row" spacing={8}>
              <Grid item>
                <Button color="primary" variant="contained" onClick={() => {connectGiverRecipient();closeModal();}}>Ja</Button>
              </Grid>
              <Grid item >
                <Button color="inherit" variant="contained" onClick={closeModal}>Nei</Button>
              </Grid>
            </Grid>
        </Box>
        </Modal>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return <>{displayButton()}</>;
};
export default ConnectButton;
