import * as React from "react";
import { Typography, Container } from "@material-ui/core";
import useStyles from "./Styles";

const Contact = () => {
  const classes = useStyles();

  return (
    <Container id="contact" className={classes.companyContainer}>
      <Typography className={classes.textHeadline}>Kontakt</Typography>
      {/* Todo: Legg inn scrolle-link under */}
      <Typography>
          Før du tar kontakt, se om du finner svaret på det du lurer på i ofte stilte spørsmål. 
      </Typography>
    </Container>
  );
};

export default Contact;