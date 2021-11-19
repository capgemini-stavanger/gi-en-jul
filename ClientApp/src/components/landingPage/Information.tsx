import * as React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import useStyles from "./Styles";
import dummyImg from "./../../styling/img/dummy-image.jpg";
import { Mail } from "@material-ui/icons";
import myImage from "./../../assets/Elisabeth.png";

const style = {
  greyImageFilter: {
    filter: "grayscale(100%)"
  }
}


const Information : React.FC = () => {
  const classes = useStyles();

  const ContactCard =
  <div key={"Information"}>
  <Grid className={classes.contactItem}>
    <Card className={classes.contactCard}>
      <Typography className={classes.contactHeader}>Start Gi en jul i din kommune?</Typography>
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
  </Grid>
  </div>
  

  return (
    <Container id="information" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
      </div>
      {/* Todo: Legg inn scrolle-link under */}
      <Grid container justifyContent="center">
        {ContactCard}
      </Grid>
    </Container>
  );
};

export default Information;
