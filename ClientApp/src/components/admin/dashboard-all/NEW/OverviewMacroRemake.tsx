import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { GiverType, RecipientType, SelectedConnectionType } from "components/shared/Types";
import { useStyles } from "../Styles";
import GiverDataTable from "./GiverDataTable";
import RecipientDataTable from "./RecipientDataTable";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import OverviewStatistics from "./OverviewStatistics";
import OverviewConnection from "./OverviewConnection";
import RecipientDataCard from "./RecipientDataCard";

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
    setSelectedConnection((prevState) => {
      return {
        ...prevState,
        giver: giver,
      };
    });
    findSuggestions();
  };
  const findSuggestions = () => {
    const suggestedFamilies: RecipientType[] = [];

    // Get one random of each family size
    FAMILY_SIZES.map((sizeObj) => {
      const sizeFilteredList = recipientData.filter(
        (family) => rounUpFamilyMembers(family.familyMembers.length) == sizeObj.value
      );
      const randomFamily = sizeFilteredList[Math.floor(Math.random() * sizeFilteredList.length)];
      suggestedFamilies.push(randomFamily);
    });

    setSuggestionData(suggestedFamilies);
  };
  const rounUpFamilyMembers = (famSize: number) => {
    const matchFamilySize = FAMILY_SIZES.find((famObj) => famObj.value >= famSize)?.value;

    return matchFamilySize;
  };

  const handleSelectedRecipient = (recipient: RecipientType) => {
    setSelectedConnection((prevState) => {
      return {
        ...prevState,
        recipient: recipient,
      };
    });
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
          setSelectedConnection(initState);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
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
              <Box>
                <Typography variant="h4">Dashboard</Typography>
                <Typography>Finn, søk og koble sammen familier og givere</Typography>
                <Button onClick={() => console.log(suggestionData)}> CHECK </Button>
              </Box>
              <Box className={classes.dashboardConnectBox}>
                <Box className={classes.dashBoardConnection}>
                  <OverviewConnection
                    connection={selectedConnection}
                    connectGiverRecipient={connectGiverRecipient}
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
                />
              </Box>
              <Box className={classes.recipientTable}>
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
            {suggestionData.length > 0 && (
              <Box className={classes.suggestionData}>
                {suggestionData.map((suggestion, index) => {
                  <RecipientDataCard
                    recipientData={suggestion}
                    recipientIndex={index}
                    selectedRecipientIndex={selectedSuggestionIndex}
                    setSelectedRecipient={() => handleSelectedRecipient(suggestion)}
                    setSelectedRecipientIndex={() => handleVisualSelection(index, false)}
                  />;
                })}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default OverviewMacroRemake;
