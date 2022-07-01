import { Dialog, Typography } from "@material-ui/core";
import useStyles from "components/shared/Styles";
import React from "react";
import { Button } from "reactstrap";

interface IConfirmation {
  open: boolean;
  text: string;
  handleClose: () => void;
  handleResponse: (response: boolean) => void;
}

const ConfirmationBox: React.FC<IConfirmation> = ({ open, handleClose, handleResponse, text }) => {
  const classes = useStyles();

  return (
    <Dialog open={open}>
      <div>
        <Typography className={classes.footerText} variant="h6">
          {text}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            handleResponse(false);
            handleClose();
          }}
        >
          Nei
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleResponse(true);
            handleClose();
          }}
        >
          Ja
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmationBox;
