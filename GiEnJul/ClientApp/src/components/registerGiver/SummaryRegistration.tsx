import * as React from "react";
import { Container, Button, Grid } from "@material-ui/core";
import LOCATIONS from "../../common/constants/Locations";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import useStyles from "./Styles";
import { useState } from "react";
import InputValidator from "../../components/InputFields/Validators/InputValidator";
import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "../../components/InputFields/Validators/Validators";
import IGiverInputs from "./IGiverInputs";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  values: IGiverInputs;
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
  callingback,
}) => {
  const [state, setState] = useState(initState);
  const [changesState, setChangesState] = useState(initChangesState);
  const [isValidsState, setIsValidsState] = useState(initIsValidsState);

  const trigger = (b: boolean) => {
    callingback(b);
  };

  const Continue = (e: any) => {
    e.preventDefault();
    for (let isValid in isValidsState) {
      if (isValidsState[isValid]) continue;
      return setState((prev) => {
        return { ...prev, viewErrorTrigger: prev.viewErrorTrigger + 1 };
      });
    }
    Submit();
  };

  const Submit = async () => {
    await fetch("api/giver", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: values.location,
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        maxReciviers: values.maxRecivers,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          trigger(true);
        }
      })
      .catch((errorStack) => {
        console.log(errorStack);
      });
    nextStep();
  };
  const Previous = (e: any) => {
    e.preventDefault();
    prevStep();
  };

  const handleChange = (target: string) => {
    setChangesState((prev) => ({ ...prev, [target]: !prev[target] }));
  };

  const setValidity = (target: string, value: boolean) => {
    setIsValidsState((prev) => {
      {
        prev[target] = value;
        return prev;
      }
    });
  };

  const classes = useStyles();

  return (
    <Container>
      <form onSubmit={Continue} style={{ width: "100%", marginTop: "20px" }}>
        <Grid container className={classes.inputRow}>
          <Grid item xs={9}>
            <InputValidator
              viewErrorTrigger={state.viewErrorTrigger}
              type="select"
              disabled={changesState.location}
              variant="outlined"
              fullWidth
              label="Lokasjon*"
              name="location-input"
              value={values.location ? values.location : ""}
              id="location-input"
              onChange={handleLocationChange}
              errorMessages={["Vennligst velg lokasjon"]}
              validators={[isNotNull]}
              setIsValids={(isValid) => setValidity("isValidLocation", isValid)}
              options={LOCATIONS.map((x) => {
                return { value: x, text: x };
              })}
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleChange("location")}>
              <EditOutlinedIcon
                className={classes.iconSelector}
              ></EditOutlinedIcon>
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.inputRow}>
          <Grid item xs={9}>
            <InputValidator
              viewErrorTrigger={state.viewErrorTrigger}
              disabled={changesState.fullName}
              label="Fullt navn*"
              variant="outlined"
              fullWidth
              name="fullname"
              autoComplete="name"
              value={values.fullname ? values.fullname : ""}
              onChange={handlefullnameChange}
              validators={[isNotNull]}
              errorMessages={["Vennligst skriv inn ditt navn"]}
              setIsValids={(isValid) => setValidity("isValidFullName", isValid)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleChange("fullName")}>
              <EditOutlinedIcon
                className={classes.iconTexField}
              ></EditOutlinedIcon>
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.inputRow}>
          <Grid item xs={9}>
            <InputValidator
              viewErrorTrigger={state.viewErrorTrigger}
              disabled={changesState.email}
              label="Email"
              onChange={handleEmailChange}
              name="email"
              value={values.email ? values.email : ""}
              validators={[isEmail, isNotNull]}
              errorMessages={[
                "Eposten din ser litt rar ut, er den skrevet riktig?",
                "Vennligst skriv inn din epost",
              ]}
              setIsValids={[
                (isValid) => setValidity("isValidEmail", isValid),
                (isValid) => setValidity("isNotNullEmail", isValid),
              ]}
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleChange("email")}>
              <EditOutlinedIcon
                className={classes.iconTexField}
              ></EditOutlinedIcon>
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.inputRow}>
          <Grid item xs={9}>
            <InputValidator
              viewErrorTrigger={state.viewErrorTrigger}
              disabled={changesState.phone}
              label="telefon"
              onChange={handleTlfChange}
              name="phoneNumber"
              value={values.phoneNumber ? values.phoneNumber : ""}
              validators={[isPhoneNumber, isNotNull]}
              errorMessages={[
                "Telefonnummeret ditt ser litt rart ut, er det skrevet riktig?",
                "Vennligst skriv inn ditt telefonnummer",
              ]}
              setIsValids={[
                (isValid) => setValidity("isValidPhone", isValid),
                (isValid) => setValidity("isNotNullPhone", isValid),
              ]}
              autoComplete="tel"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleChange("phone")}>
              <EditOutlinedIcon
                className={classes.iconTexField}
              ></EditOutlinedIcon>
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.inputRow}>
          <Grid item xs={9}>
            <InputValidator
              viewErrorTrigger={state.viewErrorTrigger}
              type="select"
              disabled={changesState.family}
              variant="outlined"
              fullWidth
              name="familyType-input"
              value={values.maxRecivers ? values.maxRecivers : ""}
              onChange={handleFamilyChange}
              label="Familiesammensetning*"
              validators={[isNotNull]}
              setIsValids={(isValid) => setValidity("isValidFamily", isValid)}
              options={FAMILY_SIZES}
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleChange("family")}>
              <EditOutlinedIcon
                className={classes.iconSelector}
              ></EditOutlinedIcon>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} justify="center" className={classes.submit}>
          <Grid item>
            <Button variant="contained" onClick={Previous}>
              Tilbake
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Bli Giver
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default SummaryRegistration;
