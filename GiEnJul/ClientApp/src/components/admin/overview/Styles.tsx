import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  waitingButton: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.5),
    position: "fixed",
    justifyContent: "center",
    bottom: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: 1,
    backgroundColor: "white",
    border: "2px solid",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  finishedButton: {
    position: "fixed",
    justifyContent: "center",
    bottom: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: 1,
    color: "white",
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1.5),
    boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  searchField:{
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
