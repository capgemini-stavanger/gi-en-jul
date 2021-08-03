import { Container } from "@material-ui/core";
import * as React from "react";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";
import RegistrationForm from "./InstitutionForm";
import RegistrationInfo from "./InstitutionInfo";
import useStyles from "./Styles";

interface IInstitutionMacro {
  accessToken: string;
}
const InstitutionMacro: React.FC<IInstitutionMacro> = ({ accessToken }) => {
  const classes = useStyles();
  return (
    <>
      <NavMenuAdmin role={"Institution"} />
      <Container className={classes.root}>
      <RegistrationInfo />
      <RegistrationForm accessToken={accessToken} />
      </Container>
    </>
  );
};

export default InstitutionMacro;
