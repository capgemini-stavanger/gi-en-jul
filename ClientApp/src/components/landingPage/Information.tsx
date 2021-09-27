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
import myImage from "./Elisabeth.png";

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
      {<CardMedia style={style.greyImageFilter} className={classes.howImage} image={ myImage || dummyImg} />}
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
