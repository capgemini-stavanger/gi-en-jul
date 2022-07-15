import { Box, Container, Typography } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { GiverType, RecipientType } from "components/shared/Types";
import { useStyles } from "./Styles";
import GiverSearchRemake from "./GiverSearchRemake";

interface IOverviewMacro {
  location: string;
  accessToken: string;
}

// TESTING
interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}
const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};

const OverviewMacroRemake: React.FC<IOverviewMacro> = ({ accessToken, location }) => {
  const [giverData, setGiverData] = useState<GiverType[] | []>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService(accessToken);

  // TESTING
  const [selectedGiverIndex, setSelectedGiverIndex] = useState(-1);
  const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);

  // GOES INTO NEW COMPONENT
  const classes = useStyles();

  async function fetchGivers() {
    await apiservice
      .get("admin/Overview/Givers", { params: { location: location } })
      .then((resp) => {
        setGiverData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }
  async function fetchRecipients() {
    await apiservice
      .get("admin/Overview/Recipients", { params: { location: location } })
      .then((resp) => {
        setRecipientData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  useEffect(() => {
    fetchRecipients();
    fetchGivers();
  }, []);

  return (
    <>
      <Box className={classes.entireDashboard}>
        <Box className={classes.oversiktBox}>Oversikt/Ny Component</Box>
        <Container>
          <Box className={classes.dashboardBox}>
            <Box className={classes.infoBox}>
              <Box className={classes.dashboardInfo}>
                <Typography variant="h4">Dashboard</Typography>
                <Typography>Good stuff</Typography>
              </Box>
              <Box className={classes.dashboardConnectBox}>
                <Box className={classes.dashBoardConnection}>Valgt Kobling/Ny Component</Box>
              </Box>
            </Box>
            <Box className={classes.tableBox}>
              <Box className={classes.giverTable}>
                GIVER FILTER
                {giverData.map((giver, index) => {
                  return (
                    <GiverSearchRemake
                      key={index}
                      giverData={giver}
                      giverIndex={index}
                      selectedGiverIndex={selectedGiverIndex}
                      setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
                    />
                  );
                })}
              </Box>
              <Box className={classes.recipientTable}>
                <Box className={classes.test1}>SUGGESTIONS</Box>
                <Box className={classes.test2}>RECIPIENT</Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default OverviewMacroRemake;
