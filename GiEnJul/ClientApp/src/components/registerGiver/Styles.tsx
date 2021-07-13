import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  iconSelector: {
    alignItems: "center",
    margin: theme.spacing(1, 1, 1, 0),
    justifyContent: "center",
  },
  iconTexField: {
    alignItems: "center",
    margin: theme.spacing(1, 0, 1, 0),
    justifyContent: "center",
  },
  inputRow: {
    margin: theme.spacing(2, 2, 0, 0),
  },
}));
export default useStyles;
