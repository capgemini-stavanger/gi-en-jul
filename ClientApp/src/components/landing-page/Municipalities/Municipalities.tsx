import { Container, Grid, Tab } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useEffect, useState } from "react";
import MunicipalityInformation from "./MunicipalityInformation";
import { useLocation, useParams } from "react-router-dom";
import React from "react";

export interface LocationData {
  location: string;
  information: string;
  images: string[];
}

interface Props {
  locations: LocationData[];
}

const Municipalities: React.FC<Props> = ({ locations }) => {
  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };
  const classes = useStyles();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  const [tab, setTab] = useState<string>("");

  const kommuneTabs = locations.map((val) => (
    <Tab
      key={`kommuneTabKey${val.location}`}
      value={val.location.toLowerCase()}
      label={val.location}
    />
  ));

  useEffect(() => {
    const location = query.get("location");
    if (!location && locations.length) {
      setTab(locations[0].location.toLowerCase());
      return;
    }
    if (location) setTab(location);
  }, [location, locations]);

  const kommuneTabPanels = locations.map((val, index) => (
    <TabPanel
      key={`kommunetablpanelKey${val.location.toLowerCase()}`}
      value={val.location.toLowerCase()}
    >
      <MunicipalityInformation
        location={val.location}
        information={val.information}
        images={val.images}
      />
    </TabPanel>
  ));

  return (
    <Container className={classes.sectionContainer}>
      <TabContext value={tab}>
        <TabList onChange={handleChange} centered>
          {kommuneTabs}
        </TabList>
        {kommuneTabPanels}
      </TabContext>
      <Grid container justifyContent="center"></Grid>
    </Container>
  );
};

export default Municipalities;
