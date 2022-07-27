import { Typography, Grid, Divider } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";

interface Props {
  location: string;
  information: string;
}

const MunicipalityInformation: React.FC<Props> = ({ location, information }) => {
  const classes = useStyles();
  if (information == undefined) {
    information = "Det er ikke lagt til noe informasjon om denne kommunen enda.";
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
    </Grid>
  );
};

export default MunicipalityInformation;
