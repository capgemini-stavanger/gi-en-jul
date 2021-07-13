import { Container } from "@material-ui/core";
import * as React from "react";
import { Route } from "react-router";
import AdminPage from "../src/components/admin/AdminPage";
import LoadingPage from "./common/components/LoadingPage";
import NavMenuAdmin from "./common/components/NavMenuAdmin";
import Edit from "./components/admin/editLandingPage/EditMacro";
import Home from "./components/home/Home";
import Institution from "./components/institution/InstitutionMacro";
import RegistrationMacro from "./components/registerGiver/Macro";
import "./custom.css";

const App = () => {
  return (
    <>
      <NavMenuAdmin />
      <Container>
        <Route path="/admin" component={AdminPage} />
        <Route exact path="/" component={Home} />
        <Route path="/registrer-familie" component={Institution} />
        <Route path="/bli-giver" component={RegistrationMacro} />
        <Route path="/rediger" component={Edit} />
        <Route path="/loading" component={LoadingPage} />
      </Container>
    </>
  );
};
export default App;
