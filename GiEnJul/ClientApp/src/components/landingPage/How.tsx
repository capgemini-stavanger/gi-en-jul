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
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>
          Hva er <br /> Gi en jul?
        </Typography>
        <ExpandMore color="primary" />
        <Typography className={classes.paragraph}>
          Gi en jul er et veldedighets-prosjekt i samarbeid med blant andre
          barnevernet og NAV.
        </Typography>
        <Typography className={classes.paragraph}>
          Som giver til “Gi en jul” donerer du julemiddag og julegaver til en
          familie som virkelig trenger det. Dette er foreldre og barn som ikke
          selv har mulighet til å kjøpe en skikkelig julemiddag, julesnop eller
          julegaver til hverandre.
        </Typography>
      </div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Hvordan fungerer <br /> Gi en jul?
            </Typography>
          </div>
        </Grid>
        <Grid item>
            <img className={classes.stepsImage} src={step1}></img>
          </Grid>
        <Grid item>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 1{" "}
            </Typography>
            <Typography className={classes.paragraph}>
              Registrer deg som giver alene, med venner, familie eller kolleger
              via “Bli giver” knappen øverst på denne siden.
            </Typography>
          </div>
        </Grid>
        <img className={classes.stepsImage} src={step2}></img>

        <Grid item>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 2{" "}
            </Typography>
            <Typography className={classes.paragraph}>
              Når julen nærmer seg, får du tildelt en anonym familie som du
              handler til. Du mottar en liste med gaveønsker og hva de ønsker å
              spise.
            </Typography>
          </div>
        </Grid>
        <img className={classes.stepsImage} src={step3}></img>
        <Grid item>
          <div className={classes.headLineContainer}>
            <Typography className={classes.blueTextHeadline}>
              Steg 3{" "}
            </Typography>
            <Typography className={classes.paragraph}>
              På innsamlingsdagen leverer du esken et angitt sted, og
              barnevernet og andre kjører eskene ut til familiene.
            </Typography>
          </div>
        </Grid>
        </Grid>

    </Container>

      //   <Grid item>
      //     <Typography className={classes.textHeadline}>
      //       Hvordan fungerer <br /> Gi en jul?
      //     </Typography>
      //     <ExpandMore color="primary" />
      //   </Grid>
      //   <Grid item></Grid>
      // </Grid>
      // <Grid container justifyContent="center">
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography className={classes.paragraph}>
      //           Alene, eller sammen med vennegjengen, kolleger, familie eller
      //           naboer bestemmer du deg for at du vil bli med på Gi en jul.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //   </Grid>
      //   {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography>
      //           På gienjul.no registrerer du deg som giver og opplyser antall
      //           familiemedlemmer du/dere ønsker å hjelpe.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //   </Grid>
      //   {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography>
      //           I mellomtiden jobber barnevernet, NAV og Flyktningtjenesten med
      //           å kartlegge og finne familier som trenger hjelp.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //   </Grid>
      //   {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography>
      //           Når du har registrert deg får du en mail med info, hvor det står
      //           hvordan det fungerer med selve juleeskene, hva som skal oppi,
      //           hvor de skal leveres og når.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //   </Grid>
      //   {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography>
      //           Så snart jeg får inn familiene matcher jeg familie og giver, og
      //           sender en epost til deg med kjønn, alder og gaveønsker til
      //           familiemedlemmene. Det er selvsagt helt anonymt.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //   </Grid>
      //   {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
      //   <Grid container className={classes.howItem}>
      //     <Card>
      //       <div className={classes.howText}>
      //         <Typography>
      //           Til slutt møtes vi x dato i x lokaler, hvor eskene blir kjørt ut
      //           av de som jobber i de ulike instansene.
      //         </Typography>
      //       </div>
      //       <img className={classes.howImage} src={dummy}></img>
      //     </Card>
      //     </Grid>
        
  );
};

export default How;
