import { makeStyles } from "@material-ui/core/styles";

export default () =>
  makeStyles((theme) => ({
    toTopButton: {
      position: "fixed",
      justifyContent: "center",
      bottom: theme.spacing(3),
      right: theme.spacing(4),
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
      position: "absolute",
      height: "35px",
      width: "35px",
      margin: theme.spacing(-1.5),
    },
    logoBliGiverContainer: { position: "relative" },

    smallLogoBliGiver: {
      position: "relative",
      left: "-37px",
      height: "35px",
      width: "35px",
      backgroundcolor: theme.palette.primary.dark,
      margin: theme.spacing(-1.5),
    },
    treeGridIcon: { marginLeft: "5px" },
    treeCircle: {
      position: "relative",
      height: "65px",
      width: "65px",
      color: theme.palette.primary.main,
    },
    treeCircleBliGiver: {
      height: "65px",
      width: "65px",
      color: "white",
    },

    drawerMenu: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
    },
    drawerContent: {
      cursor: "pointer",
      fontSize: "75%",

      color: "black",
      "&:hover": {
        color: theme.palette.primary.dark,
        fontWeight: 1000,
      },
    },
    navContainer: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      justifyContent: "space-between",
      position: "absolute",
      top: "-5%",
      marginLeft: "19%",
      border: "none",
      boxShadow: "none",
      padding: theme.spacing(2),
    },
    navBarGridContainer: {
      height: "75px",
      backgroundColor: "white",
      borderBottom: "1 px solid rgba(217, 217, 217, 0.01)",
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
    giverButton: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      height: "40px",
      width: "120px",
      textTransform: "none",
      padding: theme.spacing(1.5, 2, 1.5, 2),
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    giverButtonGridItem: {
      marginRight: "14px",
    },
    buttonNext: {
      position: "inherit",
      color: "white",
      height: "40px",
      width: "110px",
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
    confirmationBoxButton: {
      paddingLeft: "10px",
    },
    navbarBackground: {
      backgroundColor: "white",
    },

    fontSizeNavText: {
      fontSize: "20px",
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
    popupContainer: {
      width: "400px",
      minHeight: "150px",
      justifyContent: "space-between",
      // border: "2px solid black",
      // borderRadius: "40px",
    },
    popupText: {
      padding: "20px",
      // color: "black",
      color: theme.palette.primary.main,
      fontSize: "20px",
      fontWeight: 800,
    },
    navContainerMobile: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      position: "absolute",
      border: "none",
      boxShadow: "none",
      padding: theme.spacing(2),
    },
  }))();
