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
        Dersom du ønsker å få med kolleger og gi en jul, registrerer du 
        dere som givere som vanlig. Andre måter å bidra på er å gi et 
        pengebeløp som kan benyttes til gavekort på en opplevelse for barn,
        eller noe annet vi kan putte i eskene, som konfekt, godteri og lignende.
        Eller så kan du ta kontakt med kontaktpersonen i din kommune,  
        så kan vi snakkes mer om hvordan din bedrift kan bidra. 
      </Typography>
    </Container>
  );
};

export default Companies;
