import { Typography, Container, Grid } from "@material-ui/core";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import useStyles from "components/landing-page/Styles";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";

const StartJul = () => {
  const classes = useStyles();

  return (
    <>
      <NavBarPublic />
      <Container id="start" className={classes.root} maxWidth={false}>
        <div className={classes.headLineContainer}>
<<<<<<< HEAD
          <Typography className={classes.textHeadline}>
            Hvordan du starter Gi en Jul i din kommune
          </Typography>
=======
            <Typography className={classes.textHeadline}>
                Hvordan du starter Gi en jul i din kommune 
            </Typography>
>>>>>>> 5b8fccb (added onClick and styling)
        </div>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography className={classes.sectionContainer}>
<<<<<<< HEAD
<<<<<<< HEAD
              For å starte Gi en Jul i din kommune kan du ta kontakt med kontaktpersonen for
              Stavanger kommune.
=======
                 For å starte Gi en jul i din kommune kan du ta kontakt med kontaktpersonen for Stavanger kommune.  
>>>>>>> 5b8fccb (added onClick and styling)
=======
                 For å starte Gi en jul i din kommune kan du ta kontakt med kontaktpersonen for Stavanger kommune.  
>>>>>>> c9587fa (added onClick and styling)
            </Typography>
            <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
            <img className={classes.snowDown} src={snowDown}></img>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StartJul;
