import { Box } from "@material-ui/core";
import React from "react";
import useStyles from "./Styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

interface iSteppers {
  state: number;
}

function getSteps() {
  return ["", "", "", ""];
}

const Steppers: React.FC<iSteppers> = ({ state }) => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <Box className={classes.stepperBox}>
      <Stepper className={classes.stepperBackground} activeStep={state - 1}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steppers;
