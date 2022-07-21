import { Container, Grid, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import useStyles from "./Styles";

const What = () => {
  const classes = useStyles();
  return (
    <Container id="what" className={classes.sectionContainer}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <div className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>
            Hva er <br /> Gi en jul?
          </Typography>
          <ExpandMore color="primary" />
          <div className={classes.textContainer}>
            <Typography className={classes.paragraph}>
              Gi en jul er et frivillig prosjekt i samarbeid med blant andre barnevernet og NAV.{" "}
              <br />
              Som giver gir du julemiddag og julegaver til en familie som virkelig trenger det.
              Dette er foreldre og barn som ikke selv har mulighet til å kjøpe en skikkelig
              julemiddag, julesnop eller julegaver til hverandre. I år kan du melde deg som giver i
              Bodø, Gjesdal, Sandnes, Sola eller Stavanger.
            </Typography>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default What;
