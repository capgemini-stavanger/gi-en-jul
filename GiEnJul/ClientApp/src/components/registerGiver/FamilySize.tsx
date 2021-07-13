import { Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";

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
  return (
    <>
      <Typography component="h2">Familiesammensetning</Typography>
      <Container>
        <form style={{ width: "100%", marginTop: "20px" }}>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            setIsValids={setIsValid}
            type="select"
            fullWidth
            autoFocus
            placeholder={placeHolder}
            validators={[isNotNull]}
            name="familyType-input"
            value={values.maxReceivers ? values.maxReceivers : ""}
            onChange={handleFamilyChange}
            label="Familiesammensetning*"
            errorMessages={["Hvilken familie venter på din gave?"]}
            options={FAMILY_SIZES}
          />
          <Pager onContinue={extendedNextStep} onBack={prevStep} />
        </form>
      </Container>
    </>
  );
};
export default FamilySize;
