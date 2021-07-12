import * as React from "react";
import { CssBaseline, Typography, Container } from "@material-ui/core";
import Confirmation from "./Confirmation";
import ContactInfo from "./ContactInfo";
import LocationGiver from "./LocationGiver";
import SummaryRegistration from "./SummaryRegistration";
import { useEffect, useState } from "react";
import IGiverFormData from "./IGiverFormData";
import FamilySizeGiver from "./FamilySizeGiver";
import getLocations from "../../common/constants/Locations";

const initInputsState: IGiverFormData = {
  location: "",
  fullname: "",
  email: "",
  phoneNumber: "",
  maxReceivers: "",
};

const initState = {
  step: 1,
  confirmationOK: false,
};

const SignUp = () => {
  const [state, setState] = useState(initState);
  const [inputsState, setInputsState] = useState(initInputsState);

  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  useEffect(() => {
    getLocations().then((locationArray) => setLocationOptions(locationArray));
  }, []);

  // go back to previous step
  const prevStep = (event: React.FormEvent) => {
    event.preventDefault();
    setState((prev) => {
      return { ...prev, step: prev.step - 1 };
    });
  };

  // proceed to the next step
  const nextStep = (event: React.FormEvent) => {
    event.preventDefault();
    setState((prev) => {
      return { ...prev, step: prev.step + 1 };
    });
  };

  const handlefullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState((prev) => {
      return { ...prev, fullname: event.target.value };
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState((prev) => {
      return { ...prev, email: event.target.value };
    });
  };

  const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState((prev) => {
      return { ...prev, phoneNumber: event.target.value };
    });
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputsState((prev) => {
      return { ...prev, location: event.target.value };
    });
  };

  const handleFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputsState((prev) => {
      return { ...prev, maxReceivers: event.target.value };
    });
  };

  const handleConfirm = (submitOK: boolean) => {
    setState((prev) => {
      return { ...prev, confirmationOK: submitOK };
    });
  };

  switch (state.step) {
    case 1:
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Typography component="h1" variant="h4">
              Bli giver
            </Typography>
            <Typography component="h2">Hvor vil du gi?</Typography>
            <LocationGiver
              nextStep={nextStep}
              handleLocationChange={handleLocationChange}
              values={inputsState}
              placeHolder={"Velg et sted..."}
              locationOptions={locationOptions}
            ></LocationGiver>
          </div>
        </Container>
      );
    case 2:
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Typography component="h1" variant="h4">
              Bli giver
            </Typography>
            <Typography component="h2">Kontaktinformasjon</Typography>
            <ContactInfo
              nextStep={nextStep}
              prevStep={prevStep}
              handlefullnameChange={handlefullnameChange}
              handleEmailChange={handleEmailChange}
              handleTlfChange={handleTlfChange}
              values={inputsState}
            ></ContactInfo>
          </div>
        </Container>
      );
    case 3:
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Typography component="h1" variant="h4">
              Bli giver
            </Typography>
            <Typography component="h2">Familiesammensetning</Typography>
            <FamilySizeGiver
              nextStep={nextStep}
              prevStep={prevStep}
              handleFamilyChange={handleFamilyChange}
              values={inputsState}
              placeHolder={"Familiestørrelse"}
            ></FamilySizeGiver>
          </div>
        </Container>
      );
    case 4:
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Typography component="h1" variant="h4">
              Bli giver
            </Typography>
            <Typography component="h2">Oppsummering</Typography>
            <SummaryRegistration
              nextStep={nextStep}
              prevStep={prevStep}
              handleLocationChange={handleLocationChange}
              handlefullnameChange={handlefullnameChange}
              handleEmailChange={handleEmailChange}
              handleTlfChange={handleTlfChange}
              handleFamilyChange={handleFamilyChange}
              values={inputsState}
              locationOptions={locationOptions}
              callingback={handleConfirm}
            ></SummaryRegistration>
          </div>
        </Container>
      );
    case 5:
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Confirmation
              values={inputsState}
              confirmationOK={state.confirmationOK}
            ></Confirmation>
          </div>
        </Container>
      );
    default:
      return null;
  }
};
export default SignUp;
