import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as React from "react";
import Circle from "../common/Circle";
import ConnectionsField from "./ConnectionsField";
import ConnectionStyle from "./ConnectionStyles";

interface ICompletedProps {
  //Need to implement connections dict
  // The information should come from the macrocomponent
}

const Completed: React.FC<ICompletedProps> = (props) => {
  const classes = ConnectionStyle();
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="ConnectionsAccord"
        >
          <Box display="flex" className={classes.heading} align-items="center">
            <Typography component="h4" className={classes.items}>
              FULLFØRTE KOBLINGER
            </Typography>
          </Box>
          <Box
            display="flex"
            className={classes.heading}
            justifyContent="center"
          >
            <Box display="flex" className={classes.confirmedBox}>
              <Circle prop1={"green"} />
              <Typography component="h5" className={classes.items}>
                Bekreftet
              </Typography>
            </Box>
            <Box display="flex" className={classes.confirmedBox}>
              <Circle prop1={"yellow"} />
              <Typography className={classes.items}>Ikke Bekreftet</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={classes.downwardsContainer}>
            <Box className={classes.container} justifyContent="flex-end">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Typography component="h1" className={classes.items}>
                    Familie
                  </Typography>
                </Grid>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
                <Grid item xs></Grid>
                <Grid item xs>
                  <Typography component="h1" className={classes.items}>
                    Giver
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box display="flex" className={classes.root}>
              <Box className={classes.searchBoxL} display="flex">
                <Typography id="filterText" className={classes.filterItem}>
                  Familie nummer
                </Typography>
                <Typography id="filterText" className={classes.filterItem}>
                  Antall
                </Typography>
              </Box>
              <Box className={classes.searchBoxR} display="flex">
                <Typography id="filterText" className={classes.filterItem}>
                  Navn
                </Typography>
                <Typography id="filterText" className={classes.filterItem}>
                  Status
                </Typography>
              </Box>
            </Box>
            <ConnectionsField
              personcount={5}
              recipientnumber={"NAV2ET"}
              giverfullname={"Olav Hansen"}
              status={false}
            />
            <ConnectionsField
              personcount={3}
              recipientnumber={"BARNQS"}
              giverfullname={"Johann Refsnes"}
              status={true}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Completed;
