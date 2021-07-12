import * as React from "react";
import { Button, Grid, Container } from "@material-ui/core";
import useStyles from "./Styles";
import InputValidator from "../../components/InputFields/Validators/InputValidator";
import {
  isNotNull,
  isPhoneNumber,
  isEmail,
} from "../../components/InputFields/Validators/Validators";
import { useState } from "react";
import IGiverFormData from "./IGiverFormData";

type Props = {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  values: IGiverFormData;
};

type keyValue = {
  [key: string]: boolean;
};

const initIsValidsState: keyValue = {
  isNotEmptyFullName: false,
  isNotEmptyEmail: false,
  isValidEmail: false,
  isNotEmptyPhone: false,
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
  const [isValidsState, setIsValidsState] = useState(initIsValidsState);

  const extendedNextStep = (e: React.FormEvent) => {
    for (let isValid in isValidsState) {
      if (isValidsState[isValid]) continue;
      return setState((prev) => {
        return { ...prev, viewErrorTrigger: prev.viewErrorTrigger + 1 };
      });
    }
    nextStep(e);
  };

  const getValiditySetter = (target: string) => {
    return (isValid: boolean) => {
      setIsValidsState((prev) => {
        {
          prev[target] = isValid;
          return prev;
        }
      });
    };
  };

  const classes = useStyles();
  return (
    <Container>
      <form
        style={{ width: "100%", marginTop: "5px" }}
        onSubmit={extendedNextStep}
      >
        <InputValidator
          autoFocus
          viewErrorTrigger={state.viewErrorTrigger}
          setIsValids={[getValiditySetter("isNotEmptyFullName")]}
          label="Fullt navn*"
          variant="outlined"
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
          setIsValids={[
            getValiditySetter("isNotEmptyEmail"),
            getValiditySetter("isValidEmail"),
          ]}
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
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <InputValidator
          viewErrorTrigger={state.viewErrorTrigger}
          setIsValids={[
            getValiditySetter("isNotEmptyPhone"),
            getValiditySetter("isValidPhone"),
          ]}
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
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className={classes.submit}
        >
          <Grid item>
            <Button variant="contained" onClick={prevStep}>
              Tilbake
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Neste
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default ContactInfo;
