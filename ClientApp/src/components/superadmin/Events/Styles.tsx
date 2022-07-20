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
}));
export default useStyles;
