import { Container, Grid } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import logo from "styling/img/logo_background.svg";
import family from "styling/img/familyTop.svg";
import snowDown from "styling/img/snow_down.svg";
import { LocationData } from "components/municipalities/Kommune";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Kommune from "components/municipalities/Kommune";

interface IKommuneInfoResponse {
  rowKey: string;
  info: string;
}

const Municipality = () => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [locationInfos, setLocationInfos] = useState(new Map<string, string>());
  const updateMap = (location: string, info: string) => {
    setLocationInfos(new Map(locationInfos.set(location, info)));
  };
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
        resp.data.forEach((obj: IKommuneInfoResponse) => {
          updateMap(obj.rowKey, obj.info);
        });
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
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <img className={classes.logo} src={logo}></img>
          </Grid>
          <Grid item>
            <img className={classes.familyImage} src={family}></img>
          </Grid>
          <Grid item>
            <img className={classes.snowDown} src={snowDown}></img>
          </Grid>
        </Grid>
        <Kommune locations={locationData} />
        <ScrollToTop maxPagePosition={300} />
        <Footer />
      </Container>
    </>
  );
};

export default Municipality;
