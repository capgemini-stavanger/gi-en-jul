import { Grid, List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isEmail } from "components/shared/input-fields/validators/Validators";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { ROLES } from "common/constants/Roles";

interface props {
  accessToken: string;
  institution: boolean;
  handleRefresh: () => void;
}

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  role: string;
  institutionName: string;
}

type ValidFields = {
  [valid: string]: boolean;
};

const initValidFields: ValidFields = {
  email: false,
  password: false,
  confirmPassword: false,
  institution: false,
  role: false,
};

export const initFormDataState: () => FormState = () => ({
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  role: "",
  institutionName: "",
});

const UserForm: React.FC<props> = ({ accessToken, institution, handleRefresh }) => {
  const [state, setState] = useState(initFormDataState());
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openInformationBox, setOpenInformationBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [viewErrorNumber, setViewErrorNumber] = useState<number>(1);
  const [validFormValues, setValidFormValues] = useState({
    ...initValidFields,
  });

  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const apiservice = new ApiService(accessToken);

  const checkEqualPassword = (confirmPassword: string) => {
    return confirmPassword === state.password;
  };

  // checks if papssword is between 12-32 length,
  // uses Uppercase and lowercase letters AND includes a number
  const checkValidPassword = (password: string) => {
    return !!String(password).match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{12,}/
    );
  };

  const getValidators = (field: string) => {
    switch (field) {
      case "password":
        return [isNotNull, checkValidPassword];
      case "confirmPassword":
        return [isNotNull, checkEqualPassword];
      case "email":
        return [isNotNull, isEmail];
      case "institution":
        return [isNotNull];
      case "municipality":
        return [isNotNull];
      case "role":
        return [isNotNull];
    }
    return [() => true];
  };

  const getValiditySetter = (field: string) => (isValid: boolean) => {
    setValidFormValues((prev) => {
      prev[field] = isValid;
      return prev;
    });
  };

  const allFieldsAreValid = () => {
    const objectToValidate = { ...validFormValues };
    // set unrelated fields to true
    if (institution) {
      objectToValidate["role"] = true;
    } else {
      objectToValidate["institution"] = true;
    }
    return Object.values(objectToValidate).every((value) => value === true);
  };

  const fieldIsValid = (field: string, fieldValue: string) => {
    let allIsValid = true;
    const validators = getValidators(field);
    validators.forEach((validator) => {
      if (!validator(fieldValue)) {
        allIsValid = false;
      }
    });
    return allIsValid;
  };

  const incrementErrorNum = (field: string, fieldValue: string) => {
    if (!fieldIsValid(field, fieldValue)) {
      setViewErrorNumber(viewErrorNumber + 1);
    }
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: event.target.value as string,
    }));
    incrementErrorNum("email", event.target.value as string);
  };

  const onRoleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      role: event.target.value as string,
    }));
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      password: event.target.value as string,
    }));
    incrementErrorNum("password", event.target.value as string);
  };

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      confirmPassword: event.target.value as string,
    }));

    incrementErrorNum("confirmPassword", event.target.value as string);
  };

  const onLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      location: event.target.value as string,
    }));
    incrementErrorNum("municipality", event.target.value as string);
  };

  const onInstitutionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      institutionName: event.target.value as string,
    }));
    incrementErrorNum("insitution", event.target.value as string);
  };

  const handleConfirmPassword = () => {
    if (state.password === state.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreateUser = () => {
    if (handleConfirmPassword()) {
      apiservice
        .post("user/create", {
          Email: state.email,
          Password: state.password,
          Location: state.location,
          Role: institution ? "Institution" : state.role,
          Institution: state.institutionName,
        })
        .then(() => {
          setMessage("Brukeren er lagt til");
          handleRefresh();
          refreshForm();
        })
        .catch((errorStack) => {
          console.error(errorStack);
          setMessage("Kunne ikke legge til brukeren");
        });
    } else {
    }
  };

  const getMunicipalities = () => {
    apiservice.get("municipality/active").then((response) => {
      setMunicipalities(response.data);
    });
  };
  useEffect(getMunicipalities, []);

  const handleAdd = (response: boolean) => {
    if (response) {
      handleCreateUser();
      setOpenInformationBox(true);
    }

    setOpenAdd(false);
  };

  const refreshForm = () => {
    setState(initFormDataState());
  };

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <Typography>Passord</Typography>
      <List>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>Minimum 12 siffer langt
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>Inneholde store og små bokstaver
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>Inneholde minimum ett av tegna !@#$%^&*
        </ListItem>
      </List>
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorNumber}
          validators={getValidators("email")}
          errorMessages={["Emailen kan ikke være tom", "Vennligst fyll ut en gyldig email"]}
          setIsValids={getValiditySetter("email")}
          value={state.email}
          onChange={(e) => {
            onEmailChange(e);
          }}
          label={"Email*"}
          name={"email"}
        ></InputValidator>
      </Grid>
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorNumber}
          validators={getValidators("password")}
          errorMessages={["Passordet kan ikke være tomt", "Passordet er ikke sterkt nok"]}
          setIsValids={getValiditySetter("password")}
          value={state.password}
          onChange={(e) => {
            onPasswordChange(e);
          }}
          type={"password"}
          label={"Passord*"}
          name={"passord"}
        ></InputValidator>
      </Grid>
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorNumber}
          validators={getValidators("confirmPassword")}
          errorMessages={["Passordet kan ikke være tomt", "Passordene er ikke like"]}
          setIsValids={getValiditySetter("confirmPassword")}
          value={state.confirmPassword}
          onChange={(e) => {
            onConfirmPasswordChange(e);
          }}
          type={"password"}
          label={"Bekreft Passord*"}
          name={"bekreftPassord"}
        ></InputValidator>
      </Grid>
      {institution && (
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorNumber}
            validators={getValidators("institution")}
            errorMessages={["Fyll ut navn på institusjon"]}
            setIsValids={getValiditySetter("institution")}
            value={state.institutionName}
            onChange={(e) => {
              onInstitutionNameChange(e);
            }}
            label={"Institusjon(Navn)*"}
            name={"institusjonsnavn"}
          ></InputValidator>
        </Grid>
      )}
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorNumber}
          // validators={getValidators("municipality")}
          errorMessages={["Vennligst velg en kommune"]}
          setIsValids={getValiditySetter("municipality")}
          size={"medium"}
          validators={[isNotNull]}
          value={state.location}
          type="select"
          options={municipalities.map((m) => {
            return { value: m, text: m };
          })}
          onChange={(e) => {
            onLocationChange(e);
          }}
          label={"Lokasjon*"}
          name={"lokasjon"}
        ></InputValidator>
      </Grid>
      {!institution && (
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorNumber}
            validators={getValidators("role")}
            errorMessages={["Vennligst velg en rolle"]}
            setIsValids={getValiditySetter("role")}
            size={"medium"}
            value={state.role}
            type="select"
            options={ROLES.map((r) => {
              return { value: r, text: r };
            })}
            onChange={(e) => {
              onRoleInputChange(e);
            }}
            label={"Rolle*"}
            name={"rolle"}
          ></InputValidator>
        </Grid>
      )}
      <ConfirmationBox
        open={openAdd}
        text={"Er du sikker på at du vil legge til brukeren?"}
        handleClose={() => {
          handleAdd;
        }}
        handleResponse={handleAdd}
      ></ConfirmationBox>
      <InformationBox
        open={openInformationBox}
        text={message}
        handleClose={() => {
          setOpenInformationBox(false);
        }}
      ></InformationBox>
      <Grid item>
        <Button
          onClick={() => {
            if (allFieldsAreValid()) {
              setOpenAdd(true);
            } else {
              setMessage("Vennligst fyll ut alle feltene");
              setOpenInformationBox(true);
            }
          }}
        >
          <Typography>Legg til</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
