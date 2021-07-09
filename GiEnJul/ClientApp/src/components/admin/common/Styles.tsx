import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
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
    matched: {
      color: "#fff",
      backgroundColor: green[500],
    },
    notMatched: {
      color: "#FF0000",
      backgroundColor: red[500],
    },
  })
);

export default useStyles;