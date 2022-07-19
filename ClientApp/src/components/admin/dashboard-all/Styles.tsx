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
    height: "700px",
    backgroundColor: "#DBEDE9",
    flexShrink: 0,
  },
  dashboardBox: {
    flexGrow: 1,
  },
  infoBox: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2em",
  },
  tableBox: {
    display: "flex",
    flexDirection: "row",
    height: "500px",
  },
  dashboardConnectBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dashBoardConnection: {
    flexGrow: 1,
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E2E2",
  },
  giverTable: {
    flexGrow: 1,
    marginRight: "1em",
  },
  recipientTable: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E3E2E2",
    borderRadius: "1em",
    padding: "1em",
  },
  suggestionData: {
    marginBottom: "1em",
    height: "200px",
  },
  recipientData: {
    flexGrow: 1,
  },
  accordionNormal: {
    backgroundColor: "#DBEDE9",
  },
  accordionSelected: {
    backgroundColor: theme.palette.primary.light,
  },
  tableHeadingSpace: {
    marginBottom: "1em",
  },
  gridBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  borderInCards: {
    borderTop: "1px solid rgba(0, 0, 0, 0.15)",
  },
  underlineText: {
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  commentBox: {
    display: "inline-block",
    right: "2%",
    bottom: "2%",
  },
  commentField: { width: "250px" },
  commentBoxButton: {
    position: "sticky",
    right: "2%",
    bottom: "2%",
    borderRadius: "0.5em",
    height: "1.6em",
    width: "1em",
    marginBottom: "0.3em",
    marginRight: "0.3em",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
