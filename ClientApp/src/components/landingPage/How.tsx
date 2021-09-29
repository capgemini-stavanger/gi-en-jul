import * as React from "react";
import { Typography, Container, Grid, Card } from "@material-ui/core";
import useStyles from "./Styles";
import { ExpandMore } from "@material-ui/icons";
import step1 from "./../../styling/img/step1.svg";
import step2 from "./../../styling/img/step2.svg";
import step3 from "./../../styling/img/step3.svg";

const How = () => {
  const classes = useStyles();
  return (
    <Container id="how" className={classes.sectionContainer}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <div className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>
            Hva er <br /> Gi en jul?
          </Typography>
          <ExpandMore color="primary" />
          <div className={classes.textContainer}>
            <Typography className={classes.paragraph}>
              Gi en jul er et frivillig prosjekt i samarbeid med blant andre
              barnevernet og NAV. <br />
              Som giver gir du julemiddag og julegaver til
              en familie som virkelig trenger det. Dette er foreldre og barn som
              ikke selv har mulighet til å kjøpe en skikkelig julemiddag,
              julesnop eller julegaver til hverandre. I år kan du melde deg som giver i Gjesdal, 
              Sandnes, Sola eller Stavanger.
            </Typography>
          </div>
        </div>
      </Grid>
      <div className={classes.headLineContainer}>
        <Typography className={classes.blueTextHeadline}>
          Hvordan fungerer <br /> Gi en jul?
        </Typography>
        {/* <ExpandMore />
        <Typography className={classes.paragraph}>
        Gi en jul er et veldedighets-prosjekt i samarbeid med blant andre
          barnevernet og NAV.
        </Typography>
        <Typography className={classes.paragraph}>
          Som giver til “Gi en jul” donerer du julemiddag og
          julegaver til en familie som virkelig trenger det. Dette er foreldre
          og barn som ikke selv har mulighet til å kjøpe en skikkelig
          julemiddag, julesnop eller julegaver til hverandre.
        </Typography> */}
      </div>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step1}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 1{" "}
            </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                Registrer deg som giver alene, med venner, familie eller
                kolleger via “Bli giver” knappen øverst på denne siden.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step2}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 2{" "}
            </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                Når julen nærmer seg, får du tildelt en anonym familie som du
                handler til. Du mottar en liste med gaveønsker og hva de ønsker
                å spise.
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item className={classes.howItem}>
          <div className={classes.imgContainer}>
            <img className={classes.stepsImage} src={step3}></img>
          </div>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 3{" "}
            </Typography>
            <div className={classes.textContainer}>
              <Typography className={classes.paragraph}>
                På innsamlingsdagen leverer du esken et angitt sted, og
                barnevernet og andre kjører eskene ut til familiene.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default How;
