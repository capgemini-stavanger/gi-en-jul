import { Container, Grid, Typography} from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import Footer from "components/shared/Footer";
import NavBarPublic from "components/shared/navbar/NavBarPublic";

const Stavanger = () => {
    const classes = useStyles();

    return(
        <>
      <NavBarPublic />
      <Container className={classes.root} maxWidth={false}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img className={classes.logo} src={logo}></img>
          </Grid>
          <Grid item >
          <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
        <img className={classes.snowDown} src={snowDown}></img>
        </Grid>
        </Grid>
        <ScrollToTop maxPagePosition={300} />
        
        <Grid container justifyContent="center">
            <Typography>
                Her kan det skrives informasjon om Gi en Jul Stavanger.
            </Typography>
        </Grid>
        <Footer/>
      </Container>
    </>
    )

};

export default Stavanger;