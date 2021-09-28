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
      Hvert år er det mange lokale bedrifter som bidrar til Gi en jul, og det er flere måter å gjøre det på. Ta kontakt med Gi en jul i din kommune. Kontaktinformasjon finner du under her.
      </Typography>
    </Container>
  );
};

export default Companies;
