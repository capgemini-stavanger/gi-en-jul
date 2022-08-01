import { Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
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
  //openAdd: boolean;
  // confirmAdd: boolean;
  // message: string;
  // success: boolean;
  //  municipalities: string[];
}

export const initFormDataState: () => FormState = () => ({
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  role: "",
  institutionName: "",
  // openAdd: false,
  //confirmAdd: false,
  //  message: "",
  //  success: false,
  // municipalities: [],
});

const UserForm: React.FC<props> = ({ accessToken, institution, handleRefresh }) => {
  const [state, setState] = useState(initFormDataState());
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [confirmAdd, setConfirmAdd] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  /*
  const [email, setEmail] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [roleInput, setRoleInput] = useState<string>("");
  const [institutionName, setinstitutionName] = useState<string>("");
  

  
*/
  const apiservice = new ApiService(accessToken);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      email: event.target.value as string,
    }));
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
  };

  const onConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      confirmPassword: event.target.value as string,
    }));
  };

  const onLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      location: event.target.value as string,
    }));
  };

  const onInstitutionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      institutionName: event.target.value as string,
    }));
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
          setSuccess(true); //trenger ikke denne
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
      setConfirmAdd(true);
    }

    setOpenAdd(false);
  };

  const refreshForm = () => {
    setState(initFormDataState());
  };

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <Grid item>
        <InputValidator
          validators={[isNotNull]}
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
          validators={[isNotNull]}
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
          validators={[isNotNull]}
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
            validators={[isNotNull]}
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
            size={"medium"}
            validators={[isNotNull]}
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
