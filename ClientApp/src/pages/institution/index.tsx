import { Container, Tab } from "@material-ui/core";
import React, { useState } from "react";
import NavBarLoggedIn from "components/shared/navbar/NavBarLoggedIn";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import RegistrationFormRemake from "components/institution/NewDesign/RegistrationFormRemake";
import RegistrationOverview from "components/institution/NewDesign/RegistrationOverview";
import useUser from "hooks/useUser";
import InstitutionForm from "components/institution/InstitutionForm";
import RegistrationInfo from "components/institution/InstitutionInfo";
import RegistrationForm from "components/institution/InstitutionForm";
import useStyles from "components/institution/Styles";

interface IInstitutionMacro {
  accessToken: string;
}
const InstitutionMacro: React.FC<IInstitutionMacro> = ({ accessToken }) => {
  const classes = useStyles();
  /*  const [step, setStep] = useState<string>("1");

  const { institution } = useUser();

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setStep(newValue);
  };
*/
  return (
    <>
      <NavBarLoggedIn role={"Institution"} />
      <Container className={classes.root}>
        <RegistrationInfo />
        <RegistrationForm accessToken={accessToken} />
      </Container>
    </>
  );
};

export default InstitutionMacro;

/*
  <TabContext value={step}>
        <TabList onChange={handleChange} centered>
          <Tab label="Registrer" value="1" />
          <Tab label="Oversikt" value="2" />
        </TabList>
        <TabPanel value="1">
          <InstitutionForm accessToken={accessToken} />
        </TabPanel>
        <TabPanel value="2">
          <RegistrationOverview accessToken={accessToken} institution={institution} />
        </TabPanel>
      </TabContext>
      */
