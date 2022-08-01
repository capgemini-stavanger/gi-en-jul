import { Button, Container, Grid, Typography } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import Footer from "components/shared/Footer";
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Municipalities, {
  LocationData,
} from "components/landing-page/Municipalities/Municipalities";

interface IKommuneInfoResponse {
  country: string;
  name: string;
  information: string;
  image: string;
  isActive: boolean;
  email: string;
}

const Municipality = () => {
  const [activeMunicipalities, setActiveMunicipalities] = useState<string[]>([]);
  const [municipalityMap, setMunicipalityMap] = useState(new Map<string, IKommuneInfoResponse>());
  const [municipalityData, setMunicipalityData] = useState<LocationData[]>([]);
  const classes = useStyles();
  const apiservice = new ApiService();

  const fetchActiveLocations = () => {
    apiservice
      .get("Municipality/Active", {})
      .then((resp) => {
        setActiveMunicipalities(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const fetchKommuneInformation = () => {
    apiservice
      .get("Municipality/All", {})
      .then((resp) => {
        const tempMunicipalityInfoMap: Map<string, IKommuneInfoResponse> = new Map();
        resp.data.forEach((obj: IKommuneInfoResponse) => {
          tempMunicipalityInfoMap.set(obj.name, obj);
        });
        setMunicipalityMap(tempMunicipalityInfoMap);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const buildLocationData = () => {
    const tempLocationData: LocationData[] = [];

    activeMunicipalities.forEach((location: string) => {
      let info = municipalityMap.get(location)?.information;
      if (info === undefined) {
        info = "Ingen informasjon om denne kommunen enda";
      }
      tempLocationData.push({ location: location, information: info });
      setMunicipalityData(tempLocationData);
    });
  };

  useEffect(fetchActiveLocations, []);
  useEffect(fetchKommuneInformation, []);
  useEffect(buildLocationData, [activeMunicipalities, municipalityMap]);

  return (
    <>
      <NavBarPublic />
      <Container className={classes.rootNavBarPages} maxWidth={false}>
        <Grid container direction="column">
          <Grid item style={{ marginTop: "3em" }}>
            <Typography className={classes.textHeadline}>Kommuneinformasjon</Typography>
          </Grid>
          <Grid item>
            {activeMunicipalities.length > 0 ? (
              <Municipalities locations={municipalityData} />
            ) : (
              <Typography>Det er ikke lagt til noe informasjon om kommunene enda</Typography>
            )}
          </Grid>
        </Grid>
        <ScrollToTop maxPagePosition={300} />
      </Container>
      <Footer />
    </>
  );
};

export default Municipality;
