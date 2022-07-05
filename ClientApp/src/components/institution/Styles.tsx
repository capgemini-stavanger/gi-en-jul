import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7),
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
  divider: {
    background: theme.palette.primary.light,
  },
}));

export default useStyles;
