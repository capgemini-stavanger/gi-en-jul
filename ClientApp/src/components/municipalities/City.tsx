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
import Information from "./information";

export interface CityData {
  city: string;
  image: string;
  information: string;
}

interface Props {
  cities: CityData[];
}

const City: React.FC<Props> = ({ cities }) => {
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
        {Array.from(cities).map((val, index) => (
          <Grid className={classes.municipalityItem} key={index}>
            <Accordion
              expanded={expanded === index.toString()}
              onChange={handleChange(index.toString())}
            >
              <AccordionSummary
                className={classes.municipalitySummary}
                expandIcon={<ExpandMoreIcon className={classes.municipalitySummary} />}
              >
                <Typography>{val.city}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Information
                  municipality={val.city}
                  image={val.image}
                  information={val.information}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default City;