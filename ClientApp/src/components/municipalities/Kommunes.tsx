import { Container, Grid, Tab } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import KommuneInformation from "./KommuneInformation";

export interface LocationData {
  location: string;
  information: string;
}

interface Props {
  locations: LocationData[];
}

const Kommunes: React.FC<Props> = ({ locations }) => {
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
      <KommuneInformation location={val.location} information={val.information} />
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

export default Kommunes;
