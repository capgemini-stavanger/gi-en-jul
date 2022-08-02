import { Container, Grid, Tab } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import MunicipalityInformation from "./MunicipalityInformation";

export interface LocationData {
  location: string;
  information: string;
  image1: string;
  image2: string;
  image3: string;
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
    <Tab key={index} value={String(index + 1)} label={val.location} />
  ));

  const kommuneTabPanels = locations.map((val, index) => (
    <TabPanel key={index + 1} value={String(index + 1)}>
      <MunicipalityInformation
        location={val.location}
        information={val.information}
        image1={val.image1}
        image2={val.image2}
        image3={val.image3}
      />
    </TabPanel>
  ));

  return (
    <Container id="municipality" className={classes.sectionContainer}>
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
