import { Route } from "react-router";
import AdminPage from "pages/login";
import LoadingPage from "pages/LoadingPage";
import Home from "pages/landing-page";
import RegistrationMacro from "pages/register-as-giver";
import VerifyConnection from "pages/VerifyConnection";
import "custom.css";
import Municipality from "pages/municipality";

const App = () => {
  return (
    <>
      <Route path="/admin" component={AdminPage} />
      <Route exact path="/" component={Home} />
      <Route path="/bli-giver" component={RegistrationMacro} />
      <Route path="/loading" component={LoadingPage} />
      <Route path="/kommune" component={Municipality} />
      <Route
        path="/:giverRowKey/:recipientRowKey/:partitionKey"
        component={VerifyConnection}
      />
    </>
  );
};
export default App;
