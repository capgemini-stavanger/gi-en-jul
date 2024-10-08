import { Button, Container, Grid, Typography } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Styles";
import img from "../../styling/img/Capgemini_Logo_Color_RGB.svg";

const What = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container id="what" className={classes.sectionContainer}>
      <Grid container justifyContent="center" alignItems="flex-start">
        <div className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>Hva er Gi en jul?</Typography>
          <div className={classes.textContainer}>
            <Typography className={classes.paragraph}>
              Gi en jul er et frivillig prosjekt i samarbeid med blant andre barnevernet og NAV.
              <br />
              Som giver gir du julemiddag og julegaver til en familie som virkelig trenger det.
              <br />
              <br />
              Dette er foreldre og barn som ikke selv har mulighet til å kjøpe en skikkelig
              julemiddag, julesnop eller julegaver til hverandre. I år kan du melde deg som giver i
              <br />
              {formatLocations(process.env.REACT_APP_EVENT_LOCATIONS?.split(",") ?? [])}.
            </Typography>
            <Button
              style={{ marginTop: "1em" }}
              size="large"
              className={classes.giverButton}
              endIcon={<ArrowForwardIos />}
              onClick={React.useCallback(() => history.push("/bli-giver"), [history])}
            >
              Bli giver
            </Button>
            <Typography className={classes.paragraph + " " + classes.partnerText}>
              Med hjertelig støtte fra{" "}
              <a href={"https://www.capgemini.com/no-no"}>
                <img className={classes.capLogo} src={img} alt={"Capgemini"} />
              </a>
            </Typography>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

const formatLocations = (locations: string[]) => {
  if (!locations.length) return "";

  if (locations.length == 1) return locations[0];

  let formatString = locations.slice(0, locations.length - 1).join(", ");
  formatString += " eller ";
  formatString += locations[locations.length - 1];

  return formatString;
};

export default What;
