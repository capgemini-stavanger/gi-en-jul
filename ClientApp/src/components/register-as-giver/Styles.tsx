import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fillBackground: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    padding: theme.spacing(2),
    height: "100vh",
  },

  giverFormBackground: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    minHeight: "100vh",
    height: "100%",
  },

  verifyDenyConnectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  giverForm: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "evenly",
    maxWidth: "500px",
    minHeight: "calc(100vh - 120px)",
  },
  summaryDesign: {
    backgroundColor: theme.palette.secondary.light,
    maxWidth: "500px",
    minHeight: "100vh",
  },
  heading: {
    color: theme.palette.primary.main,
    fontSize: "150%",
    fontWeight: 500,
    margin: theme.spacing(1),
  },
  headingBold: {
    color: theme.palette.primary.main,
    fontSize: "150%",
    fontWeight: 600,
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  subHeading: {
    fontSize: "130%",
    fontWeight: 500,
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    [theme.breakpoints.up("tablet")]: {
      fontSize: "160%",
    },
  },
  form: {
    width: "100%",
    display: "inline-flex",
    gap: ".5rem",
    marginTop: "3rem",
  },
  buttons: {
    bottom: theme.spacing(2),
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  buttonBack: {
    color: theme.palette.error.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
  },
  buttonStep: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    borderColor: theme.palette.primary.main,
  },
  buttonNext: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  buttonBoxGiverFormMobile: {
    position: "relative",
    marginLeft: "3em",
    marginTop: "1em",
  },

  buttonMainPage: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  paragraph: {
    fontSize: "90%",
    fontWeight: 500,
    margin: theme.spacing(1),
    [theme.breakpoints.up("tablet")]: {
      fontSize: "110%",
    },
  },
  paragraphBold: {
    fontSize: "90%",
    fontWeight: 700,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("tablet")]: {
      fontSize: "110%",
    },
  },
  infoText: {
    fontSize: "85%",
    fontWeight: 400,
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.light,
  },
  inputRow: {
    margin: theme.spacing(2, 2, 0, 0),
    width: "100%",
  },
  backgroundImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    maxWidth: "75rem",
  },
  imageContainer: {
    height: "100vh",
    margin: -theme.spacing(2),
    marginBottom: 0,
  },
  imageSnow: {
    marginTop: -theme.spacing(12),
    marginBottom: -theme.spacing(30),
    objectFit: "none",
    width: "100%",
    maxWidth: "75rem",
  },
  smallLogo: {
    height: "60px",
    width: "60px",
    position: "fixed",
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
  rightMiddleAlign: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "0.3em",
  },
  policyTitle: {
    overflowWrap: "break-word",
    marginRight: "1.6em",
  },
  captchaContainer: {
    paddingBottom: theme.spacing(8),
  },
  summaryInput: {
    marginBottom: "1.2em",
  },
  stepperBox: {
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "2em",
  },
  stepperBoxMobile: {
    width: "100%",
    paddingTop: "6em",
    marginLeft: "auto",
    marginRight: "auto",
  },

  stepperBackground: {
    backgroundColor: theme.palette.secondary.light,
  },
  feedbackField: {
    width: "300px",
    marginBottom: "2em",
    marginTop: "2em",
  },
  spacingBottom: {
    marginBottom: "2em",
  },
}));
export default useStyles;
