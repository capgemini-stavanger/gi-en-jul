import * as React from "react";
import {
  Typography,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import useStyles from "./Styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Information from "./Information";

export interface LocationData {
  location: string;
  information: string;
}

interface Props {
  locations: LocationData[];
}

const Kommune: React.FC<Props> = ({ locations }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container id="municipality" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>Kommuner</Typography>
      </div>
      <Grid container justifyContent="center">
        {Array.from(locations).map((val, index) => (
          <Grid className={classes.municipalityItem} key={index}>
            <Accordion
              expanded={expanded === index.toString()}
              onChange={handleChange(index.toString())}
            >
              <AccordionSummary
                className={classes.municipalitySummary}
                expandIcon={<ExpandMoreIcon className={classes.municipalitySummary} />}
              >
                <Typography>{val.location}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Information location={val.location} information={val.information} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Kommune;
