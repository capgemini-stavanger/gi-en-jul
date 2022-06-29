import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.secondary.light,
      backgroundSize: "cover",
      padding: theme.spacing(2),
    },
    logo: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(2),
      maxHeight: "15em",
      [theme.breakpoints.up("tablet")]: {
        maxHeight: "18em",
      },
    },
    textLink:{
      textDecorationLine: 'underline',
      cursor: 'pointer'
    },
    familyImage:{
      justifySelf: "center",
      zIndex: 2,
      width: "100%",
      height: "100%",
      position: "relative",
      objectFit: "cover",
  
    },
    snowDown:{
      marginTop: -theme.spacing(8),
      marginBottom: -theme.spacing(15),
      objectFit: "cover",
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("tablet")]: {
        marginBottom: -theme.spacing(30),
      },
      [theme.breakpoints.up("laptop")]: {
        marginBottom: -theme.spacing(35),
      },
    },
    textHeadline: {
      color: theme.palette.primary.main,
      fontSize: "180%",
      fontWeight: 500,
      textAlign: "center",
      margin: theme.spacing(1),
      [theme.breakpoints.up("tablet")]: {
        fontSize: "200%",
        margin: theme.spacing(4),
      },
    },
    blueTextHeadline: {
      color: "#698BAC",
      fontSize: "180%",
      textAlign: "center",
      fontWeight: 500,
      [theme.breakpoints.up("tablet")]: {
        fontSize: "200%",
      },
    },
    greenTextHeadLine: {
      color: "#69A386",
      fontSize: "180%",
      textAlign: "center",
      fontWeight: 500,
      [theme.breakpoints.up("tablet")]: {
        fontSize: "200%",
      },
    },
    headLineContainer: {
      textAlign: "center",
      margin: theme.spacing(1),
    },
    sectionContainer: {
      marginTop: theme.spacing(3),
      padding: 0,
      maxWidth: "70em",
    },
    imgContainer:{
        overflow: "hidden",
        height: "100%",
    },
    paragraph: {
        fontSize: "110%",
        textAlign: "center",
        fontWeight: 600,
        color: theme.palette.text.secondary,
        margin: theme.spacing(1),
        [theme.breakpoints.up("tablet")]: {
          fontSize: "120%",
        },
    },
      textContainer:{
        maxWidth: "30em",
        textAlign: "center",
        margin: theme.spacing(1),
        [theme.breakpoints.up("laptop")]: {
          maxWidth: "51em",
          margin: theme.spacing(4),
        },
    },
    municipalityItem: {
        maxWidth: "100%",
        objectFit: "cover",
        minWidth: "100%",
        justifyContent: "center",
        margin: theme.spacing(1),
    },
    municipalityHeader: {
        color: theme.palette.primary.main,
        padding: theme.spacing(1.5),
        fontSize: "200%",
        textAlign: "center",
    },
    municipalitySummary: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "2em",
      color: "white",

    }
}));

export default useStyles;
   


