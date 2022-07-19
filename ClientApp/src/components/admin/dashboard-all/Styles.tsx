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
    backgroundColor: "#f4f5f4",
    flexShrink: 0,
    padding: "1em",
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
    height: "600px",
  },
  dashboardConnectBox: {
    display: "flex",
    flexDirection: "row",
  },
  dashBoardConnection: {
    flexGrow: 1,
    height: "100px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f5f4",
    padding: "1em",
  },
  giverTable: {
    flexGrow: 1,
    marginRight: "1em",
    backgroundColor: "#f4f5f4",
    borderRadius: "1em",
    paddingTop: "1em",
  },
  recipientTable: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f4f5f4",
    borderRadius: "1em",
    paddingTop: "1em",
  },
  suggestionData: {
    flexGrow: 1,
  },
  recipientData: {
    flexGrow: 1,
  },
  accordionNormal: {
    backgroundColor: "#f4f5f4",
  },
  accordionSelected: {
    backgroundColor: theme.palette.primary.light,
  },
  tableHeadingSpace: {
    marginBottom: "1em",
  },
  gridBoxCenter: {
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
    paddingTop: "1em",
  },
  commentField: { width: "250px" },
  commentBoxButton: {
    marginLeft: "0.5em",
    borderRadius: "0.5em",
    height: "1.6em",
    width: "1em",

    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  gridBoxLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gridBoxRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputSmall: {
    width: "100px",
    height: "40px",
  },
}));

export default useStyles;
