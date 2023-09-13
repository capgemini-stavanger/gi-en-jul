import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7),
    maxWidth: theme.breakpoints.values.desktop,
  },
  mobileRoot: {
    padding: 0,
    maxWidth: "100dvw",
    overflow: "hidden",
  },
  customTooltip: {
    backgroundColor: "rgb(224, 243, 244)",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "large",
    padding: "15px",
    margin: "auto",
  },
  suggestionPopover: {
    padding: "15px",
    margin: "auto",
  },
  gridDivider: {
    background: theme.palette.primary.light,
    minHeight: "1px",
    minWidth: "1px",
  },
  wholeButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: "150px",
  },
  hollowButton: {
    color: theme.palette.primary.main,
    padding: theme.spacing(1.2),
    marginBottom: "1em",
    textTransform: "none",
    width: "150px",
    borderColor: theme.palette.primary.main,
  },
  smallWidth: {
    width: "70px",
  },
  mediumWidth: {
    justifyContent: "align",
    width: "150px",
  },
  greenHeart: {
    color: theme.palette.primary.main,
    fontSize: "3em",
  },
  greenBox: {
    backgroundColor: theme.palette.secondary.main,
    width: "450px",
    height: "160px",
    borderRadius: "2em",
    padding: "20px",
  },
  greenBoxMobile: {
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    borderRadius: "2em",
    padding: "8px",
  },
  formInfoBoxText: {
    fontSize: "1.2rem",
    color: theme.palette.primary.dark,
  },
  infoBoxCircle: {
    position: "static",
    color: theme.palette.secondary.main,
  },
  infoBoxCircleText: {
    position: "relative",
    top: "60%",
    left: "20%",
    fontSize: "1.5rem",
    color: theme.palette.primary.dark,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "2.5rem",
    paddingBottom: "15px",
    marginLeft: "20px",
  },
  personBox: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "1em",
  },
  personBoxMobile: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "0.5em",
  },
  numberBox: {
    marginRight: "-2px",
    width: "100px",
    height: "156px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    borderRadius: "2px",
    fontSize: "30px",
  },
  numberBoxMobile: {
    marginBottom: "-1px",
    width: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    borderRadius: "2px",
    fontSize: "20px",
  },
  formBox: {
    flexGrow: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primary.dark,
    position: "relative",
    borderRadius: "2px",
  },
  formBoxMobile: {
    padding: "8px",
  },
  hideParent: {
    display: "flex",
  },
  hideBox: {
    flexGrow: 1,
    justifyContent: "right",
  },
  hideButton: {
    marginRight: "-15px",
  },
  deleteBox: {
    width: "100px",
    height: "156px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBoxHeader: {
    height: "150px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  formBoxWishes: {
    margin: "16px 0 0",
  },
  wishSpacing: {
    marginBottom: "1em",
  },
  wishSpacingMobile: {
    padding: "8px 0 8px",
    rowGap: "20px",
    marginTop: "-2px",
    borderBottom: "2px solid " + theme.palette.primary.light,
  },
  wishNumberCircle: {
    padding: "3px",
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.dark,
  },
  wishNumber: {
    color: "white",
    fontSize: "24px",
  },
  redCross: {
    color: theme.palette.error.main,
    fontSize: "1.5em",
  },
  redCrossMobile: {
    color: theme.palette.error.main,
    fontSize: "1em",
  },
  boxOverflow: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  smallRedCross: {
    color: theme.palette.error.main,
    fontSize: "1.6em",
  },
  confirmIcon: {
    color: "green",
  },
  waitingIcon: {
    color: "#ffaf03",
  },
  noneIcon: {
    color: "red",
  },
  sectionGridItem: {},
  sectionGridItemMobile: {
    width: "100%",
    padding: "12px 4px 16px",
  },
  contactInput: {},
  contactInputMobile: {
    width: "100%",
  },
  foodInput: {
    height: "100%",
  },
  foodInputContainer: {
    width: "100%",
    minHeight: "85px",
  },
}));

export default useStyles;
