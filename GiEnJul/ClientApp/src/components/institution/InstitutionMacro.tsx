import * as React from "react";
import RegistrationInfo from "./InstitutionInfo";
import RegistrationForm from "./InstitutionForm";
import NavMenuAdmin from "../../common/components/NavMenuAdmin";

export default () => (
  <>
  <NavMenuAdmin/>
    <RegistrationInfo />
    <RegistrationForm />
  </>
);