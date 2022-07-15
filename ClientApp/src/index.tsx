import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { BreakpointOverrides } from "@material-ui/core/styles/createBreakpoints";

// Get the application-wide store instance, prepopulating with state from the server where available.
const domainEnv: string = process.env.REACT_APP_DEV_TENANT_AUTH0 ?? "";
const clientidEnv: string = process.env.REACT_APP_DEV_CLIENTID_AUTH0 ?? "";
const apiurl: string = process.env.REACT_APP_API_URL ?? "";
const recaptchaSiteKey: string = process.env.REACT_APP_RECAPTCHA_SITE_KEY ?? "";

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
      laptop: 1000,
      desktop: 1300,
    },
  },
  palette: {
    primary: {
      main: "#327C6D", // Dark green
    },
    secondary: {
      main: "#D9F0F2", // Light green
    },
    error: {
      main: "#E36152", // Light red
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
    MuiInputBase: {
      root: {
        backgroundColor: "white",
      },
    },
    MuiInputLabel: {
      root: {
        marginBottom: "-5px",
        transform: "none",
      },
      shrink: {
        transform: "translate(14px, -18px) scale(1) !important",
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "1em",
        "& $notchedOutline": {
          top: "0px",
        },
      },
    },
    MuiSelect: {
      select: {
        "&:focus": {
          borderRadius: "1em",
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: "2em",
        textTransform: "none",
      },
      outlined: {
        borderRadius: "0.5em",
      },
    },
    /*
    MuiListItem: {
      root: {
        justifyContent: "center",
      },
    },
    MuiAccordion: {
      root: {},
    },
    MuiAccordionSummary: {
      root: {
        cursor: "default",
        "&:hover:not(.Mui-disabled)": {
          cursor: "default",
        },
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
    */
  },

  /* Accordion Shadow removed
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
    */
  /*
    MuiAccordion: {
      root: {},
    },
    MuiAccordionSummary: {
      root: {
        cursor: "default",
        "&:hover:not(.Mui-disabled)": {
          cursor: "default",
        },
      },
    },
    */
  /* Rounded Accordion removed
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
    */
  //},
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Auth0Provider
      domain={domainEnv}
      clientId={clientidEnv}
      redirectUri={window.location.origin + "/admin"} // this should be changed to a .env var when we have refactured the project and pipeline
      audience={apiurl}
    >
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey} language="no">
        <Router>
          <App />
        </Router>
      </GoogleReCaptchaProvider>
    </Auth0Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
