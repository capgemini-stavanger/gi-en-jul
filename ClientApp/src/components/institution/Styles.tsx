import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7),
    maxWidth: theme.breakpoints.values.desktop,
  },
  customTooltip: {
    backgroundColor: "rgb(224, 243, 244)",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "large",
    padding: "15px",
    margin: "auto",
  },
  suggestionPopover: {
    padding: "15px",
    margin: "auto",
  },
  gridDivider: {
    background: theme.palette.primary.light,
  },
  wholeButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: "150px",
  },
  hollowButton: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    width: "150px",
    borderColor: theme.palette.primary.main,
  },
  smallWidth: {
    width: "70px",
  },
  mediumWidth: {
    width: "150px",
  },
  greenHeart: {
    color: theme.palette.primary.main,
    fontSize: "3em",
  },
  greenBox: {
    backgroundColor: theme.palette.secondary.main,
    width: "450px",
    height: "160px",
    borderRadius: "2em",
    padding: "20px",
  },
  formInfoBoxText: {
    fontSize: "1.2rem",
    color: theme.palette.primary.dark,
  },
  infoBoxCircle: {
    position: "static",
    color: theme.palette.secondary.main,
  },
  infoBoxCircleText: {
    position: "relative",
    top: "60%",
    left: "20%",
    fontSize: "1.5rem",
    color: theme.palette.primary.dark,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "2.5rem",
    paddingBottom: "15px",
    marginLeft: "20px",
  },

  // New Attempt
  personBox: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "1em",
  },
  numberBox: {
    width: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    borderRadius: "2px",
  },
  formBox: {
    backgroundColor: "#F4F4F4",
    flexGrow: 1,
    marginLeft: "10px",
    borderRadius: "2px",
  },
  formBoxHeader: {
    height: "150px",
    display: "flex",
    alignItems: "center",
  },
  formBoxWishes: {},
  wishSpacing: {
    marginBottom: "1em",
  },
  wishNumberCircle: {
    padding: "3px",
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  wishNumber: {
    color: "white",
    fontSize: "24px",
  },
}));

export default useStyles;
