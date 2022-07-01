import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import * as React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import ApiService from "common/functions/apiServiceClass";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import {
  isEmail,
  isNotNull,
  isPhoneNumber,
} from "components/shared/input-fields/validators/Validators";
import IFormData from "components/register-as-giver/IFormData";
import Pager from "components/register-as-giver/Pager";
import PrivacyDialog from "components/register-as-giver/PrivacyDialog";
import useStyles from "components/register-as-giver/Styles";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  values: IFormData;
  locationOptions: string[];
  callingback: (e: boolean) => void;
  step: number;
}

const initState = {
  viewErrorTrigger: 0,
  viewPrivacyError: false,
  dialogOpen: false,
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
  isValidPrivacy: false,
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
  step,
}) => {
  const apiservice = new ApiService();
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, setState] = useState(initState);
  const [changesState, setChangesState] = useState({ ...initChangesState });
  const [isValidsState, setIsValidsState] = useState({ ...initIsValidsState });

  const allIsValid = () => {
    for (const isValid in isValidsState) {
      if (!isValidsState[isValid]) return false;
    }
    return true;
  };

  const extendedNextStep = () => {
    if (!allIsValid()) {
      return setState((prev) => {
        return { ...prev, viewErrorTrigger: prev.viewErrorTrigger + 1 };
      });
    }
    submit();
    nextStep();
  };

  const submit = async () => {
    if (!executeRecaptcha) return;
    const recaptchaToken = await executeRecaptcha("register_giver");
    await apiservice
      .post(
        "giver",
        JSON.stringify({
          recaptchaToken,
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
      .catch(() => {
        callingback(false);
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

  const setIsValidPrivacyState = (isValid: boolean) => {
    setIsValidsState((prev) => ({
      ...prev,
      isValidPrivacy: isValid,
    }));
  };

  const setShowPrivacyDialog = (show: boolean) => {
    setState((prev) => ({
      ...prev,
      dialogOpen: show,
    }));
  };

  const getPrivacyState = useCallback(() => isValidsState.isValidPrivacy, [isValidsState]);

  useEffect(() => {
    if (!state.viewErrorTrigger) return;
    setState((prev) => ({
      ...prev,
      viewPrivacyError: !isValidsState.isValidPrivacy,
    }));
  }, [state.viewErrorTrigger]);

  return (
    <>
      <Typography className={classes.subHeading}>Oppsummering</Typography>
      <Typography className={classes.infoText}>
        Se gjennom informasjonen, les og godkjenn personvernerklæringen vår før du sender inn. Sjekk
        gjerne at telefonnummer og epostadresse er riktig skrevet.{" "}
      </Typography>
      <Container>
        <Grid container className={classes.form}>
          <Grid container className={classes.summaryInput}>
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
            <Grid item xs={9} className={classes.summaryInput}>
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
            <Grid item xs={9} className={classes.summaryInput}>
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
          <Grid container>
            <Grid item xs={9} className={classes.summaryInput}>
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
            <Grid item xs={9} className={classes.summaryInput}>
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
          <FormControl required error>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={(e) => setIsValidPrivacyState(e.target.checked)}
                  checked={getPrivacyState()}
                />
              }
              label={
                <Typography
                  variant="subtitle2"
                  color={state.viewPrivacyError ? "error" : undefined}
                >
                  Jeg godtar Gi en juls{" "}
                  <Link
                    color={state.viewPrivacyError ? "error" : "textSecondary"}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyDialog(true);
                    }}
                  >
                    personvernerklæring
                  </Link>
                </Typography>
              }
            />
          </FormControl>
          {/* A comment about recaptcha is needed in the summary. See https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed*/}
          <div className={classes.captchaContainer}>
            <Typography variant="caption" gutterBottom>
              Dette nettstedet er beskyttet av reCAPTCHA og Googles{" "}
              <Link color="textSecondary" href="https://policies.google.com/privacy">
                personvernerklæring
              </Link>{" "}
              og{" "}
              <Link color="textSecondary" href="https://policies.google.com/terms">
                vilkår for bruk
              </Link>{" "}
              gjelder.
            </Typography>
          </div>
        </Grid>
        <Pager
          onContinue={extendedNextStep}
          onBack={prevStep}
          continueText="Fullfør registreringen"
          step={step}
        />
      </Container>
      <PrivacyDialog
        open={state.dialogOpen}
        onClose={() => setShowPrivacyDialog(false)}
        privacyState={isValidsState.isValidPrivacy}
        setPrivacyState={setIsValidPrivacyState}
      />
    </>
  );
};
export default SummaryRegistration;
