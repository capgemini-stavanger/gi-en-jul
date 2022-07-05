import { Container, Grid, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Pager from "./Pager";
import useStyles from "./Styles";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  step: number;
}

const GiverType: React.FC<Props> = ({ nextStep, step }) => {
  const history = useHistory();

  const classes = useStyles();

  return (
    <>
      <Typography className={classes.subHeading}> Er du privatperson eller bedrift? </Typography>
      <Typography className={classes.infoText}>
        Tilleggsinformasjon rundt hovedspørsmålet..
      </Typography>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.form}
        >
          <Grid item>KNAPPER</Grid>
          <Grid item>
            <Pager
              onBack={useCallback(() => history.push("/"), [history])}
              onContinue={nextStep}
              continueText={"Neste Steg"}
              step={step}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default GiverType;
