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
}));

export default useStyles;
