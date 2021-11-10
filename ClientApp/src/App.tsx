// import React from "react";
import { Route } from "react-router";
import AdminPage from "../src/components/admin/AdminPage";
import LoadingPage from "./common/components/LoadingPage";
import Edit from "./components/admin/editLandingPage/EditMacro";
import Home from "./components/landingPage/Macro";
import Institution from "./components/institution/InstitutionMacro";
import RegistrationMacro from "./components/registerGiver/Macro";
import VerifyConnection from "./components/verifyConnection/verifyConnection";
import "./custom.css";
// import { Store } from "./Store";

const App = () => {
  // const { state, dispatch } = React.useContext(Store);

  return (
    <>
      <Route path="/admin" component={AdminPage} />
      <Route exact path="/" component={Home} />
      <Route path="/registrer-familie" component={Institution} />
      <Route path="/bli-giver" component={RegistrationMacro} />
      <Route path="/rediger" component={Edit} />
      <Route path="/loading" component={LoadingPage} />
      <Route
        path="/:giverRowKey/:recipientRowKey/:partitionKey"
        component={VerifyConnection}
      />
    </>
  );
};
export default App;
