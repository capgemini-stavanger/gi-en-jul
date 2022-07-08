import { Typography, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";

interface Props {
  location: string;
  information: string;
}

const KommuneInformation: React.FC<Props> = ({ location, information }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" id="information" className={classes.sectionContainer}>
      <Grid item>
        <Typography>Informasjon vist om {location}:</Typography>
      </Grid>
      <Grid item>
        <Typography>{parse(information)}</Typography>
      </Grid>
    </Grid>
  );
};

export default KommuneInformation;
