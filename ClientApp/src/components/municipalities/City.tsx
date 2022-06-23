import * as React from "react";
import {
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import useStyles from "./Styles";

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

  /*
  handle button click method here 
  */

  const City: React.FC<Props> = ({cities}) => {
    const classes = useStyles();
    

    const MunicipalityPages = cities.map((municipality, index) =>
    <div key={index}>
    <Grid className={classes.municipalityItem}>
        <Typography className={classes.municipalityHeader}>{municipality.city}</Typography>
    </Grid>

    </div>
    );
    //the names of the kommuner should be clickabe buttons 
    return (
        <Container id="municipality" className={classes.sectionContainer}>
            <div className={classes.headLineContainer}>
                <Typography className={classes.textHeadline}>Kommuner</Typography>
            </div>
            <Typography> <br /> {MunicipalityPages} </Typography>
            
        </Container>
    );
  };

  export default City;




