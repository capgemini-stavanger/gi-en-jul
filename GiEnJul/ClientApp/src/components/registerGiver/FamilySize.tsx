import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from "./Styles";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  values: IFormData;
  handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
}

const FamilySize: React.FC<Props> = ({
  nextStep,
  prevStep,
  values,
  handleFamilyChange,
  placeHolder,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

  const extendedNextStep = (e: React.FormEvent) => {
    if (!isValid) {
      return setViewErrorTrigger((prev) => prev + 1);
    }
    nextStep(e);
  };
  const classes = useStyles();
  return (
    <>
      <Typography 
      className={classes.subHeading}>Familiesammensetning</Typography>
      <Container
      className={classes.form}>
        <Grid 
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        className={classes.form} 
        >
        
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            setIsValids={setIsValid}
            type="select"
            fullWidth
            placeholder={placeHolder}
            validators={[isNotNull]}
            name="familyType-input"
            value={values.maxReceivers ? values.maxReceivers : ""}
            onChange={handleFamilyChange}
            label="Familiesammensetning*"
            errorMessages={["Hvilken familie venter på din gave?"]}
            options={FAMILY_SIZES}
          />
          </Grid>
          <Grid item>
          <Pager onContinue={extendedNextStep} onBack={prevStep} continueText={"Oppsummering"}/>
          </Grid>
          </Grid>
      </Container>
    </>
  );
};
export default FamilySize;
