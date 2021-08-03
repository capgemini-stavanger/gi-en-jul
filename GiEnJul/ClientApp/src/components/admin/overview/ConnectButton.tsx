import { Button, Container, Grid } from "@material-ui/core";
import React from "react";
import useStyles from "./Styles";
import { SelectedConnectionType } from "./Types";

type ConnectButtonProps = {
  selectedConnection: SelectedConnectionType;
  connectGiverRecipient: () => void;
};

const ConnectButton: React.FC<ConnectButtonProps> = ({
  selectedConnection,
  connectGiverRecipient,
}) => {
  const classes = useStyles();
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
        <Button
          onClick={connectGiverRecipient}
          className={classes.finishedButton}
        >
          Koble sammen <br />
          {selectedConnection.giver?.fullName} med familienummer{" "}
          {selectedConnection.recipient?.familyId}
        </Button>
      );
    } else {
      return <></>;
    }
  };
  return (
    <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-end">
      {displayButton()}
    </Grid>
  );
};
export default ConnectButton;
