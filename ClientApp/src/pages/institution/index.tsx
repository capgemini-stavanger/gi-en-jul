import { Container } from "@material-ui/core";
import * as React from "react";
import NavBarLoggedIn from "components/shared/navbar/NavBar";
import RegistrationForm from "components/institution/InstitutionForm";
import RegistrationInfo from "components/institution/InstitutionInfo";
import useStyles from "components/institution/Styles";

interface IInstitutionMacro {
  accessToken: string;
}
const InstitutionMacro: React.FC<IInstitutionMacro> = ({ accessToken }) => {
  const classes = useStyles();
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
