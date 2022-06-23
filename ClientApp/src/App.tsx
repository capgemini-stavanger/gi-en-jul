import { Route } from "react-router";
import AdminPage from "pages/login";
import LoadingPage from "pages/LoadingPage";
import Home from "pages/landing-page";
import RegistrationMacro from "pages/register-as-giver";
import VerifyConnection from "pages/VerifyConnection";
import Stavanger from "pages/stavanger";
import Sandnes from "pages/sandnes";
import "custom.css";
import Gjesdal from "pages/gjesdal";
import Sola from "pages/sola";

const App = () => {
  return (
    <>
      <Route path="/admin" component={AdminPage} />
      <Route exact path="/" component={Home} />
      <Route path="/bli-giver" component={RegistrationMacro} />
      <Route path="/loading" component={LoadingPage} />
      <Route path="/stavanger" component={Stavanger} />
      <Route path="/sandnes" component={Sandnes} />
      <Route path="/sola" component={Sola} />
      <Route path="/gjesdal" component={Gjesdal} />
      <Route
        path="/:giverRowKey/:recipientRowKey/:partitionKey"
        component={VerifyConnection}
      />
    </>
  );
};
export default App;
