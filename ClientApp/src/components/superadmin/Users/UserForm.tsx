import { Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
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

const UserForm: React.FC<props> = ({ accessToken, institution, handleRefresh }) => {
  const [email, setEmail] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState<string>("");
  const [institutionName, setinstitutionName] = useState<string>("");
  const [municipalities, setMunicipalities] = useState<string[]>([]);

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [confirmAdd, setConfirmAdd] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

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
      setConfirmAdd(true);
    }
    handleSetMessage();
    setOpenAdd(false);
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

      {institution && (
        <Grid item>
          <InputValidator
            validators={[isNotNull]}
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
            size={"medium"}
            validators={[isNotNull]}
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
        open={confirmAdd}
        text={message}
        handleClose={() => {
          setConfirmAdd(false);
        }}
      ></InformationBox>

      <Grid item>
        <Button
          onClick={() => {
            setOpenAdd(true);
          }}
        >
          <Typography>Legg til</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserForm;
