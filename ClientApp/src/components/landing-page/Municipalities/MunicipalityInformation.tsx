import { Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";
import { useState } from "react";

interface Props {
  location: string;
  information: string;
  images: string[];
}

const MunicipalityInformation: React.FC<Props> = ({ location, information, images }) => {
  const classes = useStyles();
  const [showImages, setShowImages] = useState<boolean>(true);

  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
  }
  if (images.length == 0) {
    setShowImages(false);
  }
  return (
    <Grid container direction="column" id="information" className={classes.sectionContainer}>
      <Grid item>
        <Typography variant="h5">Informasjon om Gi en jul i {location} kommune:</Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{parse(information)}</Typography>
      </Grid>
      <Grid item>
        {showImages &&
          images.map((img, index) => {
            return <img key={index} src={img} className={classes.infoImage} />;
          })}
      </Grid>
    </Grid>
  );
};

export default MunicipalityInformation;
