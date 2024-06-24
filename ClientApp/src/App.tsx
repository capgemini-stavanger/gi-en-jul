import { Route } from "react-router";
import AdminPage from "pages/login";
import LoadingPage from "pages/LoadingPage";
import Home from "pages/landing-page";
// import StartJul from "components/landing-page/StartJul";
// import Business from "components/landing-page/Business";
import RegistrationMacro from "pages/register-as-giver";
import ConnectionAccepted from "pages/ConnectionAccepted";
import "custom.css";
import Municipality from "pages/municipality";
import ConnectionDenied from "pages/ConnectionDenied";
import VerifyConnection from "pages/VerifyConnection";

const App = () => {
  return (
    <>
      <Route path="/admin" component={AdminPage} />
      <Route exact path="/" component={Home} />
      {/* <Route path="/bedrift" component={Business} />
      <Route path="/startJul" component={StartJul} /> */}
      <Route path="/bli-giver" component={RegistrationMacro} />
      <Route path="/loading" component={LoadingPage} />
      <Route path="/kommune" component={Municipality} />
      <Route
        exact
        path="/:giverRowKey/:recipientRowKey/:partitionKey"
        component={VerifyConnection}
      />
      <Route
        path="/:giverRowKey/:recipientRowKey/:partitionKey/accepted"
        component={ConnectionAccepted}
      />
      <Route
        path="/:giverRowKey/:recipientRowKey/:partitionKey/denied"
        component={ConnectionDenied}
      />
    </>
  );
};
export default App;
