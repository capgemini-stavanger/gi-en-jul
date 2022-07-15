import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
  searchField: {
    marginBottom: theme.spacing(1),
  },
  textWarning: {
    fontWeight: 400,
    color: theme.palette.error.main,
    fontSize: "130%",
  },
  statisticsContainer: {
    position: "fixed",
    marginTop: -theme.spacing(8),
    [theme.breakpoints.up("desktop")]: {
      marginTop: -theme.spacing(2),
    },
  },
  infoContainer: {
    margin: theme.spacing(1.5),
    [theme.breakpoints.up("desktop")]: {
      margin: theme.spacing(3),
    },
  },
  explanationContainer: {
    margin: theme.spacing(1.5),
    marginTop: theme.spacing(6),
    [theme.breakpoints.up("desktop")]: {
      margin: theme.spacing(3),
    },
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 400,
    backgroundColor: "#e6e6e6",
    border: "2px solid #000",
    margin: theme.spacing(5),
    padding: theme.spacing(1.5),
  },

  // New styles
  entireDashboard: {
    display: "flex",
    flexDirection: "row",
  },
  oversiktBox: {
    width: "200px",
    height: "800px",
    backgroundColor: "green",
    flexShrink: 0,
  },
  dashboardBox: {
    flexGrow: 1,
  },
  infoBox: {
    display: "flex",
    flexDirection: "row",
    height: "300px",
  },
  tableBox: {
    display: "flex",
    flexDirection: "row",
    height: "500px",
  },
  dashboardInfo: {
    flexGrow: 1,
  },
  dashboardConnectBox: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dashBoardConnection: {
    backgroundColor: "gray",
    width: "400px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  giverTable: {
    flexGrow: 1,
    backgroundColor: "pink",
    marginRight: "1em",
    overflow: "scroll",
  },
  recipientTable: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  test1: {
    backgroundColor: "yellow",
    flexGrow: 1,
  },
  test2: {
    backgroundColor: "pink",
    flexGrow: 1,
  },
  accordionNormal: {
    backgroundColor: "gray",
  },
  accordionSelected: {
    backgroundColor: "green",
  },
}));

export default useStyles;
