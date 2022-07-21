import { Typography, Container, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import step1 from "styling/img/step1.svg";
import step2 from "styling/img/step2.svg";
import step3 from "styling/img/step3.svg";

const How = () => {
  const classes = useStyles();
  return (
    <Container id="how" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.blueTextHeadline}>
          Hvordan fungerer <br /> Gi en jul?
        </Typography>
      </div>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step1}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>Steg 1 </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                Registrer deg som giver alene, med venner, familie eller kolleger via “Bli giver”
                knappen øverst på denne siden.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step2}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>Steg 2 </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                Når julen nærmer seg, får du tildelt en anonym familie som du handler til. Du mottar
                en liste med gaveønsker og hva de ønsker å spise.
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step3}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>Steg 3 </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                På innsamlingsdagen leverer du esken et angitt sted, og barnevernet og andre kjører
                eskene ut til familiene.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default How;
