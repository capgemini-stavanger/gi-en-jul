import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import InputValidator from "../shared/InputFields/Validators/InputValidator";
import {
  isEmail,
  isEqual,
  isNotNull,
  isPhoneNumber,
} from "../shared/InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from "./Styles";

type Props = {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: IFormData;
  step: number;
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
  step,
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

  const [confimationEmail, setConfirmationEmail] = useState('');

  const handleConfirmEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationEmail(() => event.target.value)
  };

  const getValiditySetter = (target: string) => {
    return (isValid: boolean) => {
      setValidFormState((prev) => {
        prev[target] = isValid;
        return prev;
      });
    };
  };

  const classes = useStyles();
  return (
    <>
      <Typography className={classes.subHeading}>Registrering</Typography>
      <Typography className={classes.infoText}>Vi trenger din kontaktinformasjon for å kunne gi deg en familie</Typography>
      <Container>
        <Grid container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        className={classes.form} >
        <Grid item>
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
            type="email"
            value={values.email ? values.email : ""}
            validators={[() => isEqual(values.email, confimationEmail), isEmail, isNotNull]}
            errorMessages={[
              "Eposten er ikke lik..",
              "Eposten din ser litt rar ut, er den skrevet riktig?",
              "Vi trenger din epost for å sende deg viktig informasjon",
            ]}
            autoComplete="email"
            margin="normal"
            fullWidth
          />
          <InputValidator
            viewErrorTrigger={state.viewErrorTrigger}
            setIsValids={getValiditySetter("isValidEmail")}
            label="Bekreft epost*"
            onChange={handleConfirmEmailChange}
            name="email"
            value={confimationEmail ? confimationEmail : ""}
            validators={[() => isEqual(values.email, confimationEmail), isEmail, isNotNull]}
            errorMessages={[
              "Eposten er ikke lik..",
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
            type="tel"
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
          </Grid>
          <Grid item>
          <Pager onBack={prevStep} onContinue={extendedNextStep} continueText={"Hvem vil du gi til?"} step={step}/>
          </Grid>
          </Grid>
      </Container>
    </>
  );
};
export default ContactInfo;
