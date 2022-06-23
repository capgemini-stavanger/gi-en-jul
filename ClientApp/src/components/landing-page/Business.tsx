import { Typography, Container , Grid} from "@material-ui/core";
import useStyles from "components/landing-page/Styles";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import NavBarPublic from "components/shared/navbar/NavBarPublic";

const Business = () => { 
    const classes = useStyles();

    return (
        <>
    <NavBarPublic />
    <Container  className={classes.root} maxWidth={false} >
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>For bedrifter</Typography>
      </div>
     <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
           >
          <Grid item >
          <Typography className={classes.sectionContainer}>
      Dersom du ønsker å få med kolleger og gi en jul, 
      registrerer du dere som givere som vanlig. Andre måter å bidra på er å gi et pengebeløp som kan
      benyttes til gavekort på en opplevelse for barn, eller noe annet vi kan putte i eskene, som konfekt, 
      godteri og lignende. Ta kontakt med kontaktpersonen i din kommune, så kan vi snakkes mer om hvordan din bedrift kan bidra.
          </Typography>
            <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
            <img className={classes.snowDown} src={snowDown}></img>
          </Grid>
          
     </Grid>
      </Container>
    </>
    )
}

export default Business;
