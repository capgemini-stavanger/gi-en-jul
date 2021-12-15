import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@material-ui/core";
import { FC } from "react";

interface IConfirmationDialog {
    open: boolean;
    giverId?: string;
    handleClose: () => void;
    handleDeleteGiver: (rowKey?: string) => void;
  }
  
  const DeleteGiverDialog: FC<IConfirmationDialog> = ({
    open,
    giverId,
    handleClose,
    handleDeleteGiver,
  }) => {

    return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Slett giver"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {`Er du sikker på at du vil slette giver ${giverId}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose(); handleDeleteGiver(giverId)}} autoFocus>
            Fortsett
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteGiverDialog;