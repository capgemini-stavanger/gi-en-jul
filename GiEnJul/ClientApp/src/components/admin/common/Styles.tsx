import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

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
    mediumColumn: {
      flexBasis: "30%",
    },
    largeColumn: {
      flexBasis: "70%",
    },
    smallColumn: {
      flexBasis: "15%",
    },
    buttonRefresh: {
      marginTop: "15px",
    },
    clickableTableBody: {
      cursor: "pointer",
    },
    unpaddedTableCell: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    accordionContainer:{
      marginBottom: theme.spacing(1), 
      border: "0.05px solid",
      borderColor: "#d3d3d354",
    },
  })
);

export default useStyles;
