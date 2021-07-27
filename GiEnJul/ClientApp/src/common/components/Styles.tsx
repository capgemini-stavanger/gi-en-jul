import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toTopButton: {
    position: "fixed",
    justifyContent: "center",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "white",
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  closeButton: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),

  },
  smallLogo: {
    height: "40px",
    width: "40px",
    margin: theme.spacing(-1.5)
  },
  drawerMenu: {
    backgroundColor: theme.palette.secondary.light,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "120%",
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  navContainer: {
    backgroundColor: "transparent",
    position: "fixed",
    border: "none",
    boxShadow: "none",
  },
  toolBar: {
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
  },
  navIcon: {
    color: theme.palette.primary.light,
    marginTop: theme.spacing(-1),
  },
  buttonNext: {
    position: "inherit",
    borderRadius: "20px",
    color: "white",
    backgroundColor: theme.palette.primary.light,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
export default useStyles;
