import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  newBoxBackgorund: {
    backgroundColor: theme.palette.secondary.light,
    border: "1px solid black",
  },
  eventContainers: {
    margin: "3%",
  },
  eventBox: {
    margin: "1%",
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonError: {
    color: "white",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));
export default useStyles;
