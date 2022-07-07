import { Tab } from "@material-ui/core";
import React, { useState } from "react";
import NavBarLoggedIn from "components/shared/navbar/NavBarLoggedIn";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import RegistrationFormRemake from "components/institution/NewDesign/RegistrationFormRemake";
import RegistrationOverview from "components/institution/NewDesign/RegistrationOverview";
import useUser from "hooks/useUser";

interface IInstitutionMacro {
  accessToken: string;
}
const InstitutionMacro: React.FC<IInstitutionMacro> = ({ accessToken }) => {
  const [step, setStep] = useState<string>("1");

  const { institution } = useUser();

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
          <RegistrationFormRemake accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <RegistrationOverview accessToken={accessToken} institution={institution} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default InstitutionMacro;
