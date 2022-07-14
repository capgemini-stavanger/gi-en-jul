import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    emailButton: {
      paddingLeft: "10px",
    },
    emailText: {
      paddingTop: "6px",
    },
    mediumColumn: {
      flexBasis: "30%",
    },
    largeColumn: {
      flexBasis: "70%",
    },
    smallColumn: {
      flexBasis: "15%",
    },
    submitButton: {
      marginTop: "100px",
    },
    refreshButton: {
      marginTop: "15px",
    },
    clickableTableBody: {
      cursor: "pointer",
    },
    unpaddedTableCell: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    accordionContainer: {
      marginBottom: theme.spacing(1),
      border: "0.05px solid",
      borderColor: "#d3d3d354",
    },
    rightMiddleAlign: {
      position: "absolute",
      right: "0",
      top: "0",
      margin: "0.3em",
    },
    businessButton: {
      marginBottom: "20px",
      marginTop: "10px",
    },
    deleteButton: {
      marginLeft: "10px",
    },
    dialogBox: {
      marginLeft: "%",
    },
  })
);

export default useStyles;
