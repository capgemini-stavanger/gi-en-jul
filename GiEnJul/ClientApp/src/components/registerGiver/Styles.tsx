import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  giverForm: {
    paddingTop: theme.spacing(10),
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
    maxWidth: '500px',
  },
  summaryDesign: {
    backgroundColor: theme.palette.secondary.light,
    maxWidth: 'none',
    minHeight: '100vh',
    },
  heading: {
    color: theme.palette.primary.main,
    fontSize: '150%', 
    fontWeight: 500,
    margin: theme.spacing(1),
  },
  headingBold: {
    color: theme.palette.primary.main,
    fontSize: '200%', 
    fontWeight: 600,
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  subHeading: {
    fontSize: '200%', 
    fontWeight: 500,
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  form: {
    width: '100%',
    height: '26em',
    maxHeight: '26em',
    display: 'inline-flex',
  },
  buttons: {
    bottom: 0,
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  buttonBack:{
    color: theme.palette.primary.main,
    padding: theme.spacing(1.1),
    textTransform: 'none'
  },
  buttonNext:{
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1.1),
    textTransform: 'none',
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    }
  },
  paragraph: {
    fontSize: '110%', 
    fontWeight: 400,
    margin: theme.spacing(1),
  },
  paragraphBold: {
    fontSize: '110%', 
    fontWeight: 600,
    marginLeft: theme.spacing(1),
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.light,

  },
  inputRow: {
    margin: theme.spacing(2, 2, 0, 0),
    width: '100%'
  },
}));
export default useStyles;
