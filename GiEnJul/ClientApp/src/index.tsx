import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";

// Create browser history to use in the Redux store
const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);
const domainEnv: string = process.env.REACT_APP_DEV_TENANT_AUTH0!;
const clientidEnv: string = process.env.REACT_APP_DEV_CLIENTID_AUTH0!;

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={domainEnv}
      clientId={clientidEnv}
      redirectUri={window.location.origin + "/admin"} // this should be changed to a .env var when we have refactured the project and pipeline
      audience={window.location.origin + "/api"} // this should be changed to a .env var when we have refactured the project and pipeline
    >
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
