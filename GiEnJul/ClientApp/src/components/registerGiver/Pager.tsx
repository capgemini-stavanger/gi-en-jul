import { Button, MobileStepper } from "@material-ui/core";
import React, { FC } from "react";
import useStyles from "./Styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
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
          position="static"
          activeStep={step-1}
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
};

Pager.defaultProps = {
  backText: "Tilbake",
  continueText: "Neste",
};

export default Pager;
