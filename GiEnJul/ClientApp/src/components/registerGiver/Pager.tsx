import { Button, Grid, MobileStepper } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./Styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { isMobile } from "../../common/functions/IsMobile";
interface IPager {
  onBack?: (event: React.FormEvent) => void;
  onContinue?: (event: React.FormEvent) => void;
  backText?: string;
  continueText?: string;
  step?: number;
}

const Pager: FC<IPager> = ({
  onBack,
  onContinue,
  backText,
  continueText,
  step,
}) => {
  const classes = useStyles();
  if (isMobile()) {
    return (
      <>
        {step == undefined ? (
          <>
            <Button
              className={classes.buttonNext}
              endIcon={<ArrowForwardIos />}
              onClick={onContinue}
            >
              {continueText}
            </Button>
          </>
        ) : (
          <MobileStepper
            variant="dots"
            steps={4}
            position="bottom"
            activeStep={step - 1}
            className={classes.buttons}
            nextButton={
              onContinue && (
                <Button
                  className={classes.buttonNext}
                  endIcon={<ArrowForwardIos />}
                  onClick={onContinue}
                >
                  {continueText}
                </Button>
              )
            }
            backButton={
              onBack && (
                <Button
                  className={classes.buttonBack}
                  startIcon={<ArrowBackIos />}
                  onClick={onBack}
                >
                  {backText}
                </Button>
              )
            }
          />
        )}
      </>
    );
  } else {
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
              startIcon={<ArrowBackIos />}
              onClick={onBack}
            >
              {backText}
            </Button>
          </Grid>
        )}
        {onContinue && (
          <Grid item>
            <Button
              className={classes.buttonNext}
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
