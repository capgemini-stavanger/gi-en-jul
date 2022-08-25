import { Button, Container, Divider, Grid, TextField, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import RegistrationInfo from "./RegistrationInfo";
import useStyles from "./Styles";
import {
  initFormDataState,
  initValidFormState,
  PersonType,
  SubmitType,
  IFormPerson,
  getFormPerson,
  IContactState,
  initState,
} from "components/institution/RegistrationFormTypes";
import { useContext, useState } from "react";
import useUser from "hooks/useUser";
import {
  isNotNull,
  isPhoneNumber,
  isEmail,
} from "components/shared/input-fields/validators/Validators";
import FormFood from "./FormFood";
import { DINNERS } from "common/constants/Dinners";
import { DESSERTS } from "common/constants/Desserts";
import FormPerson from "./FormPerson";
import ApiService from "common/functions/apiServiceClass";
import FamilyInformationBox from "./FamilyInformationBox";
import InformationBox from "components/shared/InformationBox";
import accessTokenContext from "contexts/accessTokenContext";

const RegistrationForm = () => {
  const classes = useStyles();
  const { location, institution } = useUser();
  const accessToken = useContext(accessTokenContext);
  const apiservice = new ApiService(accessToken);

  const [state, setState] = useState(initState);
  const [open, setOpen] = useState<boolean>(false);
  const [formDataState, setFormDataState] = useState(initFormDataState());
  const [validFormState, setValidFormState] = useState(initValidFormState);

  const nextFormDataState: () => IContactState = () => {
    const item = initFormDataState();
    item.contact = {
      name: formDataState.contact.name,
      phoneNumber: formDataState.contact.phoneNumber,
      email: formDataState.contact.email,
    };
    return item;
  };

  // VALIDATION
  const getValiditySetter = (target: string) => (isValid: boolean) => {
    setValidFormState((prev) => {
      prev[target] = isValid;
      return prev;
    });
  };
  const allIsValid = () => {
    let returnValue = true;

    // Check contact person and dinner options
    for (const isValid in validFormState) {
      if (!validFormState[isValid]) {
        returnValue = false;
      }
    }

    formDataState.persons.forEach((person) => {
      if (!person.isValidAge || !person.isValidGender) {
        returnValue = false;
      }

      if (!person.noWish) {
        const validWishes = person.wishes.every((wish) => wish.isValidWish);
        if (!validWishes) {
          returnValue = false;
        }
      }
    });

    return returnValue;
  };
  const setAlert = (
    open?: boolean,
    message?: React.ReactNode | string,
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

  // CONTACT INFO
  const getOnContactChange = (attr: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [attr]: e.target.value,
      },
    }));
  };

  // FAMILY PID
  const onPidChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDataState((prev) => ({
      ...prev,
      pid: e.target.value,
    }));

  // FOOD WISHES
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
  const onDinnerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({
      ...prev,
      dinner: {
        ...prev.dinner,
        input: e.target.value,
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

  // PERSON INFO
  const addPerson = () => {
    setFormDataState((prev) => ({
      ...prev,
      persons: [...prev.persons, getFormPerson()],
    }));
  };
  const updatePerson = (index: number, newPersonData: { [target: string]: unknown }) => {
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

  // SUBMIT
  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!allIsValid()) {
      setState((prev) => ({
        ...prev,
        viewErrorTrigger: prev.viewErrorTrigger + 1,
      }));
      return;
    }

    const personsList = Array<PersonType>();

    formDataState.persons.forEach((person) => {
      const wishList: string[] = [];

      if (!person.noWish) {
        person.wishes.forEach((wishObj) => {
          wishList.push(wishObj.wish.filter(Boolean).join(", "));
        });
      } else {
        wishList.push("Alderstilpasset gaveønske");
      }

      const person1: PersonType = {
        Wishes: wishList,
        Age: parseInt(person.age),
        Months: parseInt(person.months),
        Gender: person.gender,
        NoWish: person.noWish,
      };
      personsList.push(person1);
    });

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

    const submit: SubmitType = {
      Dinner: getDinner(),
      Dessert: getDessert(),
      Note: formDataState.specialNeeds,
      Location: location,
      ContactFullName: formDataState.contact.name,
      ContactEmail: formDataState.contact.email,
      ContactPhoneNumber: formDataState.contact.phoneNumber,
      Institution: institution,
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
          goodFetch = true;
        }
      })
      .catch((errorStack) => {
        if ((errorStack.response.data = formDataState.pid)) {
          formDataState.pidError = true;
          formDataState.pidHelperText = "PID/ID for denne familien eksisterer allerede.";
        }
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

  const resetForm = () => {
    setState((prev) => ({ ...prev, viewErrorTrigger: 0 }));
    setValidFormState({ ...initValidFormState });
    setFormDataState(nextFormDataState());
  };
  const onSuccessSubmit = () => {
    //sett confirmationbox boolean true here.
    handleClose(true);
    resetForm();
  };

  //tullete å ha denne som en egen metode
  const handleClose = (open: boolean) => {
    setOpen(open);
  };

  return (
    <>
      <Container className={classes.root}>
        <form onSubmit={onSubmitForm}>
          <Grid container direction="column" spacing={10}>
            {/* REGISTRATION INFO FORM, NOT A SEPERATE COMPONENT? */}
            <Grid item>
              <RegistrationInfo />
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid item>
              {/* CONTACT PERSON FORM */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <Typography variant="h5">Kontaktperson *</Typography>
                      <Typography>Vennligst fyll ut navn, telefon og email</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
                      <InputValidator
                        viewErrorTrigger={state.viewErrorTrigger}
                        validators={[isEmail, isNotNull]}
                        setIsValids={getValiditySetter("contactEmail")}
                        errorMessages={["Eposten er ikke gyldig", "Vennligst skriv inn en epost"]}
                        onChange={getOnContactChange("email")}
                        value={formDataState.contact.email}
                        name="cemail"
                        id="kontaktepost"
                        label="Epost"
                        autoComplete="email"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid item>
              {/* FAMILY ID */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5"> Family ID *</Typography>
                  <Typography>
                    Hvis familien har PID, vennligst fyll den inn. Om ikke, kan feltet stå blankt.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        onChange={onPidChange}
                        value={formDataState.pid}
                        name="pid"
                        id="PID"
                        label="PID eller annen ID"
                        placeholder="PID eller annen ID"
                        error={formDataState.pidError}
                        helperText={formDataState.pidHelperText}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid item>
              {/* FOOD WISHES FORM */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5">Matønsker *</Typography>
                  <Typography>Vennligst fyll ut familiens matønsker</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={3}>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                      <TextField
                        variant="outlined"
                        value={formDataState.specialNeeds}
                        onChange={onSpecialNeedsChange}
                        type="textarea"
                        fullWidth
                        label="Spesielle behov (Halal, vegetar, allergier)"
                        multiline
                        placeholder="Halal, vegetar, allergier"
                        minRows="6"
                        maxRows="6"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid item>
              {/* FAMILY FORM */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5">Familie *</Typography>
                  <Typography>Vennligst fyll familiens informasjon og gaveønsker</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row" justifyContent="space-around" alignItems="center">
                    <Grid item>
                      <FamilyInformationBox
                        header="Detaljerte ønsker"
                        info="Dersom barnet ikke har ønsker kan du skrive noe om interesser, som fotball, hobbyting,
                        turn osv."
                      />
                    </Grid>
                    <Grid item>
                      <FamilyInformationBox
                        header="Tydelige setninger"
                        info="Et sammendrag av familiens info og ønsker blir sendt til giver. Skriv derfor utfyllende og fullstendige setninger."
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      {formDataState.persons.map((person, i) => {
                        return (
                          <FormPerson
                            key={person.uuid}
                            person={person}
                            viewErrorTrigger={state.viewErrorTrigger}
                            updatePerson={(newPersonData: { [target: string]: unknown }) =>
                              updatePerson(i, newPersonData)
                            }
                            deletePerson={() => deletePerson(i)}
                            personIndex={i}
                          />
                        );
                      })}
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.hollowButton}
                        variant="outlined"
                        onClick={addPerson}
                      >
                        Legg til familiemedlem
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {/* SUBMIT BUTTON */}
              <Grid container justifyContent="center">
                <Grid item>
                  <Button className={classes.wholeButton} type="submit">
                    SEND
                  </Button>
                </Grid>
              </Grid>

              <InformationBox
                open={open}
                text={"Familien har blitt meldt inn"}
                handleClose={() => handleClose(false)}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default RegistrationForm;
