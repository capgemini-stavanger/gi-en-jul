import { Typography, CardMedia, Card, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import dummyImg from "styling/img/dummy-image.jpg";

interface Props {
  municipality: string;
  image: string;
  information: string;
}

const style = {
  greyImageFilter: {
    filter: "grayscale(100%)",
  },
};

const Information: React.FC<Props> = ({ municipality, image, information }) => {
  const classes = useStyles();

  return (
    <Grid id="information" className={classes.sectionContainer}>
      <Typography>{municipality}</Typography>
      <Card className={classes.informationCard}>
        {
          <CardMedia
            style={style.greyImageFilter}
            className={classes.howImage}
            image={image || dummyImg}
          />
        }
      </Card>
      <Typography>{information}</Typography>
    </Grid>
  );
};

export default Information;
