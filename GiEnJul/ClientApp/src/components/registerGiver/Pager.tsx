import { Button, Grid } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./Styles";
import {ArrowBackIos, ArrowForwardIos} from '@material-ui/icons';

interface IPager {
  onBack?: (event: React.FormEvent) => void;
  onContinue?: (event: React.FormEvent) => void;
  backText?: string;
  continueText?: string;
}

const Pager: FC<IPager> = ({ onBack, onContinue, backText, continueText }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      className={classes.buttons}
    >
      {onBack && (
        <Grid item>
          <Button 
          className={classes.buttonBack}
          startIcon={<ArrowBackIos/>}
          onClick={onBack}>
          {backText}
          </Button>
        </Grid>
      )}
      {onContinue && (
        <Grid item>
          <Button 
          className={classes.buttonNext}
          endIcon={<ArrowForwardIos/>}
          onClick={onContinue}>
          {continueText}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

Pager.defaultProps = {
  backText: "Tilbake",
  continueText: "Neste",
};

export default Pager;
