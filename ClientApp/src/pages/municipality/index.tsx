import { Container, Grid, Typography } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import { LocationData } from "components/municipalities/Kommunes";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Kommunes from "components/municipalities/Kommunes";

interface IKommuneInfoResponse {
  index: string;
  info: string;
}

const Municipality = () => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [locationInfos, setLocationInfos] = useState(new Map<string, string>());
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const classes = useStyles();
  const apiservice = new ApiService();

  const fetchActiveLocations = () => {
    apiservice
      .get("Event/ActiveLocations", {})
      .then((resp) => {
        setActiveLocations(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const fetchKommuneInformation = () => {
    apiservice
      .get("Cms/getall", { params: { contentType: "Kommune" } })
      .then((resp) => {
        // Updates a dictionary with {location: information} pairs
        const tempLocationInfoMap: Map<string, string> = new Map();
        resp.data.forEach((obj: IKommuneInfoResponse) => {
          tempLocationInfoMap.set(obj.index, obj.info);
        });
        setLocationInfos(tempLocationInfoMap);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const buildLocationData = () => {
    const tempLocationData: LocationData[] = [];

    activeLocations.forEach((location: string) => {
      let info = locationInfos.get(location);
      if (info === undefined) {
        info = "Ingen informasjon om denne kommunen enda";
      }
      tempLocationData.push({ location: location, information: info });
      setLocationData(tempLocationData);
    });
  };

  useEffect(fetchActiveLocations, []);
  useEffect(fetchKommuneInformation, []);
  useEffect(buildLocationData, [activeLocations, locationInfos]);

  return (
    <>
      <NavBarPublic />
      <Container className={classes.root} maxWidth={false}>
        <Grid className={classes.headLineContainer}>
          <Typography className={classes.textHeadline}>Kommune Informasjon</Typography>
        </Grid>
        <Grid item>
          <Kommunes locations={locationData} />
          <img className={classes.familyImage} src={family}></img>
        </Grid>
        <Grid item>
          <img className={classes.snowDown} src={snowDown}></img>
        </Grid>
        <ScrollToTop maxPagePosition={300} />
        <Footer />
      </Container>
    </>
  );
};

export default Municipality;
