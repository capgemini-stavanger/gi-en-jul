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
    familyId: string;
    referenceId: string;
    handleClose: () => void;
  }
  
  const ConfirmationDialog: FC<IConfirmationDialog> = ({
    open,
    familyId,
    referenceId,
    handleClose,
  }) => {

return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Familie Registrert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                { referenceId.length > 0 &&
                <p>Din Id: <b>{referenceId}</b></p>
                }
                <p>Gi en jul's samilienummer: <b>{familyId}</b></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Fortsett
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;