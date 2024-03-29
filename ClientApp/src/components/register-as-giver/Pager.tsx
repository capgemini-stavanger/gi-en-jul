import { Box, Button, Grid } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./Styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { isMobile } from "common/functions/IsMobile";

interface IPager {
  onBack?: (event: React.FormEvent) => void;
  onContinue?: (event: React.FormEvent) => void;
  backText?: string;
  continueText?: string;
  step?: number;
}

const Pager: FC<IPager> = ({ onBack, onContinue, backText, continueText, step }) => {
  const classes = useStyles();
  if (isMobile()) {
    return (
      <Box className={classes.buttonBoxGiverFormMobile}>
        <Button
          variant="outlined"
          className={classes.buttonBack}
          startIcon={<ArrowBackIos />}
          onClick={onBack}
        >
          {backText}
        </Button>
        <Button
          style={{ marginLeft: "20px" }}
          className={classes.buttonNext}
          endIcon={<ArrowForwardIos />}
          onClick={onContinue}
        >
          {continueText}
        </Button>
      </Box>
    );
  } else {
    return (
      <Grid container spacing={2} justifyContent="center" className={classes.buttons}>
        {onBack && (
          <Grid item>
            <Button className={classes.buttonBack} startIcon={<ArrowBackIos />} onClick={onBack}>
              {backText}
            </Button>
          </Grid>
        )}
        {onContinue && (
          <Grid item>
            <Button
              variant="outlined"
              className={step === 4 ? classes.buttonNext : classes.buttonStep}
              endIcon={<ArrowForwardIos />}
              onClick={onContinue}
            >
              {continueText}
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }
};

Pager.defaultProps = {
  backText: "Tilbake",
  continueText: "Neste",
};
export default Pager;
