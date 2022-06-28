import {
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import useStyles from "components/landing-page/Styles";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";


const StartJul = () => {
    const classes = useStyles();


return (
    <>
    <NavBarPublic />
    <Container id="start" className={classes.root}  maxWidth={false}>
        <div className={classes.headLineContainer}>
            <Typography className={classes.textHeadline}>
                Hvordan du starter Gi en Jul i din kommune 
            </Typography>
        </div>
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
            <Typography className={classes.sectionContainer}>
                 For å starte Gi en Jul i din kommune kan du ta kontakt med kontaktpersonen for Stavanger kommune.  
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
