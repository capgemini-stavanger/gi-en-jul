import * as React from "react";
import { Typography, Container, Grid, Card } from "@material-ui/core";
import useStyles from "./Styles";
import { ExpandMore } from "@material-ui/icons";
import dummy from "./../../styling/img/dummy-image.jpg";
import { isMobile } from "../../common/functions/IsMobile";

const How = () => {
  const classes = useStyles();
  return (
    <Container id="how" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>
          Hvordan fungerer gi en jul?
        </Typography>
      </div>
      <Grid container justifyContent="center">
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                Alene, eller sammen med vennegjengen, kolleger, familie eller
                naboer bestemmer du deg for at du vil bli med på Gi en jul.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
        {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                På gienjul.no registrerer du deg som giver og opplyser antall
                familiemedlemmer du/dere ønsker å hjelpe.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
        {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                I mellomtiden jobber barnevernet, NAV og Flyktningtjenesten med
                å kartlegge og finne familier som trenger hjelp.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
        {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                Når du har registrert deg får du en mail med info, hvor det står
                hvordan det fungerer med selve juleeskene, hva som skal oppi,
                hvor de skal leveres og når.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
        {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                Så snart jeg får inn familiene matcher jeg familie og giver, og
                sender en epost til deg med kjønn, alder og gaveønsker til
                familiemedlemmene. Det er selvsagt helt anonymt.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
        {isMobile() ? <ExpandMore className={classes.nextIcon} /> : <></>}
        <Grid container className={classes.howItem}>
          <Card>
            <div className={classes.howText}>
              <Typography>
                Til slutt møtes vi x dato i x lokaler, hvor eskene blir kjørt ut
                av de som jobber i de ulike instansene.
              </Typography>
            </div>
            <img className={classes.howImage} src={dummy}></img>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default How;
