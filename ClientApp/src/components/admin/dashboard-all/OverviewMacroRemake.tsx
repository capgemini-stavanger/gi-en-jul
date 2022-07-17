import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { GiverType, RecipientType } from "components/shared/Types";
import { useStyles } from "./Styles";
import GiverTableRemake from "./GiverTableRemake";

interface IOverviewMacro {
  location: string;
  accessToken: string;
}

/*
interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}
const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};
*/

const OverviewMacroRemake: React.FC<IOverviewMacro> = ({ accessToken, location }) => {
  const [giverData, setGiverData] = useState<GiverType[]>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const apiservice = new ApiService(accessToken);

  const [selectedGiverIndex, setSelectedGiverIndex] = useState(-1);
  // DO WE NEED A SELECTED IF WE KNOW THE INDEX OF SELECTED?

  //const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);

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
              {/* SHOULD THE COMPONENT BE GENERAL FOR GIVER AND RECIPIENT? */}
              <GiverTableRemake
                giverData={giverData}
                selectedGiverIndex={selectedGiverIndex}
                setSelectedGiverIndex={(idx) => setSelectedGiverIndex(idx)}
              />
              <Box className={classes.recipientTable}>
                <Box className={classes.suggestionData}>SUGGESTIONS</Box>
                <Box className={classes.recipientData}>RECIPIENT</Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default OverviewMacroRemake;
