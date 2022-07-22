import { Button, Container, Grid, Typography } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Styles";

const What = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container id="what" className={classes.sectionContainer}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <div className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>Hva er Gi en jul?</Typography>
          <div className={classes.textContainer}>
            <Typography className={classes.paragraph}>
              Gi en jul er et frivillig prosjekt i samarbeid med blant andre barnevernet og NAV.
              <br />
              Som giver gir du julemiddag og julegaver til en familie som virkelig trenger det.
              <br />
              <br />
              Dette er foreldre og barn som ikke selv har mulighet til å kjøpe en skikkelig
              julemiddag, julesnop eller julegaver til hverandre. I år kan du melde deg som giver i
              <br />
              Bodø, Gjesdal, Sandnes, Sola eller Stavanger.
            </Typography>
            <Button
              style={{ marginTop: "1em" }}
              size="large"
              className={classes.giverButton}
              endIcon={<ArrowForwardIos />}
              onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
            >
              Bli giver
            </Button>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default What;
