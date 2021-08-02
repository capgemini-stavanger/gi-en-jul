import * as React from "react";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";
import RegistrationForm from "./InstitutionForm";
import RegistrationInfo from "./InstitutionInfo";

interface IInstitutionMacro {
  accessToken: string;
}
const InstitutionMacro: React.FC<IInstitutionMacro> = ({ accessToken }) => {
  return (
    <>
      <NavMenuAdmin role={"Institution"} />
      <RegistrationInfo />
      <RegistrationForm accessToken={accessToken} />
    </>
  );
};

export default InstitutionMacro;
