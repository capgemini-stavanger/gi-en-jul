import { Typography, Grid, Divider, Box } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";
import img_placeholder from "styling/img/person.png";

interface Props {
  location: string;
  information: string;
  images: string[];
}

const MunicipalityInformation: React.FC<Props> = ({ location, information, images }) => {
  const classes = useStyles();

  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
  }

  return (
    <Grid container direction="column" className={classes.sectionContainer}>
      <Grid item>
        <Typography variant="h5">Informasjon om Gi en jul i {location} kommune:</Typography>
      </Grid>
      <Divider />
      <Grid item>{parse(information)}</Grid>
      <Grid item>
        {images.map((img, index) => {
          if (!img) {
            return <Box key={`Municipality${location}NOImage${index}`}> </Box>;
          }
          return (
            <img
              key={`Municipality${location}Image${index}`}
              src={img}
              className={classes.infoImage}
              alt={"Finner ikke bildet"}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${img_placeholder}`;
              }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MunicipalityInformation;
