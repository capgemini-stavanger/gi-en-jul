import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Confirmation from "components/register-as-giver/Confirmation";
import ContactInfo from "components/register-as-giver/ContactInfo";
import Location from "components/register-as-giver/Location";
import SummaryRegistration from "components/register-as-giver/Summary";
import IFormData from "components/register-as-giver/IFormData";
import FamilySize from "components/register-as-giver/FamilySize";
import getLocations from "common/constants/Locations";
import useStyles from "components/register-as-giver/Styles";
import LoadingPage from "pages/LoadingPage";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import BliGiverStep1 from "styling/img/BliGiverStep1.png";
import BliGiverStep2 from "styling/img/BliGiverStep2.png";
import BliGiverStep3 from "styling/img/BliGiverStep3.png";
import BliGiverStep4 from "styling/img/BliGiverStep4.png";
import Steppers from "components/register-as-giver/Steppers";

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

  const [locationOptions, setLocationOptions] = useState<string[] | undefined>(undefined);

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

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    switch (state.step) {
      case 1:
        return (
          <>
            <img src={BliGiverStep1}></img>
            <Location
              nextStep={nextStep}
              handleLocationChange={handleLocationChange}
              values={formDataState}
              placeHolder={"Velg et sted..."}
              locationOptions={locationOptions ?? []}
              step={state.step}
            />
          </>
        );
      case 2:
        return (
          <>
            <img src={BliGiverStep2}></img>
            <ContactInfo
              nextStep={nextStep}
              prevStep={prevStep}
              handlefullnameChange={handlefullnameChange}
              handleEmailChange={handleEmailChange}
              handleTlfChange={handleTlfChange}
              values={formDataState}
              step={state.step}
            />
          </>
        );
      case 3:
        return (
          <>
            <img src={BliGiverStep3}></img>
            <FamilySize
              nextStep={nextStep}
              prevStep={prevStep}
              handleFamilyChange={handleFamilyChange}
              values={formDataState}
              placeHolder={"Familiestørrelse"}
              step={state.step}
            />
          </>
        );
      case 4:
        return (
          <>
            <img src={BliGiverStep4}></img>
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
          </>
        );
      case 5:
        return (
          <Confirmation values={formDataState} confirmationOK={state.confirmationOK}></Confirmation>
        );
      default:
        return <LoadingPage />;
    }
  };
  return (
    <>
      <Container className={classes.fillBackground} maxWidth={false}>
        <NavBarPublic />
        <Container className={classes.giverForm}>
          <Steppers state={state.step} />
          {getStepPage()}
        </Container>
      </Container>
    </>
  );
};

export default RegistrationMacro;
