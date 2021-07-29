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
<<<<<<< HEAD
    [theme.breakpoints.up("tablet")]:{
      margin: theme.spacing(2)
    }, 
    [theme.breakpoints.up("laptop")]:{
      margin: theme.spacing(3)
    }, 
=======
>>>>>>> master
  },
  navIcon: {
    color: theme.palette.primary.light,
    marginTop: theme.spacing(-1),
  },
  buttonNext: {
    position: "inherit",
    color: "white",
    backgroundColor: theme.palette.primary.light,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
<<<<<<< HEAD
    [theme.breakpoints.up("tablet")]:{
      padding: theme.spacing(1.5,2,1.5,2),
    }, 
    [theme.breakpoints.up("laptop")]:{
      padding: theme.spacing(2,2.5,2,2.5),
    },
=======
>>>>>>> master
  },
}));
export default useStyles;
