import { Dialog, Typography } from "@material-ui/core";
import useStyles from "components/shared/Styles";
import React from "react";
import { Button } from "reactstrap";

interface IInforrmation {
  open: boolean;
  text: string;
  handleClose: () => void;
}

const InformationBox: React.FC<IInforrmation> = ({ open, handleClose, text }) => {
  const classes = useStyles();

  return (
    <Dialog open={open}>
      <div>
        <Typography className={classes.footerText} variant="h6">
          {text}
        </Typography>

        <Button variant="contained" onClick={handleClose} className={classes.confirmButton}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default InformationBox;
