import { makeStyles } from "@material-ui/core/styles";

export default () =>
  makeStyles((theme) => ({
    toTopButton: {
      position: "fixed",
      justifyContent: "center",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    closeButton: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(3),
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.primary.dark,
      },
    },
    smallLogo: {
      height: "40px",
      width: "40px",
      margin: theme.spacing(-1.5),
    },
    drawerMenu: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
    },
    drawerContent: {
      cursor: "pointer",
      fontSize: "120%",
      fontWeight: 600,
      "&:hover": {
        color: theme.palette.primary.dark,
        fontWeight: 700,
      },
    },
    navContainer: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      position: "fixed",
      border: "none",
      boxShadow: "none",
    },
    toolBar: {
      justifyContent: "space-between",
      marginTop: theme.spacing(1),
      [theme.breakpoints.up("tablet")]: {
        margin: theme.spacing(2),
      },
      [theme.breakpoints.up("laptop")]: {
        margin: theme.spacing(3),
      },
    },
    navIcon: {
      color: theme.palette.primary.light,
      marginTop: theme.spacing(-1),
    },
    buttonNext: {
      position: "inherit",
      color: "white",
      backgroundColor: theme.palette.primary.main,
      textTransform: "none",
      padding: theme.spacing(1.5, 2, 1.5, 2),
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    footerText: {
      textAlign: "center",
      color: theme.palette.primary.main,
      padding: theme.spacing(3),
      fontSize: "100%",
      fontWeight: 500,
    },
  }))();
