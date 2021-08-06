import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    padding: theme.spacing(2),
  },
  logo: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    maxHeight: "15em",
    [theme.breakpoints.up("tablet")]: {
      maxHeight: "18em",
    },
  },
  familyImage:{
    justifySelf: "center",
    zIndex: 2,
    width: "100%",
    height: "100%",
    position: "relative",
    objectFit: "cover",

  },
  snowDown:{
    marginTop: -theme.spacing(8),
    marginBottom: -theme.spacing(15),
    objectFit: "cover",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("tablet")]: {
      marginBottom: -theme.spacing(30),
    },
    [theme.breakpoints.up("laptop")]: {
      marginBottom: -theme.spacing(35),
    },
  },
  textHeadline: {
    color: theme.palette.primary.main,
    fontSize: "180%",
    fontWeight: 500,
    textAlign: "center",
    margin: theme.spacing(1),
    [theme.breakpoints.up("tablet")]: {
      fontSize: "200%",
      margin: theme.spacing(4),
    },
  },
  blueTextHeadline: {
    color: "#698BAC",
    fontSize: "180%",
    fontWeight: 500,
    [theme.breakpoints.up("tablet")]: {
      fontSize: "200%",
    },
  },
  headLineContainer: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  sectionContainer: {
    marginTop: theme.spacing(3),
    padding: 0,
    maxWidth: "70em",
  },
  howItem: {
    maxWidth: "100%",
    objectFit: "cover",
    display: "stretch",
    [theme.breakpoints.up("laptop")]: {
      maxWidth: "33%",
    },
  },
  questionItem: {
    width: "80%",
    margin: theme.spacing(1),
    [theme.breakpoints.up("laptop")]: {
      width: "48%",
    },
  },
  questionBox: {
    width: "100%",
  },
  questionSummary: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "2em",
    color: "white",
  },
  imgContainer:{
    overflow: "hidden",
    height: "100%",
  },
  stepsImage:{
    objectFit: "none",
    width: "346px", 
    height: "278px",
    margin: "auto", 
    display: "block",
  },
  paragraph: {
    fontSize: "110%",
    textAlign: "center",
    fontWeight: 600,
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    [theme.breakpoints.up("tablet")]: {
      fontSize: "120%",
    },
  },
  textContainer:{
    maxWidth: "30em", 
    textAlign: "center",
    margin: theme.spacing(1),
    [theme.breakpoints.up("laptop")]: {
      maxWidth: "51em",
      margin: theme.spacing(4),
    },
  },
  howImage: {
    objectFit: "cover",
    MaxHeight: "100%",
    width: "100%",
    height: "8em",
    padding: theme.spacing(0),
    bottom: theme.spacing(0),
    display: "flex",
    alignItems: "flex-end",
  },
  contactHeader: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: theme.spacing(1.5),
    fontSize: "140%",
    textAlign: "center",
  },
  contactCard: {
    width: "100%",
  },
  contactContent: {
    textAlign: "center",
    padding: theme.spacing(0.2),
    justifyContent: "center",
  },
  mailIcon: {
    marginRight: theme.spacing(1),
  },
  contactItem: {
    maxWidth: "18em",
    objectFit: "cover",
    margin: theme.spacing(2),
    minWidth: "16em",
    [theme.breakpoints.up("tablet")]: {
      width: "30%",
    },
    [theme.breakpoints.up("laptop")]: {
      width: "20%",
    },
  },
}));

export default useStyles;
