import { Route } from "react-router";
import AdminPage from "pages/login";
import LoadingPage from "pages/LoadingPage";
import Home from "pages/landing-page";
import StartJul from "components/landing-page/StartJul";
import Business from "components/landing-page/Business";
import RegistrationMacro from "pages/register-as-giver";
import VerifyConnection from "pages/VerifyConnection";
import "custom.css";

const App = () => {
  return (
    <>
      <Route path="/admin" component={AdminPage} />
      <Route exact path="/" component={Home} />
      <Route path="/bedrift" component={Business} />
      <Route path="/startJul" component={StartJul} />
      <Route path="/bli-giver" component={RegistrationMacro} />
      <Route path="/loading" component={LoadingPage} />
      <Route path="/kommune" component={Municipality} />
      <Route path="/:giverRowKey/:recipientRowKey/:partitionKey" component={VerifyConnection} />
    </>
  );
};
export default App;
