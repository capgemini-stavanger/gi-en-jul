import * as React from "react";
import { CssBaseline, Typography, Container } from "@material-ui/core";
import Confirmation from "./Confirmation";
import ContactInfo from "./ContactInfo";
import LocationGiver from "./LocationGiver";
import SummaryRegistration from "./SummaryRegistration";
import { useState } from "react";
import IGiverInputs from "./IGiverInputs";

const initInputsState: IGiverInputs = {
  location: undefined,
  fullname: undefined,
  email: undefined,
  phoneNumber: undefined,
  maxRecivers: undefined,
};

const initState = {
  step: 1,
  confirmationOK: false,
};

const SignUp = () => {
  const [state, setState] = useState(initState);
  const [inputsState, setInputsState] = useState(initInputsState);

  // go back to previous step
  const prevStep = () => {
    setState((prev) => {
      return { ...prev, step: prev.step - 1 };
    });
  };

  // proceed to the next step
  const nextStep = () => {
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

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState((prev) => {
      return { ...prev, location: event.target.value };
    });
  };

  const handleFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputsState((prev) => {
      return { ...prev, maxRecivers: event.target.value };
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
            <LocationGiver
              nextStep={nextStep}
              prevStep={prevStep}
              handleLocationChange={handleFamilyChange}
              values={inputsState}
              placeHolder={"Familiestørrelse"}
            ></LocationGiver>
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
      return <></>;
  }
};
export default SignUp;
