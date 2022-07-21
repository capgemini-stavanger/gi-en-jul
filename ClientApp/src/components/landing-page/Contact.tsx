import * as React from "react";
import { Typography, Container, Grid, Box } from "@material-ui/core";
import useStyles from "./Styles";
import img_placeholder from "styling/img/person.png";
import { Mail, Phone } from "@material-ui/icons";
import { Link as Scroll } from "react-scroll";

export interface ContactData {
  city: string;
  contactPerson: string;
  email: string;
  image: string;
  phoneNumber: string;
  information: string; //denne må være her til den nye tabellen for CMS kommer
}

interface Props {
  contacts: ContactData[];
}

const Contact: React.FC<Props> = ({ contacts }) => {
  const classes = useStyles();

  return (
    <Container className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.blueTextHeadline}>Kontakt</Typography>
        <Typography className={classes.contactSpacing}>
          Før du tar kontakt, se om du finner svaret på det du lurer på i&nbsp;
          <Scroll to="questions" smooth={true}>
            <span className={classes.textLink}>ofte stilte spørsmål.</span>
          </Scroll>
        </Typography>
      </div>
      <Grid container direction="row" spacing={4} justifyContent="center">
        {contacts.map((contact, index) => {
          return (
            <Grid item key={index}>
              <Box className={classes.cardContainer}>
                <Box className={classes.cardInfo}>
                  <Typography variant="h5" color="primary">
                    {contact.city}
                  </Typography>
                </Box>
                <Box className={classes.cardInfo}>
                  <img
                    src={contact.image}
                    className={classes.cardImage}
                    alt={"Finner ikke bilde.."}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `${img_placeholder}`;
                    }}
                  />
                  <Typography> {contact.contactPerson} </Typography>
                </Box>
                <Box className={classes.cardInfo}>
                  <Box>
                    <Mail className={classes.smallIcon} color="primary" />
                    <a href={"mailto:" + contact.email}>
                      <Typography className={classes.iconText}>{contact.email}</Typography>
                    </a>
                  </Box>
                  <Box>
                    <Phone className={classes.smallIcon} color="primary" />
                    <a href={"tel:" + contact.phoneNumber}>
                      <Typography className={classes.iconText}>{contact.phoneNumber}</Typography>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Contact;
