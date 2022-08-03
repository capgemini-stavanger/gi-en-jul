import { Container, Grid, Tab } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import MunicipalityInformation from "./MunicipalityInformation";

export interface LocationData {
  location: string;
  information: string;
  images: string[];
}

interface Props {
  locations: LocationData[];
}

const Municipalities: React.FC<Props> = ({ locations }) => {
  const [tab, setTab] = useState<string>("1");
  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };
  const classes = useStyles();

  const kommuneTabs = locations.map((val, index) => (
    <Tab key={`kommuneTabKey${val.location}`} value={String(index + 1)} label={val.location} />
  ));

  const kommuneTabPanels = locations.map((val, index) => (
    <TabPanel key={`kommunetablpanelKey${val.location}`} value={String(index + 1)}>
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
