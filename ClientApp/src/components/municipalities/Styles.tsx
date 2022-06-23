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
  headLineContainer: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  sectionContainer: {
    marginTop: theme.spacing(3),
    padding: 0,
    maxWidth: "70em",
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
}));

export default useStyles;
