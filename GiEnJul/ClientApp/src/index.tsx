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
import { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints";

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

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
declare module "@material-ui/core/styles/createTheme" {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties["width"];
      breakpoint: BreakpointOverrides;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties["width"];
      breakpoint?: BreakpointOverrides;
    };
  }
}
export const theme = createTheme({
  breakpoints: {
    values: {
      tablet: 500,
      laptop: 900,
      desktop: 1200,
    },
  },
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
    success: {
      main: "#49a591",
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
      elevation1: {
        boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
      },
      rounded: {
        borderRadius: "2em",
      },
    },
    MuiListItem: {
      root: {
        justifyContent: "center",
      },
    },
    MuiAccordion: {
      root: {
        overflow: "hidden",
      },
      rounded: {
        borderBottomLeftRadius: "2em",
        borderBottomRightRadius: "2em",
        borderTopLeftRadius: "2em",
        borderTopRightRadius: "2em",
        borderRadius: "2em",
        "&:last-child": {
          borderBottomLeftRadius: "2em",
          borderBottomRightRadius: "2em",
          borderTopLeftRadius: "2em",
          borderTopRightRadius: "2em",
          borderRadius: "2em",
        },
        "&:first-child": {
          borderBottomLeftRadius: "2em",
          borderBottomRightRadius: "2em",
          borderTopLeftRadius: "2em",
          borderTopRightRadius: "2em",
          borderRadius: "2em",
        },
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
