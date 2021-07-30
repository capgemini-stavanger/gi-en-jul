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
import { createTheme, ThemeProvider } from "@material-ui/core";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// Create browser history to use in the Redux store
const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);
const domainEnv: string = process.env.REACT_APP_DEV_TENANT_AUTH0!;
const clientidEnv: string = process.env.REACT_APP_DEV_CLIENTID_AUTH0!;
const apiurl: string = process.env.REACT_APP_API_URL!;
const recaptchaSiteKey: string = process.env.REACT_APP_RECAPTCHA_SITE_KEY!;

const theme = createTheme({
  palette: {
    primary: {
      main: "#49a591", // Dark green
    },
    secondary: {
      main: "#d9f0f2", // Light blue
    },
    error: {
      main: "#ed8175", // Light red
    },
    warning: {
      main: "#f4cf8a", //Yellow
    },
    info: {
      main: "#d9f0f2", // Light blue
    },
  },
  typography: {
    fontFamily: "Quicksand",
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "2em",
        textTransform: "none",
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          borderRadius: "2em",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "2em",
        "&:focus": {
          borderRadius: "2em",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "2em",
      },
    },
    MuiListItem: {
      root: {
        justifyContent: "center",
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={domainEnv}
        clientId={clientidEnv}
        redirectUri={window.location.origin + "/admin"} // this should be changed to a .env var when we have refactured the project and pipeline
        audience={apiurl}
      >
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </GoogleReCaptchaProvider>
      </Auth0Provider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
