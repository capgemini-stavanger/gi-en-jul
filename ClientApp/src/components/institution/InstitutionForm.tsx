import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as React from "react";
import { useState } from "react";
import { DESSERTS } from "../../common/constants/Desserts";
import { DINNERS } from "../../common/constants/Dinners";
import Gender from "../../common/enums/Gender";
import ApiService from "../../common/functions/apiServiceClass";
import InputValidator from "../InputFields/Validators/InputValidator";
import Tooltip from '@material-ui/core/Tooltip';
import ConfirmationDialog from './ConfirmationDialog';


import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "../InputFields/Validators/Validators";
import FormFood from "./FormFood";
import FormPerson from "./FormPerson";
import IFormPerson, { getFormPerson } from "./IFormPerson";
import Locations from "./InstitutionLocations";

type PersonType = {
  Wish?: string;
  Age: number;
  Months: number;
  Gender: Gender;
  Comment: String;
};

type submittype = {
  Dinner?: string;
  Dessert?: string;
  Note?: string;
  Event?: string;
  Location?: string;
  ContactFullName?: string;
  ContactEmail?: string;
  ContactPhoneNumber?: string;
  Institution?: string;
  ReferenceId?: string;
  FamilyMembers?: PersonType[];
};

interface IFoodFormData {
  radio: string;
  input: string;
}

const initFoodFormData: IFoodFormData = {
  radio: "",
  input: "",
};

interface IContact {
  name: string;
  phoneNumber: string;
  email: string;
}

const initState: {
  viewErrorTrigger: number;
  displayText: boolean;
  alert: {
    isLoading: boolean;
    msg: React.ReactNode;
    severity?: "error" | "info" | "success" | "warning";
    open: boolean;
  };
  dialog: {
    referenceId:string;
    familyId:string;
    open: boolean;
  }
} = {
  viewErrorTrigger: 0,
  displayText: false, 
  alert: {
    isLoading: false,
    msg: "",
    severity: undefined,
    open: false,
  },
  dialog: {
    referenceId: "",
    familyId: "",
    open: false,
  }
};

const initFormDataState: () => {
  persons: IFormPerson[];
  location: string;
  dinner: IFoodFormData;
  dessert: IFoodFormData;
  specialNeeds: string;
  pid: string;
  contact: IContact;
} = () => ({
  persons: [getFormPerson()],
  location: "",
  dinner: initFoodFormData,
  dessert: initFoodFormData,
  specialNeeds: "",
  pid: "",
  contact: {
    name: "",
    phoneNumber: "",
    email: "",
  },
});

type ValidFormEntry = {
  [valid: string]: boolean;
};

const initValidFormState: ValidFormEntry = {
  location: false,
  dinner: false,
  dessert: false,
  contactName: false,
  contactPhoneNumber: false,
  contactEmail: false,
};
interface props {
  accessToken: string;
} 

const RegistrationForm: React.FC<props> = ({ accessToken }) => {
  const [state, setState] = useState(initState);

  const [formDataState, setFormDataState] = useState(initFormDataState());
  const [validFormState, setValidFormState] = useState({
    ...initValidFormState,
  });
  const apiservice = new ApiService(accessToken);

  const addPerson = () => {
    setFormDataState((prev) => ({
      ...prev,
      persons: [...prev.persons, getFormPerson()],
    }));
  };

  const closeDialog = () => {
    setDialog(false);
  }

  const updatePerson = (
    index: number,
    newPersonData: { [target: string]: unknown }
  ) => {
    setFormDataState((prev) => {
      prev.persons[index] = {
        ...prev.persons[index],
        ...newPersonData,
      } as IFormPerson;
      return { ...prev };
    });
  };

  const deletePerson = (index: number) => {
    setFormDataState((prev) => {
      prev.persons.splice(index, 1);
      return { ...prev };
    });
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };

  const onDinnerRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dinner: {
        ...prev.dinner,
        input: e.target.value !== "annet" ? "" : prev.dinner.input,
        radio: e.target.value,
      },
    }));
  };

  const onDessertRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dessert: {
        ...prev.dessert,
        input: e.target.value !== "annet" ? "" : prev.dessert.input,
        radio: e.target.value,
      },
    }));
  };

  const onDinnerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dinner: {
        ...prev.dinner,
        input: e.target.value,
      },
    }));
  };

  const onDessertInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dessert: {
        ...prev.dessert,
        input: e.target.value,
      },
    }));
  };

  const onSpecialNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      specialNeeds: e.target.value,
    }));
  };

  const onPidChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDataState((prev) => ({
      ...prev,
      pid: e.target.value,
    }));

  const getOnContactChange =
    (attr: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormDataState((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [attr]: e.target.value,
        },
      }));
    };

  const getValiditySetter = (target: string) => (isValid: boolean) => {
    setValidFormState((prev) => {
      prev[target] = isValid;
      return prev;
    });
  };

  const setAlert = (
    open?: boolean,
    message?: React.ReactNode,
    severity?: "error" | "info" | "success" | "warning"
  ) => {
    setState((prev) => ({
      ...prev,
      alert: {
        ...prev.alert,
        msg: message ?? prev.alert.msg,
        severity: severity ?? prev.alert.severity,
        open: open ?? prev.alert.open,
      },
    }));
  };

  const setDialog = (
    open?: boolean,
    familyId?: string,
    referenceId?: string
  ) => {
    setState((prev) => ({
      ...prev,
      dialog: {
        ...prev.dialog,
        open: open ?? prev.dialog.open,
        familyId: familyId ?? prev.dialog.familyId,
        referenceId: referenceId ?? prev.dialog.referenceId,
      },
    }));
  };

  const getDinner = () => {
    return formDataState.dinner.radio === "annet"
      ? formDataState.dinner.input
      : formDataState.dinner.radio;
  };

  const getDessert = () => {
    return formDataState.dessert.radio === "annet"
      ? formDataState.dessert.input
      : formDataState.dessert.radio;
  };

  const allIsValid = () => {
    for (let isValid in validFormState) {
      if (!validFormState[isValid]) return false;
    }
    return formDataState.persons.every((p) => {
      return p.isValidAge && p.isValidGender && p.isValidWish;
    });
  };

  const resetForm = () => {
    setState((prev) => ({ ...prev, viewErrorTrigger: 0 }));
    setValidFormState({ ...initValidFormState });
    setFormDataState(initFormDataState());
  };

  const onSuccessSubmit = () => {
    var message = formDataState.pid.length > 0 ? 'Familie #' + formDataState.pid + ' registrert!' : 'Familie registrert!';
    setDialog(true);
    resetForm();
  };

  const displayHelpText = () => {
    setState((prev) => ({
      ...prev, 
      displayText : true,
    }));
  }
  const hideHelpText = () => {
    setState((prev) => ({
      ...prev, 
      displayText : false,
    }));
  }

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!allIsValid()) {
      setState((prev) => ({
        ...prev,
        viewErrorTrigger: prev.viewErrorTrigger + 1,
      }));
      return;
    }

    let personsList = Array<PersonType>();
    formDataState.persons.forEach((person) => {
      const person1: PersonType = {
        Wish: person.wish,
        Age: parseInt(person.age),
        Months: parseInt(person.months),
        Gender: person.gender,
        Comment: person.comment,
      };
      personsList.push(person1);
    });

    let submit: submittype = {
      Dinner: getDinner(),
      Dessert: getDessert(),
      Note: formDataState.specialNeeds,
      Event: "JUL2021",
      Location: formDataState.location,
      ContactFullName: formDataState.contact.name,
      ContactEmail: formDataState.contact.email,
      ContactPhoneNumber: formDataState.contact.phoneNumber,
      Institution: "NAV",
      ReferenceId: formDataState.pid,
      FamilyMembers: personsList,
    };

    setState((prev) => ({
      ...prev,
      alert: { ...prev.alert, isLoading: true },
    }));

    let goodFetch = false;
    await apiservice
      .post("recipient", JSON.stringify(submit))
      .then((response) => {
        if (response.status === 200) {
          setDialog(true, response.data.item1, response.data.item2)
          goodFetch = true;
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });

    setState((prev) => ({
      ...prev,
      alert: { ...prev.alert, isLoading: false },
    }));

    if (goodFetch) {
      setTimeout(onSuccessSubmit, 10);
    } else {
      setTimeout(() => {
        setAlert(true, "En feil oppsto. Vennligst prøv på nytt.", "error");
      }, 10);
    }
  };

  const handleAlertClose = (
    e: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if(reason == 'clickaway')
      return ;
    setAlert(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.alert.open}
        autoHideDuration={60000}
        onClose={handleAlertClose}
      >
        <Alert severity={state.alert.severity} onClose={handleAlertClose}>
          {state.alert.msg}
        </Alert>
      </Snackbar>

      <form className="thisclass" onSubmit={onSubmitForm}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Locations
              value={formDataState.location}
              onChange={onLocationChange}
              viewErrorTrigger={state.viewErrorTrigger}
              setIsValidLocation={getValiditySetter("location")}
              include_header
            />
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="h5">Familie</Typography>
              </Grid>
              <Grid item>
                {formDataState.persons.map((person, i) => {
                  return (
                    <FormPerson
                      key={person.uuid}
                      person={person}
                      viewErrorTrigger={state.viewErrorTrigger}
                      updatePerson={(newPersonData: {
                        [target: string]: unknown;
                      }) => updatePerson(i, newPersonData)}
                      deletePerson={() => deletePerson(i)}
                    />
                  );
                })}
              </Grid>
              <Grid item>
                <Button
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  }
                  variant="contained"
                  color="primary"
                  onClick={addPerson}
                >
                  Legg til flere
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="h5">Matønsker</Typography>
              </Grid>
              <Grid item>
                <FormFood
                  viewErrorTrigger={state.viewErrorTrigger}
                  onInputChange={onDinnerInputChange}
                  input={formDataState.dinner.input}
                  radio={formDataState.dinner.radio}
                  onRadioChange={onDinnerRadioChange}
                  foods={DINNERS}
                  required
                  header={"Middag"}
                  inputLabel="Annen middag (ikke fisk)"
                  setIsValid={getValiditySetter("dinner")}
                  name="dinner"
                />
              </Grid>
              <Grid item>
                <FormFood
                  viewErrorTrigger={state.viewErrorTrigger}
                  onInputChange={onDessertInputChange}
                  input={formDataState.dessert.input}
                  radio={formDataState.dessert.radio}
                  onRadioChange={onDessertRadioChange}
                  foods={DESSERTS}
                  required
                  header={"Dessert"}
                  inputLabel="Annen dessert"
                  setIsValid={getValiditySetter("dessert")}
                  name="dessert"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  value={formDataState.specialNeeds}
                  onChange={onSpecialNeedsChange}
                  type="textarea"
                  fullWidth
                  label="Spesielle behov"
                  multiline
                  placeholder="Halal, vegetar, allergier"
                  maxRows="24"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5">Deres ID på familien</Typography>
            <TextField
              variant="outlined"
              onChange={onPidChange}
              value={formDataState.pid}
              name="pid"
              id="PID"
              label="PID eller annen ID"
              placeholder="PID eller annen ID"
            />
            <Tooltip title="Display ID info" aria-label="Display ID info" placement="right">
            { state.displayText ? <CheckCircleIcon onClick={hideHelpText}/> : <HelpOutlineIcon  onClick={displayHelpText}/>}
            </Tooltip>
          </Grid> 
          <Typography>
           {state.displayText && 
           <Typography> ID benyttes til å gjenkjenne familien du registrerer. Dersom dere ikke har en type ID kan du la denne stå tom.</Typography>
           }
          </Typography>
          <Grid item container spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5">Kontaktperson</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <InputValidator
                    viewErrorTrigger={state.viewErrorTrigger}
                    validators={[isNotNull]}
                    setIsValids={getValiditySetter("contactName")}
                    errorMessages={["Vennligst skriv inn et navn"]}
                    onChange={getOnContactChange("name")}
                    value={formDataState.contact.name}
                    name="cname"
                    id="kontaktnavn"
                    label="Navn"
                  />
                </Grid>
                <Grid item>
                  <InputValidator
                    viewErrorTrigger={state.viewErrorTrigger}
                    validators={[isPhoneNumber, isNotNull]}
                    setIsValids={getValiditySetter("contactPhoneNumber")}
                    errorMessages={[
                      "Telefonnummeret er ikke gyldig",
                      "Vennligst skriv inn et telefonnummer",
                    ]}
                    onChange={getOnContactChange("phoneNumber")}
                    value={formDataState.contact.phoneNumber}
                    name="cphone"
                    id="kontaktperson"
                    label="Telefon"
                    autoComplete="tel"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                validators={[isEmail, isNotNull]}
                setIsValids={getValiditySetter("contactEmail")}
                errorMessages={[
                  "Eposten er ikke gyldig",
                  "Vennligst skriv inn en epost",
                ]}
                onChange={getOnContactChange("email")}
                value={formDataState.contact.email}
                name="cemail"
                id="kontaktepost"
                label="Epost"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Grid item className="mx-5">
            <Button variant="contained" type="submit" color="primary">
              Send
            </Button>
            {state.alert.isLoading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Grid>
        </Grid>
        <ConfirmationDialog open={state.dialog.open} familyId={state.dialog.familyId} referenceId={state.dialog.referenceId} handleClose={closeDialog} />
      </form>
    </>
  );
};

export default RegistrationForm;
