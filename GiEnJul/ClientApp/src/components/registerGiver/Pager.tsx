import { Button, Grid } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./Styles";

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
      className={classes.submit}
    >
      {onBack && (
        <Grid item>
          <Button variant="contained" onClick={onBack}>
            {backText}
          </Button>
        </Grid>
      )}
      {onContinue && (
        <Grid item>
          <Button variant="contained" onClick={onContinue}>
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
