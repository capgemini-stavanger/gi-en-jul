import { Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import InputValidator from "../../components/InputFields/Validators/InputValidator";
import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "../../components/InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";

type Props = {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: IFormData;
};

type ValidFormEntry = {
  [valid: string]: boolean;
};

const initValidFormState: ValidFormEntry = {
  isValidFullName: false,
  isValidEmail: false,
  isValidPhone: false,
};

const initState = {
  viewErrorTrigger: 0,
};

const ContactInfo: React.FC<Props> = ({
  nextStep,
  prevStep,
  handlefullnameChange,
  handleEmailChange,
  handleTlfChange,
  values,
}) => {
  const [state, setState] = useState(initState);
  const [validFormState, setValidFormState] = useState(initValidFormState);

  const extendedNextStep = (e: React.FormEvent) => {
    for (let isValid in validFormState) {
      if (validFormState[isValid]) continue;
      return setState((prev) => {
        return { ...prev, viewErrorTrigger: prev.viewErrorTrigger + 1 };
      });
    }
    nextStep(e);
  };

  const getValiditySetter = (target: string) => {
    return (isValid: boolean) => {
      setValidFormState((prev) => {
        prev[target] = isValid;
        return prev;
      });
    };
  };

  return (
    <>
      <Typography component="h2">Kontaktinformasjon</Typography>
      <Container>
        <form style={{ width: "100%", marginTop: "5px" }}>
          <InputValidator
            autoFocus
            viewErrorTrigger={state.viewErrorTrigger}
            setIsValids={getValiditySetter("isValidFullName")}
            label="Fullt navn*"
            margin="normal"
            fullWidth
            name="fullname"
            autoComplete="name"
            value={values.fullname ? values.fullname : ""}
            onChange={handlefullnameChange}
            validators={[isNotNull]}
            errorMessages={["Vi vil gjerne vite hvem som gir en jul"]}
          />
          <InputValidator
            viewErrorTrigger={state.viewErrorTrigger}
            setIsValids={getValiditySetter("isValidEmail")}
            label="Epost*"
            onChange={handleEmailChange}
            name="email"
            value={values.email ? values.email : ""}
            validators={[isEmail, isNotNull]}
            errorMessages={[
              "Eposten din ser litt rar ut, er den skrevet riktig?",
              "Vi trenger din epost for å sende deg viktig informasjon",
            ]}
            autoComplete="email"
            margin="normal"
            fullWidth
          />
          <InputValidator
            viewErrorTrigger={state.viewErrorTrigger}
            setIsValids={getValiditySetter("isValidPhone")}
            label="Telefonnummer*"
            onChange={handleTlfChange}
            name="phoneNumber"
            value={values.phoneNumber ? values.phoneNumber : ""}
            validators={[isPhoneNumber, isNotNull]}
            errorMessages={[
              "Telefonnummeret ditt ser litt rart ut, er det skrevet riktig?",
              "Vi trenger ditt telefonnummer for å kunne kontakte deg",
            ]}
            autoComplete="tel"
            margin="normal"
            fullWidth
          />
          <Pager onBack={prevStep} onContinue={extendedNextStep} />
        </form>
      </Container>
    </>
  );
};
export default ContactInfo;
