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


const style = {
  greyImageFilter: {
    filter: "grayscale(100%)"
  }
}


const Information : React.FC = () => {
  const classes = useStyles();

const ContactCard = 
  <div key={"Information"}> 

    <Card className={classes.contactCard}>
      <Typography className={classes.contactHeader}>Elisabeth Ohlgren Tidemann</Typography>
      {<CardMedia style={style.greyImageFilter} className={classes.howImage} image={ "https://gienjulteststorage.blob.core.windows.net/$web/contact_images/Elisabeth.png?sp=rl&st=2021-09-27T10:02:44Z&se=2022-01-28T10:02:00Z&sv=2020-08-04&sr=b&sig=QFc0FedF2Ez7VsQe9kJKcU4s4%2BvjLIRa4erNIKnX3jY%3D" || dummyImg} />}
      <CardContent className={classes.contactContent}>
        <Typography>
          Ta kontakt med <br /> Elisabeth på
        </Typography>
      </CardContent>
      <CardActions className={classes.contactContent}>
        <IconButton>
          <Mail color="primary" className={classes.mailIcon} />
          <a href="mailto:e.ohlgren@gmail.com"><Typography color="primary">e.ohlgren@gmail.com</Typography></a>
        </IconButton>
      </CardActions>
    </Card>

  </div>
  

  return (
    <Container id="information" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>
          Vil du starte Gi En Jul i din kommune?
        </Typography>
      </div>
      {/* Todo: Legg inn scrolle-link under */}
      <Grid container justifyContent="center">
        {ContactCard}
      </Grid>
    </Container>
  );
};

export default Information;
