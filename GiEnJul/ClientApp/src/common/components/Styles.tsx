import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

  },
  smallLogo: {
    height: "40px",
    width: "40px",
    margin: theme.spacing(-1.5)
  },
  drawerMenu: {
    backgroundColor: theme.palette.secondary.light,
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
    [theme.breakpoints.up("tablet")]:{
      margin: theme.spacing(2)
    }, 
    [theme.breakpoints.up("laptop")]:{
      margin: theme.spacing(3)
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
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.up("tablet")]:{
      padding: theme.spacing(1.5,2,1.5,2),
    }, 
    [theme.breakpoints.up("laptop")]:{
      padding: theme.spacing(2,2.5,2,2.5),
    },
    [theme.breakpoints.up("tablet")]:{
      padding: theme.spacing(1.5,2,1.5,2),
    }, 
    [theme.breakpoints.up("laptop")]:{
      padding: theme.spacing(2,2.5,2,2.5),
    },
  },
}));
export default useStyles;
