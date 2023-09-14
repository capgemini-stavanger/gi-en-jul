import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
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
import { useEffect, useState } from "react";
import useUser from "hooks/useUser";
import {
  isNotNull,
  isPhoneNumberOrEmpty,
  isEmailOrEmpty,
} from "components/shared/input-fields/validators/Validators";
import { DINNERS, DINNER_LABELS } from "common/constants/Dinners";
import { DESSERTS } from "common/constants/Desserts";
import FormPerson from "./FormPerson";
import ApiService from "common/functions/apiServiceClass";
import FamilyInformationBox from "./FamilyInformationBox";
import InformationBox from "components/shared/InformationBox";
import FormFoods from "./FormFoods";
import useIsMobile from "hooks/useIsMobile";

const REMEMBER_CONTACT_INFO_KEY = "Contact_Info";
interface props {
  accessToken: string;
}

const RegistrationForm: React.FC<props> = ({ accessToken }) => {
  const classes = useStyles();
  const { location, institution } = useUser();
  const apiservice = new ApiService(accessToken);
  const [rememberContactInfo, setRememberContactInfo] = useState(false);

  const [state, setState] = useState(initState);
  const [open, setOpen] = useState<boolean>(false);
  const [formDataState, setFormDataState] = useState<IContactState>(initFormDataState());
  const [validFormState, setValidFormState] = useState(initValidFormState);
  const [shouldClear, setShouldClear] = useState(false);
  const isMobile = useIsMobile();

  const nextFormDataState: () => IContactState = () => {
    const item = initFormDataState();
    item.contact = {
      name: formDataState.contact.name,
      phoneNumber: formDataState.contact.phoneNumber,
      email: formDataState.contact.email,
    };
    return item;
  };

  useEffect(() => {
    if (shouldClear) {
      setShouldClear(false);
    }
  }, [shouldClear]);

  useEffect(() => {
    const formData = initFormDataState();
    const savedContactInfo = localStorage.getItem(REMEMBER_CONTACT_INFO_KEY);
    if (savedContactInfo) {
      formData.contact = JSON.parse(savedContactInfo);
    }
    setFormDataState(formData);
    setRememberContactInfo(!!savedContactInfo);
  }, []);

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

  useEffect(() => {
    if (rememberContactInfo) {
      localStorage.setItem(REMEMBER_CONTACT_INFO_KEY, JSON.stringify(formDataState.contact));
    }
  }, [formDataState.contact, rememberContactInfo]);

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
  const onDinnersChange = (d: string) => {
    setFormDataState((prev) => ({
      ...prev,
      dinners: d,
    }));
  };
  const onDessertsChange = (d: string) => {
    setFormDataState((prev) => ({
      ...prev,
      desserts: d,
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
    setTimeout(() => {
      const newAgeElement = document.getElementById(
        `peson-age-number-${formDataState.persons.length}`
      );
      newAgeElement?.focus();
    }, 50);
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

    const submit: SubmitType = {
      Dinner: formDataState.dinners,
      Dessert: formDataState.desserts,
      Note: formDataState.specialNeeds,
      Location: location,
      ContactFullName: formDataState.contact.name,
      ContactEmail: formDataState.contact.email.length ? formDataState.contact.email : undefined,
      ContactPhoneNumber: formDataState.contact.phoneNumber.length
        ? formDataState.contact.phoneNumber
        : undefined,
      Institution: institution,
      ReferenceId: formDataState.pid,
      FamilyMembers: personsList,
    };

    setState((prev) => ({
      ...prev,
      alert: { ...prev.alert, isLoading: true },
    }));

    await apiservice
      .post("recipient", JSON.stringify(submit))
      .then((response) => {
        if (response.status === 200) {
          setTimeout(onSuccessSubmit, 10);
        }
      })
      .catch((errorStack) => {
        if (errorStack?.response?.data == formDataState?.pid) {
          formDataState.pidError = true;
          formDataState.pidHelperText = "PID/ID for denne familien eksisterer allerede.";
        }
        console.error(errorStack);
        if (errorStack?.response?.status == 403)
          setAlert(
            true,
            "Brukeren mangler tilgang til å utføre denne aksjonen, vennligst ta kontakt med gienjul i din kommune dersom dette er feil"
          );
        else setAlert(true, "En feil oppsto. Vennligst prøv på nytt.", "error");
      });

    setState((prev) => ({
      ...prev,
      alert: { ...prev.alert, isLoading: false },
    }));
  };

  const resetForm = () => {
    setState((prev) => ({ ...prev, viewErrorTrigger: 0 }));
    setValidFormState({ ...initValidFormState });
    setFormDataState(nextFormDataState());
    setShouldClear(true);
  };
  const onSuccessSubmit = () => {
    //sett confirmationbox boolean true here.
    handleClose(true);
    resetForm();
  };

  const handleClose = (open: boolean) => {
    setOpen(open);
  };

  const onRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setRememberContactInfo(checked);
    if (checked === false) {
      localStorage.removeItem(REMEMBER_CONTACT_INFO_KEY);
    }
  };

  return (
    <>
      <Container className={isMobile ? classes.mobileRoot : classes.root}>
        <form onSubmit={onSubmitForm}>
          <Grid container direction="column" spacing={isMobile ? 0 : 10}>
            {/* REGISTRATION INFO FORM, NOT A SEPERATE COMPONENT? */}
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
              <RegistrationInfo />
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
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
                  <Grid
                    container
                    direction={isMobile ? "column" : "row"}
                    spacing={isMobile ? 3 : 1}
                  >
                    <Grid item xs={isMobile ? 12 : 3}>
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
                        className={isMobile ? classes.contactInputMobile : classes.contactInput}
                      />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 3}>
                      <InputValidator
                        viewErrorTrigger={state.viewErrorTrigger}
                        validators={[isPhoneNumberOrEmpty]}
                        setIsValids={getValiditySetter("contactPhone")}
                        errorMessages={["Telefonnummeret er ikke gyldig"]}
                        onChange={getOnContactChange("phoneNumber")}
                        value={formDataState.contact.phoneNumber}
                        name="cphone"
                        id="kontaktperson"
                        label="Telefon"
                        autoComplete="tel"
                        className={isMobile ? classes.contactInputMobile : classes.contactInput}
                      />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 3}>
                      <InputValidator
                        viewErrorTrigger={state.viewErrorTrigger}
                        validators={[isEmailOrEmpty]}
                        setIsValids={getValiditySetter("contactEmail")}
                        errorMessages={["Eposten er ikke gyldig"]}
                        onChange={getOnContactChange("email")}
                        value={formDataState.contact.email}
                        name="cemail"
                        id="kontaktepost"
                        label="Epost"
                        autoComplete="email"
                        className={isMobile ? classes.contactInputMobile : classes.contactInput}
                      />
                    </Grid>
                    {!isMobile && <Grid item xs={3}></Grid>}
                    <Grid item xs={isMobile ? 12 : 3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={onRememberMeChange}
                            value={rememberContactInfo}
                            name="Husk meg"
                            color="primary"
                            checked={rememberContactInfo}
                          />
                        }
                        label="Husk meg"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
              {/* FAMILY ID */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5"> Family ID *</Typography>
                  <Typography>
                    Hvis familien har PID, vennligst fyll den inn. Om ikke, kan feltet stå blankt.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction={isMobile ? "column" : "row"}>
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
                        className={isMobile ? classes.contactInputMobile : classes.contactInput}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
              {/* FOOD WISHES FORM */}
              <Grid container direction="column" spacing={5}>
                <Grid item>
                  <Typography variant="h5">Matønsker *</Typography>
                  <Typography>Vennligst fyll ut familiens matønsker</Typography>
                </Grid>
                <Grid item style={{ padding: "2px 20px 12px" }}>
                  <Grid container direction={isMobile ? "column" : "row"} spacing={1}>
                    <Grid item xs={isMobile ? 12 : 4}>
                      <FormFoods
                        foods={DINNERS}
                        foodLabels={DINNER_LABELS}
                        required
                        header={"Middag"}
                        inputLabel="Kommentar, evt. andre alternaltiver"
                        name="dinner"
                        shouldClear={shouldClear}
                        onStateChange={onDinnersChange}
                        setIsValid={getValiditySetter("dinner")}
                      />
                    </Grid>
                    <Grid item>
                      <Divider
                        className={classes.gridDivider}
                        orientation={isMobile ? "horizontal" : "vertical"}
                        style={{ height: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={isMobile ? 12 : 4}>
                      <FormFoods
                        foods={DESSERTS}
                        required
                        header={"Dessert"}
                        inputLabel="Kommentar, evt. andre alternaltiver"
                        name="dessert"
                        shouldClear={shouldClear}
                        onStateChange={onDessertsChange}
                        setIsValid={getValiditySetter("dessert")}
                      />
                    </Grid>
                    <Grid item>
                      <Divider
                        className={classes.gridDivider}
                        orientation={isMobile ? "horizontal" : "vertical"}
                        style={{ height: "100%" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={isMobile ? 12 : 3}
                      style={{ flexGrow: 1, maxWidth: "100%", marginTop: "16px" }}
                    >
                      <TextField
                        variant="outlined"
                        value={formDataState.specialNeeds}
                        onChange={onSpecialNeedsChange}
                        type="textarea"
                        fullWidth
                        style={{ height: "100%" }}
                        label="Andre behov (Halal, vegetar, allergier)"
                        multiline
                        placeholder="Halal, vegetar, allergier"
                        minRows={isMobile ? "6" : "16"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.gridDivider}></Divider>
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
              {/* FAMILY FORM */}
              <Grid container direction="column" spacing={isMobile ? 0 : 5}>
                <Grid
                  item
                  className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
                >
                  <Typography variant="h5">Familie *</Typography>
                  <Typography>Vennligst fyll familiens informasjon og gaveønsker</Typography>
                </Grid>
                <Grid
                  item
                  className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
                >
                  <Grid
                    container
                    direction={isMobile ? "column" : "row"}
                    spacing={1}
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid item xs={isMobile}>
                      <FamilyInformationBox
                        header="Detaljerte ønsker"
                        info="Dersom barnet ikke har ønsker kan du skrive noe om interesser, som fotball, hobbyting,
                        turn osv."
                      />
                    </Grid>
                    <Grid item xs={isMobile}>
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
            <Grid
              item
              className={isMobile ? classes.sectionGridItemMobile : classes.sectionGridItem}
            >
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
              <InformationBox
                open={state.alert.open}
                text={
                  state.alert.msg?.toString() ??
                  "Noe gikk galt med å melde inn familien, vennligst prøv igjen senere"
                }
                handleClose={() => setAlert(false)}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default RegistrationForm;
