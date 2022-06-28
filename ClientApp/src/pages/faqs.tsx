import { Container, Grid} from "@material-ui/core";
import useStyles from "components/landing-page/Styles";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import logo from "styling/img/logo_background.svg";
import family from  "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg"; 
import Questions from "components/landing-page/Questions";
import Footer from "components/shared/Footer";

const FAQs = () => {
    const classes = useStyles();

    return (
        <>
        <NavBarPublic />
        <Container className={classes.root} maxWidth={false}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <img className={classes.logo} src={logo}></img>
                </Grid>
                <Grid item>
                    <img className={classes.familyImage} src={family}></img>
                </Grid>
                <Grid item>
                    <img className={classes.snowDown} src={snowDown}></img>
                </Grid>
            </Grid>
            <Questions />
            <Footer />
        </Container>
        </>
    );
};

export default FAQs;