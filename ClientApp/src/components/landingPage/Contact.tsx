import * as React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider,
} from "@material-ui/core";
import useStyles from "./Styles";
import dummyImg from "./../../styling/img/dummy-image.jpg";
import Information from "./Information";
import { Mail, Facebook, Instagram, Phone } from "@material-ui/icons";


export interface ContactData {
  city: string,
  contactPerson: string,
  email: string,
  facebook: string,
  instagram: string,
  image: string,
  phoneNumber: string,
}

interface Props {
  contacts : ContactData[]
}

const style = {
  greyImageFilter: {
    filter: "grayscale(100%)"
  }
}


const Contact : React.FC<Props> = ({contacts}) => {
  const classes = useStyles();

const ContactCards = contacts.map((contact, index) =>
  <div key={index}> 
  <Grid container className={classes.contactItem}>
    <Card className={classes.contactCard}>
      <Typography className={classes.contactHeader}>{contact.city}</Typography>
      {<CardMedia style={style.greyImageFilter} className={classes.howImage} image={contact.image || dummyImg} />}
      <CardContent className={classes.contactContent}>
        <Typography>
          Ta kontakt med <br /> {contact.contactPerson} på
        </Typography>
      </CardContent>
      <CardActions className={classes.contactContent}>
        <IconButton>
          <Mail color="primary" className={classes.mailIcon} />
          <a href={"mailto:" + contact.email}><Typography color="primary">{contact.email}</Typography></a>
        </IconButton>
      </CardActions>
      <CardActions className={classes.contactContent}>
      { contact.phoneNumber &&
        <IconButton>
          <Phone color="primary" className={classes.mailIcon} />
          <a href={"tel:" + contact.phoneNumber}><Typography color="primary">{contact.phoneNumber}</Typography></a>
        </IconButton>}
      </CardActions>
      <CardActions className={classes.contactContent}>
        { contact.facebook &&
          <IconButton
          onClick={() => {
            window
              .open(contact.facebook, "_blank")
              ?.focus();
          }}
          >
          <Facebook color="primary" />
        </IconButton>}
        { contact.instagram &&
          <IconButton
          onClick={() => {
            window
              .open(contact.instagram, "_blank")
              ?.focus();
          }}
        >
          <Instagram color="primary" />
        </IconButton>}
      </CardActions>
    </Card>
  </Grid>
  </div>
  );

  return (
    <Container id="contact" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>Kontakt</Typography>
      </div>
      {/* Todo: Legg inn scrolle-link under */}
      { ContactCards.length &&
      <Typography className={classes.contactContent}>
        Før du tar kontakt, se om du finner svaret på det du lurer på i ofte
        stilte spørsmål.
      </Typography>
       ||
      <Typography className={classes.contactContent}>
        Det er dessverre ikke mulig å melde seg opp som giver enda.
      </Typography>
      }
      <Grid container justifyContent="center">
        {ContactCards}
        <div>
          <Information />
        </div>
      </Grid>
    </Container>
  );
};

export default Contact;
