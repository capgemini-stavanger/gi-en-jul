import React, { useEffect, useState } from "react";
import { Typography, Container } from "@material-ui/core";
import Confirmation from "./Confirmation";
import ContactInfo from "./ContactInfo";
import Location from "./Location";
import SummaryRegistration from "./Summary";
import IFormData from "./IFormData";
import FamilySize from "./FamilySize";
import getLocations from "../../common/constants/Locations";
import useStyles from "./Styles";
import NavBar from "../../common/components/NavBar";
import LoadingPage from "../../common/components/LoadingPage";

const initFormDataState: IFormData = {
  location: "",
  fullname: "",
  email: "",
  phoneNumber: "",
  maxReceivers: "",
};

const initState: { step: number; confirmationOK?: boolean } = {
  step: 1,
  confirmationOK: undefined,
};

const RegistrationMacro = () => {
  const [state, setState] = useState(initState);
  const [formDataState, setFormDataState] = useState(initFormDataState);

  const [locationOptions, setLocationOptions] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    getLocations().then((locationArray) => setLocationOptions(locationArray));
  }, []);

  // go back to previous step
  const prevStep = (event?: React.FormEvent) => {
    event?.preventDefault();
    setState((prev) => {
      return { ...prev, step: prev.step - 1 };
    });
  };

  // proceed to the next step
  const nextStep = (event?: React.FormEvent) => {
    event?.preventDefault();
    setState((prev) => {
      return { ...prev, step: prev.step + 1 };
    });
  };

  const handlefullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({ ...prev, fullname: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({ ...prev, email: event.target.value }));
  };

  const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataState((prev) => ({ ...prev, phoneNumber: event.target.value }));
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormDataState((prev) => ({ ...prev, location: event.target.value }));
  };

  const handleFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormDataState((prev) => ({ ...prev, maxReceivers: event.target.value }));
  };

  const handleConfirm = (submitOK: boolean) => {
    setState((prev) => ({ ...prev, confirmationOK: submitOK }));
  };

  const classes = useStyles();

  const getStepPage = () => {
    if (locationOptions === undefined) {
      return <LoadingPage />;
    }
    switch (state.step) {
      case 1:
        return (
          <Location
            nextStep={nextStep}
            handleLocationChange={handleLocationChange}
            values={formDataState}
            placeHolder={"Velg et sted..."}
            locationOptions={locationOptions ?? []}
            step={state.step}
          />
        );
      case 2:
        return (
          <ContactInfo
            nextStep={nextStep}
            prevStep={prevStep}
            handlefullnameChange={handlefullnameChange}
            handleEmailChange={handleEmailChange}
            handleTlfChange={handleTlfChange}
            values={formDataState}
            step={state.step}
          />
        );
      case 3:
        return (
          <FamilySize
            nextStep={nextStep}
            prevStep={prevStep}
            handleFamilyChange={handleFamilyChange}
            values={formDataState}
            placeHolder={"Familiestørrelse"}
            step={state.step}
          />
        );
      case 4:
        return (
          <SummaryRegistration
            nextStep={nextStep}
            prevStep={prevStep}
            handleLocationChange={handleLocationChange}
            handlefullnameChange={handlefullnameChange}
            handleEmailChange={handleEmailChange}
            handleTlfChange={handleTlfChange}
            handleFamilyChange={handleFamilyChange}
            values={formDataState}
            locationOptions={locationOptions ?? []}
            callingback={handleConfirm}
            step={state.step}
          />
        );
      case 5:
        return (
          <Confirmation
            values={formDataState}
            confirmationOK={state.confirmationOK}
          ></Confirmation>
        );
      default:
        return null;
    }
  };
  return (
    <>
      {state.step === 5 ? (
        <Container className={classes.summaryDesign}>
          <Confirmation
            values={formDataState}
            confirmationOK={state.confirmationOK}
          ></Confirmation>
        </Container>
      ) : (
        <>
          <NavBar />
          <Container className={classes.giverForm}>
            <Typography className={classes.heading}>Bli giver</Typography>
            {getStepPage()}
          </Container>
        </>
      )}
    </>
  );
};

export default RegistrationMacro;