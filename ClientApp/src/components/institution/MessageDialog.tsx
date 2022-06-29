import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { FC, useState } from "react";

const style = {
  dialogWidth: {
    minWidth: "50vh",
  },
};

interface IMessageDialog {
  setMessage: (message: string) => void;
  setAlert: (
    open?: boolean,
    message?: string,
    severity?: "error" | "info" | "success" | "warning"
  ) => void;
  message: string;
  onClose: () => void;
  open: boolean;
}

const MessageDialog: FC<IMessageDialog> = ({ setMessage, setAlert, message, onClose, open }) => {
  const [value, setValue] = useState("");

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  const handleSubmit = () => {
    setMessage(value);
    setAlert(true, "Kommentar oppdatert!", "success");
    onClose();
  };

  const onCommentOpen = () => {
    setValue(message);
  };

  return (
    <Dialog
      onClose={() => {
        onClose();
        onCommentOpen();
      }}
      aria-labelledby="dialog-title"
      open={open}
    >
      <DialogTitle id="dialog-title" disableTypography>
        <Typography style={style.dialogWidth} variant="h6" align="center">
          Kommentar
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={() => {
                onClose();
                onCommentOpen();
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          minRows={4}
          value={value}
          label="Kommentar"
          type="text"
          onChange={onCommentChange}
          placeholder="Kommentaren vil være synlig for giver"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          {(message.length == 0 && <Typography>Legg til kommentar</Typography>) || (
            <Typography>Endre kommentar</Typography>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
