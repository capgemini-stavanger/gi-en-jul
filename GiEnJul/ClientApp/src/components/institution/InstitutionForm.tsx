import {
  Button,
  Color,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useState } from "react";
import { DESSERTS } from "../../common/constants/Desserts";
import { DINNERS } from "../../common/constants/Dinners";
import Gender from "../../common/enums/Gender";
import InputValidator from "../InputFields/Validators/InputValidator";
import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "../InputFields/Validators/Validators";
import FormFood from "./FormFood";
import FormPerson from "./FormPerson";
import IFormPerson from "./IFormPerson";
import Locations from "./InstitutionLocations";

type PersonType = {
  Wish?: string;
  Age?: number;
  Gender?: Gender;
  Family?: string;
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
  alert: {
    isLoading: boolean;
    msg: React.ReactNode;
    severity?: "error" | "info" | "success" | "warning";
    open: boolean;
  };
} = {
  viewErrorTrigger: 0,
  alert: {
    isLoading: false,
    msg: "",
    severity: undefined,
    open: false,
  },
};

const initFormDataState: {
  persons: (IFormPerson | undefined)[];
  location: string;
  dinner: IFoodFormData;
  dessert: IFoodFormData;
  specialNeeds: string;
  pid: string;
  contact: IContact;
} = {
  persons: [{} as IFormPerson],
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
};

type ValidFormEntry = {
  [valid: string]: boolean;
};

const initValidFormState: ValidFormEntry = {
  isValidLocation: false,
  isValidDinner: false,
  isValidDessert: false,
  isValidContactName: false,
  isValidContactPhoneNumber: false,
  isValidContactEmail: false,
};

const RegistrationForm = () => {
  const [state, setState] = useState(initState);
  const [formDataState, setFormDataState] = useState(initFormDataState);
  const [validFormState, setValidFormState] = useState(initValidFormState);

  /*const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

  const [persons, setPersons] = useState<(IFormPerson | undefined)[]>([
    {} as IFormPerson,
  ]);

  const [location, setLocation] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(false);

  const [dinnerRadio, setDinnerRadio] = useState("");
  const [dinnerInput, setDinnerInput] = useState("");
  const [isValidDinner, setIsValidDinner] = useState(false);

  const [dessertRadio, setDessertRadio] = useState("");
  const [dessertInput, setDessertInput] = useState("");
  const [isValidDessert, setIsValidDessert] = useState(false);

  const [specialNeeds, setSpecialNeeds] = useState("");

  const [pid, setPid] = useState("");

  const [contactName, setContactName] = useState("");
  const [isValidContactName, setIsValidContactName] = useState(false);

  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [isValidContactPhoneNumber, setIsValidContactPhoneNumber] =
    useState(false);

  const [contactEmail, setContactEmail] = useState("");
  const [isValidContactEmail, setIsValidContactEmail] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState<React.ReactNode>("");
  const [alertSeverity, setAlertSeverity] = useState<any>();
  const [alertOpen, setAlertOpen] = useState(false);
  */

  const addPerson = () => {
    setFormDataState((prev) => ({
      ...prev,
      persons: [...prev.persons, {} as IFormPerson],
    }));
  };

  const updatePerson = (index: number, newPerson?: IFormPerson) => {
    setFormDataState((prev) => {
      prev.persons[index] = newPerson;
      return { ...prev };
    });
  };

  const deletePerson = (index: number) => {
    updatePerson(index, undefined);
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
        radio: e.target.value,
      },
    }));
    if (e.target.value !== "annet") {
      setFormDataState((prev) => ({
        ...prev,
        dinner: {
          ...prev.dinner,
          input: "",
        },
      }));
    }
  };

  const onDessertRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dessert: {
        ...prev.dessert,
        radio: e.target.value,
      },
    }));
    if (e.target.value !== "annet") {
      setFormDataState((prev) => ({
        ...prev,
        dessert: {
          ...prev.dessert,
          input: "",
        },
      }));
    }
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
    /*return (
      isValidDinner &&
      isValidDessert &&
      isValidLocation &&
      isValidContactName &&
      isValidContactPhoneNumber &&
      isValidContactEmail &&
      persons.every((p) => {
        return !p || (p.isValidAge && p.isValidGender && p.isValidWish);
      })
    );*/

    for (let isValid in validFormState) {
      if (!validFormState[isValid]) return false;
    }
    return formDataState.persons.every((p) => {
      return !p || (p.isValidAge && p.isValidGender && p.isValidWish);
    });
  };

  const resetForm = () => {
    setState(initState);
    setValidFormState(initValidFormState);
    setFormDataState(formDataState);

    /*setViewErrorTrigger(0);

    setIsValidDinner(false);
    setIsValidDessert(false);
    setIsValidLocation(false);
    setIsValidContactName(false);
    setIsValidContactPhoneNumber(false);
    setIsValidContactEmail(false);

    setPersons([]);
    addPerson();
    setLocation("");
    setDinnerRadio("");
    setDinnerInput("");
    setDessertRadio("");
    setDessertInput("");
    setSpecialNeeds("");
    setPid("");
    setContactName("");
    setContactEmail("");
    setContactPhoneNumber("");*/
  };

  const onSuccessSubmit = () => {
    setState((prev) => ({
      ...prev,
      alert: {
        ...prev.alert,
        msg: "Familie registrert!",
        severity: "success",
        open: true,
      },
    }));
    resetForm();
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!allIsValid()) {
      setViewErrorTrigger((v) => v + 1);
      return;
    }

    let personsList = Array<PersonType>();
    persons.forEach((p) => {
      if (!p) return;
      const p1: PersonType = {
        Wish: p.wish,
        Age: parseInt(p.age),
        Gender: p.gender,
      };
      personsList.push(p1);
    });

    let submit: submittype = {
      Dinner: getDinner(),
      Dessert: getDessert(),
      Note: specialNeeds,
      Event: "JUL2021",
      Location: location,
      ContactFullName: contactName,
      ContactEmail: contactEmail,
      ContactPhoneNumber: contactPhoneNumber,
      Institution: "NAV",
      ReferenceId: pid,
      FamilyMembers: personsList,
    };

    setIsLoading(true);
    await fetch("/api/recipient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submit),
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setTimeout(onSuccessSubmit, 10);
          return;
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
    setIsLoading(false);
    setTimeout(() => {
      setAlertMsg("En feil oppsto. Vennligst prøv på nytt.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }, 10);
  };

  const handleAlertClose = (
    e: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    setAlertOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity={alertSeverity} onClose={handleAlertClose}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <form className="thisclass" onSubmit={onSubmitForm}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Locations
              value={location}
              onChange={onLocationChange}
              viewErrorTrigger={viewErrorTrigger}
              setIsValidLocation={setIsValidLocation}
              include_header
            />
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Typography variant="h5">Familie</Typography>
              </Grid>
              <Grid item>
                {persons.map((p, i) => {
                  return (
                    p && (
                      <FormPerson
                        key={"person" + i}
                        person={p}
                        viewErrorTrigger={viewErrorTrigger}
                        updatePerson={(newPerson: IFormPerson) =>
                          updatePerson(i, newPerson)
                        }
                        deletePerson={() => deletePerson(i)}
                      />
                    )
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
                  viewErrorTrigger={viewErrorTrigger}
                  setInput={setDinnerInput}
                  input={dinnerInput}
                  radio={dinnerRadio}
                  onRadioChange={onDinnerRadioChange}
                  foods={DINNERS}
                  required
                  header={"Middag"}
                  inputLabel="Annen middag"
                  setIsValid={setIsValidDinner}
                  name="dinner"
                />
              </Grid>
              <Grid item>
                <FormFood
                  viewErrorTrigger={viewErrorTrigger}
                  setInput={setDessertInput}
                  input={dessertInput}
                  radio={dessertRadio}
                  onRadioChange={onDessertRadioChange}
                  foods={DESSERTS}
                  required
                  header={"Dessert"}
                  inputLabel="Annen dessert"
                  setIsValid={setIsValidDessert}
                  name="dessert"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
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
            <Typography variant="h5">ID</Typography>
            <TextField
              variant="outlined"
              onChange={(e) => setPid(e.target.value)}
              value={pid}
              name="pid"
              id="PID"
              label="PID"
              placeholder="PID eller annen ID dere bruker for å gjenkjenne familien"
            />
          </Grid>
          <Grid item container spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5">Kontaktperson</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  <InputValidator
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isNotNull]}
                    setIsValids={setIsValidContactName}
                    errorMessages={["Vennligst skriv inn et navn"]}
                    onChange={(e) => setContactName(e.target.value)}
                    value={contactName}
                    name="cname"
                    id="kontaktnavn"
                    label="Navn"
                  />
                </Grid>
                <Grid item>
                  <InputValidator
                    viewErrorTrigger={viewErrorTrigger}
                    validators={[isPhoneNumber, isNotNull]}
                    setIsValids={setIsValidContactPhoneNumber}
                    errorMessages={[
                      "Telefonnummeret er ikke gyldig",
                      "Vennligst skriv inn et telefonnummer",
                    ]}
                    onChange={(e) => setContactPhoneNumber(e.target.value)}
                    value={contactPhoneNumber}
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
                viewErrorTrigger={viewErrorTrigger}
                validators={[isEmail, isNotNull]}
                setIsValids={setIsValidContactEmail}
                errorMessages={[
                  "Eposten er ikke gyldig",
                  "Vennligst skriv inn en epost",
                ]}
                onChange={(e) => setContactEmail(e.target.value)}
                value={contactEmail}
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
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegistrationForm;
