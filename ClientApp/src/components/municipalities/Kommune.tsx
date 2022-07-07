import { Typography, Container, Grid, Tab, Button } from "@material-ui/core";
import useStyles from "./Styles";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import KommuneContainer from "components/superadmin/kommune/KommuneContainer";
import Information from "./Information";

export interface LocationData {
  location: string;
  information: string;
}

interface Props {
  locations: LocationData[];
}

const Kommunes: React.FC<Props> = ({ locations }) => {
  const [tab, setTab] = useState<string>("0");
  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };
  const classes = useStyles();

  // <TabContext value={tab}>
  //   <TabList onChange={handleChange} centered>
  //     <Tab label="FAQ" value="1" />
  //     <Tab label="Kommune Informasjon" value="2" />
  //     <Tab label="Bedrift" value="3" />
  //     <Tab label="Legg til/Slett Brukere" value="34" />
  //   </TabList>
  //   <TabPanel value="1">
  //     <Typography>Placeholder - FAQ</Typography>
  //   </TabPanel>
  //   <TabPanel value="2">
  //     <KommuneContainer accessToken={accessToken} />
  //   </TabPanel>
  //   <TabPanel value="3">
  //     <BusinessInformation accessToken={accessToken} />
  //   </TabPanel>
  //   <TabPanel value="4">
  //     <Typography>Placeholder - Legg til/Slett Brukere</Typography>
  //   </TabPanel>
  // </TabContext>;

  const kommuneTabs = locations.map((val, index) => (
    <Tab key={index} value={String(index + 1)} label={val.location} />
  ));

  const kommuneTabPanels = locations.map((val, index) => (
    <TabPanel key={index + 1} value={String(index + 1)}>
      <Information location={val.location} information={val.information} />
    </TabPanel>
  ));
  // placeholer until user selects a kommune
  kommuneTabPanels.push(
    <TabPanel key={0} value={"0"}>
      {" "}
      Velg en kommune ...{" "}
    </TabPanel>
  );

  return (
    <Container id="municipality" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>Kommuner</Typography>
      </div>
      <TabContext value={tab}>
        <TabList onChange={handleChange} centered>
          {/* <TabPanel value="0">
            <Typography>Velg en kommune...</Typography>
          </TabPanel> */}
          {kommuneTabs}
        </TabList>
        {kommuneTabPanels}
      </TabContext>
      <Grid container justifyContent="center"></Grid>
    </Container>
  );
};

// const old = Array.from(locations).map((val, index) => (
//   <Grid className={classes.municipalityItem} key={index}>
//     <Accordion expanded={expanded === index.toString()} onChange={handleChange(index.toString())}>
//       <AccordionSummary
//         className={classes.municipalitySummary}
//         expandIcon={<ExpandMoreIcon className={classes.municipalitySummary} />}
//       >
//         <Typography>{val.location}</Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Information location={val.location} information={val.information} />
//       </AccordionDetails>
//     </Accordion>
//   </Grid>
// ));

export default Kommunes;
