import * as React from "react";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";
import RegistrationForm from "./InstitutionForm";
import RegistrationInfo from "./InstitutionInfo";

export default () => (
  <>
    <NavMenuAdmin role={"Institution"} />
    <RegistrationInfo />
    <RegistrationForm />
  </>
);
