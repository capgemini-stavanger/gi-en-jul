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
  import useStyles from "./Styles";
  
  const style = {
    dialogWidth: {
      minWidth: "50vh"
    }
  }

  interface IMessageDialog {
    setMessage: (message: string) => void;
    onClose: () => void;
    open: boolean;
  }
  
  const MessageDialog
  : FC<IMessageDialog> = ({
    setMessage,
    onClose,
    open,
  }) => {
    const classes = useStyles();
  
    const [value, setValue] = useState("");

    const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setMessage(e.target.value);
      };

    const handleSubmit = () => {
    setMessage(value);
    onClose();
    };
  
    return (
      <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title" disableTypography>
          <Typography
          style={style.dialogWidth}
          variant="h6"
          align="center"
          
          >Kommentar
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
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
                    Legg til kommentar
                </Button>
            </DialogActions>
      </Dialog>
    );
  };
  
  export default MessageDialog;
  