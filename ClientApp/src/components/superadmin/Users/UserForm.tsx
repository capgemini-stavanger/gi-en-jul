import { Grid, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import React, { ChangeEvent, useState } from "react";
import { Button } from "reactstrap";

interface props {
  accessToken: string;
  institution: boolean;
  confirmOpen: boolean;
  handleConfirm: (response: boolean) => void;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const UserForm: React.FC<props> = ({ accessToken, institution, handleConfirm, confirmOpen }) => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  // const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const onUsernameChange = (event: ChangeEvent<IChangeEvent>) => {
    setUsernameInput(event.target.value as string);
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

  //to do: method for validating that the passwords are the same

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <Grid item>
        <InputValidator
          validators={[isNotNull]}
          value={usernameInput}
          onChange={(e) => {
            onUsernameChange(e);
          }}
          label={"Brukernavn*"}
          name={"brukernavn"}
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
        <Button
          onClick={() => {
            handleConfirm(confirmOpen);
          }}
        >
          <Typography>Legg til</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
