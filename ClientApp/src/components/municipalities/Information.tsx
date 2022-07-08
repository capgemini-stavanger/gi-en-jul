import { Typography, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import parse from "html-react-parser";

interface Props {
  location: string;
  information: string;
}

const Information: React.FC<Props> = ({ location, information }) => {
  const classes = useStyles();

  return (
    <Grid id="information" className={classes.sectionContainer}>
      <Typography>{location}</Typography>
      <Typography>{parse(information)}</Typography>
    </Grid>
  );
};

export default Information;
