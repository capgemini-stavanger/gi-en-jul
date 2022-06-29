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
    city: String, 
  }
  
  interface Props {
    cities : CityData[]
  }

  const style = {
    greyImageFilter: {
        filter: "grayscale(100%)"
    }
  }


  const City: React.FC<Props> = ({cities}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false> (false); 
    const handleChange = (panel:string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel: false)
    };
    
    return (
        <Container id="municipality" className={classes.sectionContainer}>
            <div className={classes.headLineContainer}>
                <Typography className={classes.textHeadline}>Kommuner</Typography>
            </div>
            {Array.from(cities).map((val, index)=>
            <Grid className={classes.municipalityItem} key={index}>
              <Accordion expanded={expanded === index.toString()} onChange={handleChange(index.toString())}>
                <AccordionSummary
                  className = {classes.municipalitySummary}
                  expandIcon={
                    <ExpandMoreIcon />
                  }
                  >
                    <Typography>{val.city}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Information/>
                </AccordionDetails>
              </Accordion>
            </Grid>
            )}
        </Container>
    );
  };

  export default City;



