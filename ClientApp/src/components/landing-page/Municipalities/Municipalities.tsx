import { Container, Grid, Tab } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useEffect, useState } from "react";
import MunicipalityInformation from "./MunicipalityInformation";
import React from "react";
import useIsMobile from "hooks/useIsMobile";
import useGetSearchParams from "hooks/useGetSearchParam";

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
  const isMobile = useIsMobile();
  const getSearchParam = useGetSearchParams();

  const [tab, setTab] = useState<string>(
    getSearchParam("location") ?? locations.length ? locations[0].location.toLocaleLowerCase() : ""
  );

  useEffect(() => {
    if (tab === "")
      setTab(
        getSearchParam("location") ?? locations.length
          ? locations[0].location.toLocaleLowerCase()
          : ""
      );
  }, [locations]);
  useEffect(() => {
    const loc = getSearchParam("location");
    if (loc && locations.map((l) => l.location.toLowerCase()).includes(loc)) {
      setTab(loc);
      return;
    }
  }, [getSearchParam]);

  const kommuneTabs = locations.map((val) => (
    <Tab
      key={`kommuneTabKey${val.location}`}
      value={val.location.toLowerCase()}
      label={val.location}
    />
  ));

  const kommuneTabPanels = locations.map((val) => (
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
        <TabList
          onChange={handleChange}
          variant={
            (isMobile && locations.length > 4) || locations.length > 7 ? "scrollable" : "standard"
          }
          centered={(isMobile && locations.length > 4) || locations.length > 7 ? false : true}
          scrollButtons="auto"
        >
          {kommuneTabs}
        </TabList>
        {kommuneTabPanels}
      </TabContext>
      <Grid container justifyContent="center"></Grid>
    </Container>
  );
};

export default Municipalities;
