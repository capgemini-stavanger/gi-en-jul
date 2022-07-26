import { Box, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { GiverType, RecipientType, SelectedConnectionType } from "components/shared/Types";
import { useStyles } from "./Styles";
import GiverDataTable from "./GiverDataTable";
import RecipientDataTable from "./RecipientDataTable";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import OverviewStatistics from "./OverviewStatistics";
import OverviewConnection from "./OverviewConnection";
import SuggestionDataTable from "./SuggestionDataTable";

interface IOverviewMacro {
  location: string;
  accessToken: string;
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

  const refreshData = () => {
    fetchGivers();
    fetchRecipients();
    setSelectedConnection(initState);
  };

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
    if (giver.isSuggestedMatch || giver.hasConfirmedMatch) {
      setSelectedConnection((prevState) => {
        return {
          ...prevState,
          giver: undefined,
        };
      });
      setSuggestionData([]);
    } else {
      setSelectedConnection((prevState) => {
        return {
          ...prevState,
          giver: giver,
        };
      });
      findSuggestions();
    }
  };
  const findSuggestions = () => {
    const suggestedFamilies: RecipientType[] = [];

    // Get one random of each family size
    FAMILY_SIZES.map((sizeObj) => {
      const connectionFilteredList = recipientData.filter(
        (family) => !family.isSuggestedMatch && !family.hasConfirmedMatch
      );
      const sizeFilteredList = connectionFilteredList.filter(
        (family) => rounUpFamilyMembers(family.familyMembers.length) == sizeObj.value
      );
      const randomFamily = sizeFilteredList[Math.floor(Math.random() * sizeFilteredList.length)];
      if (randomFamily) {
        suggestedFamilies.push(randomFamily);
      }
    });

    setSuggestionData(suggestedFamilies);
  };
  const rounUpFamilyMembers = (famSize: number) => {
    const matchFamilySize = FAMILY_SIZES.find((famObj) => famObj.value >= famSize)?.value;
    return matchFamilySize;
  };

  const handleSelectedRecipient = (recipient: RecipientType) => {
    if (recipient.isSuggestedMatch || recipient.hasConfirmedMatch) {
      setSelectedConnection((prevState) => {
        return {
          ...prevState,
          recipient: undefined,
        };
      });
    } else {
      setSelectedConnection((prevState) => {
        return {
          ...prevState,
          recipient: recipient,
        };
      });
    }
  };

  const connectGiverRecipient = async () => {
    await apiservice
      .post(
        "admin/",
        JSON.stringify({
          GiverId: selectedConnection.giver?.giverId,
          Event: selectedConnection.giver?.event,
          RecipientId: selectedConnection.recipient?.recipientId,
        })
      )
      .then((response) => {
        //use this for sending a response to the user
        if (response.status === 200) {
          fetchRecipients();
          fetchGivers();
          resetSelections();
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const resetSelections = () => {
    setSelectedConnection(initState);
    setSuggestionData([]);
    setSelectedGiverIndex(-1);
    setSelectedRecipientIndex(-1);
    setSelectedSuggestionIndex(-1);
  };

  return (
    <>
      <Box className={classes.entireDashboard}>
        <Box className={classes.oversiktBox}>
          <OverviewStatistics givers={giverData} recipients={recipientData} />
        </Box>
        <Container>
          <Box className={classes.dashboardBox}>
            <Box className={classes.infoBox}>
              <Box className={classes.dashboardConnectBox}>
                <Box className={classes.dashBoardConnection}>
                  <OverviewConnection
                    connection={selectedConnection}
                    connectGiverRecipient={connectGiverRecipient}
                    resetSelections={resetSelections}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={classes.tableBox}>
              <Box className={classes.giverTable}>
                <GiverDataTable
                  giverData={giverData}
                  selectedGiverIndex={selectedGiverIndex}
                  setSelectedGiver={(giver) => handleSelectedGiver(giver)}
                  setSelectedGiverIndex={(index) => setSelectedGiverIndex(index)}
                  refreshData={() => refreshData()}
                  accessToken={accessToken}
                  resetSelections={resetSelections}
                />
              </Box>
              <Box className={classes.recipientTable}>
                {suggestionData.length > 0 && (
                  <Box className={classes.suggestionData}>
                    <SuggestionDataTable
                      suggestionData={suggestionData}
                      selectedSuggestionIndex={selectedSuggestionIndex}
                      setSelectedSuggestion={(suggestion) => handleSelectedRecipient(suggestion)}
                      setSelectedSuggestionIndex={(index) => handleVisualSelection(index, true)}
                    />
                  </Box>
                )}
                <Box className={classes.recipientData}>
                  <RecipientDataTable
                    recipientData={recipientData}
                    selectedRecipientIndex={selectedRecipientIndex}
                    setSelectedRecipient={(recipient) => handleSelectedRecipient(recipient)}
                    setSelectedRecipientIndex={(index) => handleVisualSelection(index, false)}
                    refreshData={() => refreshData()}
                    accessToken={accessToken}
                    resetSelections={resetSelections}
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
