import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "../../common/functions/IsMobile";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  circle: {
    borderRadius: "50%",
    margin: theme.spacing(9, 2, 2, 2),
    padding: theme.spacing(3.5),
    backgroundColor: "white",
    width: "40%",
    position: "static",
    "&:after":{
      content: "",
      display: "block",
      paddingBottom: "100%",
    },
    [theme.breakpoints.up("tablet")]: {
      width: "30%",
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up("laptop")]: {
      width: "20%",
      padding: theme.spacing(4),
    },
  },
  logoLarge: {
    content: "absolute",
    width: "100%",
    heigth: "100%",
    minWidth: "3em",
    minHeigth: "4em",
    display: "block",
    [theme.breakpoints.up("tablet")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(0.7),
    },
    [theme.breakpoints.up("laptop")]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(2),
    },
  },
  logoText: {
    color: theme.palette.primary.main,
    fontSize: "250%",
    fontWeight: 500,
  },
  textHeadline: {
    color: theme.palette.primary.main,
    fontSize: "180%",
    fontWeight: 500,
    [theme.breakpoints.up("tablet")]: {
      fontSize: "200%",
    },
  },
  headLineContainer: {
    textAlign: "center",
    margin: theme.spacing(1),
    [theme.breakpoints.up("tablet")]: {
      margin: theme.spacing(4),
    },
  },
  sectionContainer: {
    marginTop: theme.spacing(3),
    padding: 0,
    maxWidth: "70em",
  },
  howItem: {
    backgroundColor: "white",
    margin: theme.spacing(2),
    borderRadius: "2em",
    maxWidth: "100%",
    objectFit: "cover",
    display: "stretch",

    [theme.breakpoints.up("tablet")]: {
      maxWidth: "33.3%",
      margin: theme.spacing(3),
    },
    [theme.breakpoints.up("laptop")]: {
      maxWidth: "25%",
      margin: theme.spacing(4),
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
  howText: {
    objectFit: "cover",
    MaxHeight: "100%",
    padding: theme.spacing(2),
  },
  card: {
    justifyContent: "space-between",
    padding: 0,
    overflow: "hidden",
    height: "100%",
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
  nextIcon: {
    color: theme.palette.primary.main,
    margin: "auto",
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
