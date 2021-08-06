import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  giverForm: {
    paddingTop: theme.spacing(10),
    padding: theme.spacing(3),
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
  },
  summaryDesign: {
    backgroundColor: theme.palette.secondary.light,
    maxWidth: "none",
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
    fontSize: "170%",
    fontWeight: 500,
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("tablet")]: {
      fontSize: "200%",
    },
  },
  form: {
    width: "100%",
    display: "inline-flex",
    [theme.breakpoints.up("tablet")]: {
      height: "30em",
    },
  },
  buttons: {
    bottom: theme.spacing(2),
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  buttonBack: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
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
  infoText:{
    fontSize: "85%",
    fontWeight: 400,
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
    objectFit: "none",
    width: "100%",
    height: "100%",
    marginTop: -theme.spacing(4),
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
    height: "100%",
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
  captchaContainer:{
    paddingBottom:theme.spacing(8),
  }, 
  summaryInput:{
    marginBottom: "1.2em",
  }
}));
export default useStyles;
