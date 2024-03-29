import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
    padding: theme.spacing(2),
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
  informationCard: {
    width: "280%",
    height: "80%",
  },
  headLineContainer: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  sectionContainer: {
    marginTop: theme.spacing(3),
    padding: 0,
    maxWidth: "80vw",
    wordWrap: "break-word",
  },
  municipalityItem: {
    maxWidth: "100%",
    objectFit: "cover",
    minWidth: "100%",
    justifyContent: "center",
    margin: theme.spacing(1),
  },
  municipalityHeader: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    fontSize: "200%",
    textAlign: "center",
  },
  municipalitySummary: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "2em",
    color: "white",
  },
  infoImageMobile: {
    objectFit: "cover",
    width: "200px",
    height: "200px",
    marginTop: "2em",
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },
  infoImage: {
    width: "250px",
    height: "300px",
    marginTop: "4em",
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    objectFit: "cover",
  },
}));

export default useStyles;
