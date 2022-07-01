import { Typography, Container } from "@material-ui/core";
import useStyles from "./Styles";

interface Props {
  municipality: string;
}

const Information: React.FC<Props> = ({ municipality }) => {
  const classes = useStyles();

  return (
    <Container id="information" className={classes.sectionContainer}>
      <div>
        <Typography>{municipality}</Typography>
      </div>
    </Container>
  );
};

export default Information;
