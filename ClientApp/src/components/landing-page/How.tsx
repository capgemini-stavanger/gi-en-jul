import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import step1 from "styling/img/step1.webp";
import step2 from "styling/img/step2.webp";
import step3 from "styling/img/step3.webp";
import { FiberManualRecord } from "@material-ui/icons";

const How = () => {
  const classes = useStyles();

  const allTheInfo = [
    [
      'Registrer deg som giver alene, med venner, familie eller kolleger via "Bli giver" knappen øverst på denne siden.',
      step1,
    ],
    [
      "Når julen nærmer seg, får du tildelt en anonym familie som du handler til. Du mottar en liste med gaveønsker og hva de ønsker å spise.",
      step2,
    ],
    [
      "På innsamlingsdagen leverer du esken på angitt sted. Barnevernet og andre kjører så eskene ut til familiene.",
      step3,
    ],
  ];

  return (
    <Container id="how" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.blueTextHeadline}>Hvordan fungerer Gi en jul?</Typography>
      </div>
      <Grid container justifyContent="center" alignItems="flex-start">
        {allTheInfo.map((info, index) => (
          <Grid item key={index} className={classes.howItem}>
            <div className={classes.imgContainer}>
              <img className={classes.stepsImage} src={info[1]}></img>
            </div>
            <div className={classes.headLineContainer}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography className={classes.infoBoxCircleText}>{index + 1}</Typography>
                  <FiberManualRecord className={classes.infoBoxCircle} />
                </Grid>
              </Grid>
              <div className={classes.textContainer}>
                <Typography className={classes.paragraph}>{info[0]}</Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default How;
