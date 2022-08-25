import { Tab } from "@material-ui/core";
import React, { useState } from "react";
import NavBarLoggedIn from "components/shared/navbar/NavBarLoggedIn";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import RegistrationForm from "components/institution/RegistrationForm";
import RegistrationOverview from "components/institution/RegistrationOverview";

const InstitutionMacro = () => {
  const [step, setStep] = useState<string>("1");

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setStep(newValue);
  };

  return (
    <>
      <NavBarLoggedIn role={"Institution"} />
      <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          <Tab label="Registrer" value="1" />
          <Tab label="Oversikt" value="2" />
        </TabList>
        <TabPanel value="1">
          <RegistrationForm />
        </TabPanel>
        <TabPanel value="2">
          <RegistrationOverview />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default InstitutionMacro;
