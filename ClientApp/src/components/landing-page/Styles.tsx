import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    padding: theme.spacing(4),
  },
  rootNavBarPages: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    height: "100vh",
    padding: theme.spacing(4),
  },
  rootWhite: {
    backgroundColor: "white",
    padding: theme.spacing(4),
  },
  rootGreen: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(4),
  },
  whiteBackground: {
    backgroundColor: "white",
  },
  logo: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    height: "10em",
    [theme.breakpoints.up("tablet")]: {
      maxHeight: "18em",
    },
  },
  textLink: {
    textDecorationLine: "underline",
    cursor: "pointer",
  },
  familyImage: {
    justifySelf: "center",
    zIndex: 2,
    width: "100%",
    height: "100%",
    position: "relative",
    objectFit: "cover",
  },
  snowDown: {
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
    width: "auto",
    marginTop: theme.spacing(3),
    padding: 0,
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
    margin: theme.spacing(1),
    marginBottom: "0",
    width: "100%",
  },

  questionBox: {
    width: "100%",
  },
  questionSummary: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
  },
  questionText: { fontWeight: 700, fontSize: "20px" },
  questionDetails: {
    paddingTop: "1em",
    backgroundColor: theme.palette.secondary.light,
    color: "black",
  },
  imgContainer: {
    overflow: "hidden",
    height: "100%",
  },
  stepsImage: {
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
  textContainer: {
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
  cardContainer: {
    width: "260px",
    height: "310px",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
  },
  cardInfo: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardImage: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  iconText: {
    display: "inline",
    color: "black",
    textDecoration: "underline",
    textDecorationColor: "black",
  },
  smallIcon: {
    marginRight: "5px",
  },
  giverButton: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "40px",
    width: "120px",
    textTransform: "none",
    padding: theme.spacing(1.5, 2, 1.5, 2),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  infoBoxCircleText: {
    position: "relative",
    top: "60%",
    left: "-13%",
    fontSize: "2.5rem",
    color: theme.palette.primary.main,
    fontWeight: 500,
  },

  infoBoxCircle: {
    position: "static",
    height: "2.5em",
    width: "2.5em",
    color: theme.palette.secondary.main,
  },

  contactSpacing: {
    marginBottom: "2em",
  },
  wavedBoxGreen: {
    marginTop: "-1px",
  },
  wavedBoxWhite: {
    backgroundColor: theme.palette.secondary.light,
    marginBottom: "-1px",
  },
}));

export default useStyles;
