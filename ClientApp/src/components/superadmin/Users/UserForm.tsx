import { Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import React, { ChangeEvent, useState } from "react";
import { Button } from "reactstrap";

interface props {
  accessToken: string;
  institution: boolean;
  confirmOpen: boolean;
  handleConfirm: (response: boolean) => void;
  handleRefresh: () => void;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const UserForm: React.FC<props> = ({
  accessToken,
  institution,

  handleRefresh,
}) => {
  const [email, setEmail] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState<string>("");
  const [institutionName, setinstitutionName] = useState<string>("");

  const apiservice = new ApiService(accessToken);

  const onEmailChange = (event: React.ChangeEvent<IChangeEvent>) => {
    setEmail(event.target.value as string);
  };

  const onRoleInputChange = (event: ChangeEvent<IChangeEvent>) => {
    setRoleInput(event.target.value as string);
  };

  const onPasswordChange = (event: ChangeEvent<IChangeEvent>) => {
    setPasswordInput(event.target.value as string);
  };
  const onConfirmPasswordChange = (event: ChangeEvent<IChangeEvent>) => {
    setConfirmPasswordInput(event.target.value as string);
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

  const handleCreateUser = () => {
    if (handleConfirmPassword()) {
      apiservice
        .post("user/create", {
          Email: email,
          Password: passwordInput,
          Location: locationInput,
          Role: roleInput,
          Institution: institutionName,
        })
        .then(() => {
          //setOpen(true);
          handleRefresh();
        });
      // setOpen(false);
    } else {
      //  setErrorMessage("The passwords must match");
    }
  };

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <Grid item>
        <InputValidator
          validators={[isNotNull]}
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
          validators={[isNotNull]}
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
          validators={[isNotNull]}
          value={confirmPasswordInput}
          onChange={(e) => {
            onConfirmPasswordChange(e);
          }}
          type={"password"}
          label={"Bekreft Passord*"}
          name={"bekreftPassord"}
        ></InputValidator>
      </Grid>

      <Grid item>
        <InputValidator
          validators={[isNotNull]}
          value={locationInput}
          onChange={(e) => {
            onLocationChange(e);
          }}
          label={"Lokasjon*"}
          name={"lokasjon"}
        ></InputValidator>
      </Grid>

      <Grid item>
        {!institution && (
          <InputValidator
            validators={[isNotNull]}
            value={roleInput}
            onChange={(e) => {
              onRoleInputChange(e);
            }}
            label={"Rolle*"}
            name={"rolle"}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        {institution && (
          <InputValidator
            validators={[isNotNull]}
            value={institutionName}
            onChange={(e) => {
              onInstitutionNameChange(e);
            }}
            label={"Institusjon(Navn)*"}
            name={"institusjonsnavn"}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        <Button
          onClick={() => {
            handleCreateUser();
            //  handleConfirm(true);
          }}
        >
          <Typography>Legg til</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
