import { Box, Dialog, Typography } from "@material-ui/core";
import useStyles from "components/shared/Styles";
import React from "react";
import { Button, Container } from "reactstrap";
import { useState } from "react";

//make interface and props for variables
//make button for OK

interface IConfirmation {
  isOpen: boolean;
  text: string;
  handleClose: () => void;
}

const ConfirmationBox: React.FC<IConfirmation> = ({
  isOpen,
  handleClose,
  text,
}) => {
  const classes = useStyles();

  //make constants for variables needed in pop up box

  return (
    <Dialog open={isOpen} fullWidth={true} justifyContent={"center"}>
      <div>
        <Typography className={classes.footerText} variant="h6">
          {text}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClose}
          className={classes.confirmButton}
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmationBox;
