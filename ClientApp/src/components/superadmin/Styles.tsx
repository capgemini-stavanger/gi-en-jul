import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    dropdown: {
      width: "200px",
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
      width: "500px",
      margin: "auto",
    },
    table: {
      backgroundColor: theme.palette.primary.light,
    },
    tableBody: {
      backgroundColor: theme.palette.secondary.light,
    },
    tableHeaderText: {
      color: "white",
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
    infoImage: {
      width: "250px",
      height: "300px",
      marginTop: "4em",
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
      objectFit: "cover",
    },
    smallImage: {
      width: "65px",
      height: "65px",
      objectFit: "cover",
      borderRadius: "50%",
      margin: "auto auto auto 5px",
    },
  })
);

export default useStyles;
