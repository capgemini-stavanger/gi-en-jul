import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  values: IFormData;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
  locationOptions: string[];
}

const Location: React.FC<Props> = ({
  nextStep,
  values,
  handleLocationChange,
  placeHolder,
  locationOptions,
}) => {
  const history = useHistory();
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
      <Typography component="h2">Hvor vil du gi?</Typography>
      <Container>
        <ValidatorForm
          onSubmit={nextStep}
          onError={(errors) => console.log(errors)}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            type="select"
            fullWidth
            autoFocus
            placeholder={placeHolder}
            validators={[isNotNull]}
            label="Lokasjon*"
            name="location-input"
            value={values.location}
            id="location-input"
            onChange={handleLocationChange}
            errorMessages={["Hvor vil du spre glede?"]}
            setIsValids={[setIsValid]}
            options={
              locationOptions.length !== 0
                ? locationOptions.map((loc) => ({ value: loc, text: loc }))
                : [{ value: "", text: "Ingen lokasjoner" }]
            }
          />
          <Pager
            onBack={useCallback(() => history.push("/"), [history])}
            onContinue={extendedNextStep}
          />
        </ValidatorForm>
      </Container>
    </>
  );
};
export default Location;
