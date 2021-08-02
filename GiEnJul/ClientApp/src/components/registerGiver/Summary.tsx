import { Button, Container, Grid, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import * as React from "react";
import { useState } from "react";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";
import ApiService from "../../common/functions/apiServiceClass";
import InputValidator from "../InputFields/Validators/InputValidator";
import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "../InputFields/Validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from "./Styles";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  values: IFormData;
  locationOptions: string[];
  callingback: (e: boolean) => void;
}

const initState = {
  viewErrorTrigger: 0,
};

type keyValue = {
  [key: string]: boolean;
};

const initChangesState: keyValue = {
  location: true,
  fullName: true,
  email: true,
  phone: true,
  family: true,
};

const initIsValidsState: keyValue = {
  isValidLocation: true,
  isValidFullName: true,
  isValidEmail: true,
  isNotNullEmail: true,
  isValidPhone: true,
  isNotNullPhone: true,
  isValidFamily: true,
};

const SummaryRegistration: React.FC<Props> = ({
  nextStep,
  prevStep,
  handleLocationChange,
  handlefullnameChange,
  handleEmailChange,
  handleTlfChange,
  handleFamilyChange,
  values,
  locationOptions,
  callingback,
}) => {
  const [state, setState] = useState(initState);
  const [changesState, setChangesState] = useState(initChangesState);
  const [isValidsState, setIsValidsState] = useState(initIsValidsState);
  const apiservice = new ApiService();

  const extendedNextStep = (e: any) => {
    for (let isValid in isValidsState) {
      if (isValidsState[isValid]) continue;
      return setState((prev) => {
        return { ...prev, viewErrorTrigger: prev.viewErrorTrigger + 1 };
      });
    }
    Submit();
    nextStep(e);
  };

  const Submit = async () => {
    await apiservice
      .post(
        "giver",
        JSON.stringify({
          location: values.location,
          fullname: values.fullname,
          email: values.email,
          phoneNumber: values.phoneNumber,
          maxReceivers: values.maxReceivers,
        })
      )
      .then((response) => {
        if (response.status === 201) {
          callingback(true);
        }
      })
      .catch((errorStack) => {
        callingback(false);
        console.log(errorStack);
      });
  };

  const handleChange = (target: string) => {
    return () => {
      setChangesState((prev) => ({ ...prev, [target]: !prev[target] }));
    };
  };

  const getValiditySetter = (target: string) => {
    return (isValid: boolean) => {
      setIsValidsState((prev) => {
        {
          prev[target] = isValid;
          return prev;
        }
      });
    };
  };

  const classes = useStyles();

  return (
    <>
      <Typography className={classes.subHeading}>Oppsummering</Typography>
      <Container>
        <Grid container className={classes.form}>
          <Grid container>
            <Grid item xs={9}>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                type="select"
                disabled={changesState.location}
                variant="outlined"
                fullWidth
                label="Lokasjon*"
                name="location-input"
                value={values.location}
                id="location-input"
                onChange={handleLocationChange}
                errorMessages={["Vennligst velg lokasjon"]}
                validators={[isNotNull]}
                setIsValids={getValiditySetter("isValidLocation")}
                options={locationOptions.map((loc) => {
                  return { value: loc, text: loc };
                })}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleChange("location")}>
                <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={9}>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                disabled={changesState.fullName}
                label="Fullt navn*"
                variant="outlined"
                fullWidth
                name="fullname"
                autoComplete="name"
                value={values.fullname}
                onChange={handlefullnameChange}
                validators={[isNotNull]}
                errorMessages={["Vennligst skriv inn ditt navn"]}
                setIsValids={getValiditySetter("isValidFullName")}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleChange("fullName")}>
                <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                disabled={changesState.email}
                label="Epost"
                onChange={handleEmailChange}
                name="email"
                value={values.email}
                validators={[isEmail, isNotNull]}
                errorMessages={[
                  "Eposten din ser litt rar ut, er den skrevet riktig?",
                  "Vennligst skriv inn din epost",
                ]}
                setIsValids={[
                  getValiditySetter("isValidEmail"),
                  getValiditySetter("isNotNullEmail"),
                ]}
                autoComplete="email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleChange("email")}>
                <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid container className={classes.inputRow}>
            <Grid item xs={9}>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                disabled={changesState.phone}
                label="Telefonnummer"
                onChange={handleTlfChange}
                name="phoneNumber"
                value={values.phoneNumber}
                validators={[isPhoneNumber, isNotNull]}
                errorMessages={[
                  "Telefonnummeret ditt ser litt rart ut, er det skrevet riktig?",
                  "Vennligst skriv inn ditt telefonnummer",
                ]}
                setIsValids={[
                  getValiditySetter("isValidPhone"),
                  getValiditySetter("isNotNullPhone"),
                ]}
                autoComplete="tel"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={handleChange("phone")}>
                <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              <InputValidator
                viewErrorTrigger={state.viewErrorTrigger}
                type="select"
                disabled={changesState.family}
                variant="outlined"
                fullWidth
                name="familyType-input"
                value={values.maxReceivers}
                onChange={handleFamilyChange}
                label="Familiesammensetning*"
                validators={[isNotNull]}
                setIsValids={getValiditySetter("isValidFamily")}
                options={FAMILY_SIZES}
              />
            </Grid>

            <Grid item xs={3}>
              <Button onClick={handleChange("family")}>
                <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Pager
          onContinue={extendedNextStep}
          onBack={prevStep}
          continueText="Fullfør registreringen"
        />
      </Container>
    </>
  );
};
export default SummaryRegistration;
