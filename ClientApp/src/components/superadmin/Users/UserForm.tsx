import { Grid, List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isEmail } from "components/shared/input-fields/validators/Validators";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "reactstrap";
import useStyles from "../Styles";
import { ROLES } from "common/constants/Roles";

interface props {
  accessToken: string;
  institution: boolean;
  handleRefresh: () => void;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
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

const UserForm: React.FC<props> = ({ accessToken, institution, handleRefresh }) => {
  const [email, setEmail] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState<string>("");
  const [institutionName, setinstitutionName] = useState<string>("");
  const [municipalities, setMunicipalities] = useState<string[]>([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openInformationBox, setOpenInformationBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [viewErrorNumber, setViewErrorNumber] = useState<number>(1);
  const [validFormValues, setValidFormValues] = useState({
    ...initValidFields,
  });

  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

  const checkEqualPassword = (confirmPassword: string) => {
    return confirmPassword === passwordInput;
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

  const onEmailChange = (event: React.ChangeEvent<IChangeEvent>) => {
    setEmail(event.target.value as string);
    incrementErrorNum("email", event.target.value as string);
  };

  const onRoleInputChange = (event: ChangeEvent<IChangeEvent>) => {
    setRoleInput(event.target.value as string);
  };

  const onPasswordChange = (event: ChangeEvent<IChangeEvent>) => {
    setPasswordInput(event.target.value as string);
    incrementErrorNum("password", event.target.value as string);
  };
  const onConfirmPasswordChange = (event: ChangeEvent<IChangeEvent>) => {
    setConfirmPasswordInput(event.target.value as string);
    incrementErrorNum("confirmPassword", event.target.value as string);
  };
  const onLocationChange = (event: ChangeEvent<IChangeEvent>) => {
    setLocationInput(event.target.value as string);
  };

  const onInstitutionNameChange = (event: ChangeEvent<IChangeEvent>) => {
    setinstitutionName(event.target.value as string);
  };

  const handleConfirmPassword = () => {
    if (passwordInput === confirmPasswordInput) {
      return true;
    } else {
      return false;
    }
  };

  const handleSetMessage = () => {
    if (success) {
      setMessage("Brukeren er lagt til");
    } else {
      setMessage("Kunne ikke legge til brukeren");
    }
  };

  const handleCreateUser = () => {
    if (handleConfirmPassword()) {
      apiservice
        .post("user/create", {
          Email: email,
          Password: passwordInput,
          Location: locationInput,
          Role: institution ? "Institution" : roleInput,
          Institution: institutionName,
        })
        .then(() => {
          setSuccess(true);
          handleRefresh();
        })
        .catch((errorStack) => {
          console.error(errorStack);
        });
    } else {
    }
  };

  const getMunicipalities = () => {
    apiservice.get("municipality/active").then((respone) => {
      setMunicipalities(respone.data);
    });
  };
  useEffect(getMunicipalities, []);

  const handleAdd = (response: boolean) => {
    if (response) {
      handleCreateUser();
      setOpenInformationBox(true);
    }
    handleSetMessage();
    setOpenAdd(false);
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
          value={email}
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
          value={passwordInput}
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
          value={confirmPasswordInput}
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
            value={institutionName}
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
          value={locationInput}
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
            value={roleInput}
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
