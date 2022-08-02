import { Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";

interface Props {
  location: string;
  information: string;
  image1: string;
  image2: string;
  image3: string;
}

const MunicipalityInformation: React.FC<Props> = ({
  location,
  information,
  image1,
  image2,
  image3,
}) => {
  const classes = useStyles();
  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
  }
  if (image1 == null) {
    image1 = "Det er ikke lagt til noe bilde enda";
  }
  return (
    <Grid container direction="column" id="information" className={classes.sectionContainer}>
      <Grid item>
        <Typography variant="h5">Informasjon om Gi en jul i {location} kommune:</Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{parse(information)}</Typography>
        <img src={image1} className={classes.infoImage} />
        <img src={image2} className={classes.infoImage} />
        <img src={image3} className={classes.infoImage} />
      </Grid>
    </Grid>
  );
};

export default MunicipalityInformation;
