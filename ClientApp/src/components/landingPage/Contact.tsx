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
import { Mail, Facebook, Instagram } from "@material-ui/icons";


export interface ContactsData {
  location: string,
  name: string,
  mail: string,
  facebook: string,
  instagram: string,
}

interface Props {
  contacts : ContactsData[]
}


const Contact : React.FC<Props> = ({contacts}) => {
  const classes = useStyles();

console.log(contacts);

const listContacts = contacts.map((contacts, index) =>
  <div key={index}> 
  <Grid container className={classes.contactItem}>
    <Card className={classes.contactCard}>
      <Typography className={classes.contactHeader}>{contacts}</Typography>
      <CardMedia className={classes.howImage} image={dummyImg} />
      <CardContent className={classes.contactContent}>
        <Typography>
          Ta kontakt med <br /> Bodil på
        </Typography>
      </CardContent>
      <CardActions className={classes.contactContent}>
        <IconButton>
          <Mail color="primary" className={classes.mailIcon} />
          <Typography>bodø@gienjul.no</Typography>
        </IconButton>
      </CardActions>
      <CardActions className={classes.contactContent}>
        <IconButton
          onClick={() => {
            window
              .open("https://www.facebook.com/gienjul", "_blank")
              ?.focus();
          }}
        >
          <Facebook color="primary" />
        </IconButton>
        <IconButton
          onClick={() => {
            window
              .open("https://www.instagram.com/gienjul/", "_blank")
              ?.focus();
          }}
        >
          <Instagram color="primary" />
        </IconButton>
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
      <Typography className={classes.contactContent}>
        Før du tar kontakt, se om du finner svaret på det du lurer på i ofte
        stilte spørsmål.
      </Typography>
      <Grid container justifyContent="center">
        {listContacts}
      </Grid>
    </Container>
  );
};

export default Contact;
