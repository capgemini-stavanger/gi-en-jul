import * as React from "react";
import { Typography, Container } from "@material-ui/core";
import useStyles from "./Styles";

const Companies = () => {
  const classes = useStyles();

  return (
    <Container id="companies" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
      <Typography className={classes.textHeadline}>For bedrifter</Typography>
      </div>
      <Typography className={classes.contactContent}>
        Få med kolleger og Gi en jul, og registrer dere som givere. Gi et
        pengebeløp som kan benyttes til gavekort på en opplevelse for barna. Gi
        gavekort på opplevelser som vi putter oppi som ekstragave i juleeskene.
        Gi noe annet vi kan putte i eskene, som konfekt, godteri og lignende.
        Låne Gi en jul store biler som benyttes til utkjøring.
      </Typography>
    </Container>
  );
};

export default Companies;
