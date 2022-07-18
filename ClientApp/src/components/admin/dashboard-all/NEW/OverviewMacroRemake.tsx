import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { GiverType, RecipientType } from "components/shared/Types";
import { useStyles } from "../Styles";
import GiverDataTable from "./GiverDataTable";
import RecipientDataTable from "./RecipientDataTable";

interface IOverviewMacro {
  location: string;
  accessToken: string;
}

interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}
const initState: SelectedConnectionType = {
  giver: undefined,
  recipient: undefined,
};

const OverviewMacroRemake: React.FC<IOverviewMacro> = ({ accessToken, location }) => {
  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

  const [giverData, setGiverData] = useState<GiverType[]>([]);
  const [recipientData, setRecipientData] = useState<RecipientType[]>([]);
  const [suggestionData, setSuggestionData] = useState<RecipientType[]>([]);

  const [selectedGiverIndex, setSelectedGiverIndex] = useState(-1);
  const [selectedRecipientIndex, setSelectedRecipientIndex] = useState(-1);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);

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

  const handleVisualSelection = (index: number, suggestionTable: boolean) => {
    // Need to reset the visual selection of the other table, since they have seperate indexes
    if (suggestionTable) {
      setSelectedSuggestionIndex(index);
      setSelectedRecipientIndex(-1);
    } else {
      setSelectedRecipientIndex(index);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSelectedGiver = (giver: GiverType) => {
    setSelectedConnection((prevState) => {
      return {
        ...prevState,
        giver: giver,
      };
    });
    findSuggestions(giver);
  };
  const findSuggestions = (giver: GiverType) => {
    const suggestData = recipientData.slice(0, 3);
    setSuggestionData(suggestData);

    const filterSize = giver.maxReceivers;
    //const filterData = recipientData.filter((family) => family.maxReceivers == filterSize);
  };

  const handleSelectedRecipient = (recipient: RecipientType) => {
    setSelectedConnection((prevState) => {
      return {
        ...prevState,
        recipient: recipient,
      };
    });
  };

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
                <Button onClick={() => console.log(selectedConnection)}> CHECK </Button>
              </Box>
              <Box className={classes.dashboardConnectBox}>
                <Box className={classes.dashBoardConnection}>Valgt Kobling/Ny Component</Box>
              </Box>
            </Box>
            <Box className={classes.tableBox}>
              <Box className={classes.giverTable}>
                <GiverDataTable
                  giverData={giverData}
                  selectedGiverIndex={selectedGiverIndex}
                  setSelectedGiver={(giver) => handleSelectedGiver(giver)}
                  setSelectedGiverIndex={(index) => setSelectedGiverIndex(index)}
                />
              </Box>
              <Box className={classes.recipientTable}>
                {suggestionData.length > 0 && (
                  <Box className={classes.suggestionData}>
                    SUGGESTION
                    <RecipientDataTable
                      recipientData={suggestionData}
                      selectedRecipientIndex={selectedSuggestionIndex}
                      setSelectedRecipient={(recipient) => handleSelectedRecipient(recipient)}
                      setSelectedRecipientIndex={(index) => handleVisualSelection(index, true)}
                    />
                  </Box>
                )}
                <Box className={classes.recipientData}>
                  <RecipientDataTable
                    recipientData={recipientData}
                    selectedRecipientIndex={selectedRecipientIndex}
                    setSelectedRecipient={(recipient) => handleSelectedRecipient(recipient)}
                    setSelectedRecipientIndex={(index) => handleVisualSelection(index, false)}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default OverviewMacroRemake;
