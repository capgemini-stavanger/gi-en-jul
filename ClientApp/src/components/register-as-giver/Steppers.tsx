import { Box } from "@material-ui/core";
import React from "react";
import useStyles from "./Styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { isMobile } from "common/functions/IsMobile";
interface iSteppers {
  state: number;
}

function getSteps() {
  return ["", "", "", ""];
}

const Steppers: React.FC<iSteppers> = ({ state }) => {
  const classes = useStyles();
  const steps = getSteps();

  if (isMobile()) {
    return (
      <Box className={classes.stepperBoxMobile}>
        <Stepper className={classes.stepperBackground} activeStep={state - 1}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  } else {
    return (
      <Box className={classes.stepperBox}>
        <Stepper className={classes.stepperBackground} activeStep={state - 1}>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }
};

export default Steppers;
