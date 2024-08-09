import { Container, Grid, Typography } from "@material-ui/core";
import ScrollToTop from "components/shared/ScrollToTop";
import useStyles from "components/landing-page/Styles";
import { useState, useEffect, useCallback } from "react";
import ApiService from "common/functions/apiServiceClass";
import NavBarPublic from "components/shared/navbar/NavBarPublic";
import Municipalities, {
  LocationData,
} from "components/landing-page/Municipalities/Municipalities";
import Footer from "components/shared/Footer";

interface IKommuneInfoResponse {
  country: string;
  name: string;
  information: string;
  image: string;
  isActive: boolean;
  email: string;
  images: string[];
}

const Municipality = () => {
  const [activeMunicipalities, setActiveMunicipalities] = useState<string[]>([]);
  const [municipalityMap, setMunicipalityMap] = useState(new Map<string, IKommuneInfoResponse>());
  const [municipalityData, setMunicipalityData] = useState<LocationData[]>([]);
  const [fallbackText, setFallbackText] = useState("Henter informasjon...");

  const classes = useStyles();
  const apiservice = new ApiService();

  const fetchActiveLocations = useCallback(() => {
    apiservice
      .get("Municipality/Active", {})
      .then((resp) => {
        setActiveMunicipalities(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }, [setActiveMunicipalities]);

  const fetchKommuneInformation = useCallback(() => {
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
      })
      .finally(() => {
        setFallbackText("Det er ikke lagt til noe informasjon om kommunene enda");
      });
  }, [setMunicipalityMap]);

  const buildLocationData = () => {
    const tempLocationData: LocationData[] = [];

    activeMunicipalities.forEach((location: string) => {
      let info = municipalityMap.get(location)?.information;
      if (info === undefined) {
        info = "Ingen informasjon om denne kommunen enda";
      }
      let images = municipalityMap.get(location)?.images;

      if (images === undefined) {
        images = [];
      }
      tempLocationData.push({
        location: location,
        information: info,
        images: images,
      });
      setMunicipalityData(tempLocationData);
    });
  };

  useEffect(fetchActiveLocations, []);
  useEffect(fetchKommuneInformation, []);
  useEffect(buildLocationData, [activeMunicipalities, municipalityMap]);

  return (
    <div style={{ minHeight: "100lvh", display: "flex", flexDirection: "column" }}>
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
              <Typography>{fallbackText}</Typography>
            )}
          </Grid>
        </Grid>
        <ScrollToTop maxPagePosition={300} />
      </Container>
      <Footer />
    </div>
  );
};

export default Municipality;
