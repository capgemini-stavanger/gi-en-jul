import { Button } from "@material-ui/core";
import React from "react";
import useStyles from "./Styles";
import { SelectedConnectionType } from "../../../common/components/Types";

type ConnectButtonProps = {
  selectedConnection: SelectedConnectionType;
  connectGiverRecipient: () => void;
  confirmModal: () => void; 
};

const ConnectButton: React.FC<ConnectButtonProps> = ({
  selectedConnection,
  connectGiverRecipient,
  confirmModal,
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
          onClick={confirmModal}
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
  return <>{displayButton()}</>;
};
export default ConnectButton;
