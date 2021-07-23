import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from './Styles';

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
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.subHeading}>Hvor vil du gi?</Typography>
      <Container className={classes.form}>
        <ValidatorForm 
          onSubmit={nextStep}
          onError={(errors) => console.error(errors)}
        >
          <InputValidator
            className={classes.selectInput}
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
            continueText={"Kontaktinformasjon"}
          />
        </ValidatorForm>
      </Container>
    </>
  );
};
export default Location;
