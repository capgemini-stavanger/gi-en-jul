import { Box, Divider, Grid, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
import { RecipientType, User } from "../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import RecipientDataCard from "./RecipientDataCard";
import { Search } from "@material-ui/icons";
import { CONNECTION_COLORS } from "common/constants/ConnectionColors";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LinkIcon from "@material-ui/icons/Link";

type Props = {
  recipientData: RecipientType[];
  selectedRecipientIndex: number;
  setSelectedRecipient: (giver: RecipientType) => void;
  setSelectedRecipientIndex: (idx: number) => void;
  refreshData: () => void;
  resetSelections: () => void;
  requestState: number;
  setRequestState: (state: number) => void;
  user: User;
};

const RecipientDataTable: React.FC<Props> = ({
  recipientData,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
  refreshData,
  resetSelections,
  requestState,
  setRequestState,
  user,
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [familySize, setFamilySize] = useState(-1);
  const [color, setColor] = useState("alle");

  const searchFilter = (input: RecipientType[]) => {
    return input.filter(
      (input) =>
        input.contactEmail?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactFullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactPhoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.institution?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.referenceId?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.familyId.toString()?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  const rounUpFamilyMembers = (famSize: number) => {
    const matchFamilySize = FAMILY_SIZES.find((famObj) => famObj.value >= famSize)?.value;
    return matchFamilySize;
  };
  const familyFilter = (input: RecipientType[]) => {
    if (familySize == -1) {
      return input; // Unfiltered
    } else {
      return input.filter((input) => rounUpFamilyMembers(input.familyMembers.length) == familySize);
    }
  };
  const colorFilter = (input: RecipientType[]) => {
    if (color == "Rød") {
      return input.filter((input) => !input.isSuggestedMatch && !input.hasConfirmedMatch);
    } else if (color == "Gul") {
      return input.filter((input) => input.isSuggestedMatch && !input.hasConfirmedMatch);
    } else if (color == "Grønn") {
      return input.filter((input) => input.isSuggestedMatch && input.hasConfirmedMatch);
    } else {
      return input; // Unfiltered
    }
  };

  const allFilters = (input: RecipientType[]) => {
    let filteredInput = input;
    filteredInput = searchFilter(filteredInput);
    filteredInput = familyFilter(filteredInput);
    filteredInput = colorFilter(filteredInput);
    return filteredInput;
  };

  const onFamSizeChange = (e: React.ChangeEvent<any>) => {
    setFamilySize(e.target.value);
  };

  const onColorChange = (e: React.ChangeEvent<any>) => {
    setColor(e.target.value);
  };

  return (
    <>
      <Typography align="center" variant="h5">
        Familier
      </Typography>
      <Grid container direction="row" alignItems="center" className={classes.tableHeadingSpace}>
        <Grid item xs={4}>
          <Box className={classes.gridBoxCenter}>
            <Search />
            <TextField
              placeholder="Søk her"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="outlined"
              margin="dense"
              className={classes.inputHeight}
            ></TextField>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.gridBoxCenter}>
            <PeopleOutlineIcon />
            <Select
              value={familySize}
              onChange={onFamSizeChange}
              variant="outlined"
              className={classes.inputHeight}
            >
              <MenuItem value={-1}>Alle</MenuItem>
              {FAMILY_SIZES.map((famObj, index) => {
                return (
                  <MenuItem key={index} value={famObj.value}>
                    {famObj.text}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.gridBoxCenter}>
            <LinkIcon />
            <Select
              value={color}
              onChange={onColorChange}
              variant="outlined"
              className={classes.inputHeight}
            >
              <MenuItem value={"alle"}>Alle</MenuItem>
              {CONNECTION_COLORS.map((colObj, index) => {
                return (
                  <MenuItem key={index} value={colObj.value}>
                    {colObj.text}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      <Virtuoso
        totalCount={allFilters(recipientData).length}
        itemContent={(index) => (
          <RecipientDataCard
            recipientData={allFilters(recipientData)[index]}
            recipientIndex={index}
            selectedRecipientIndex={selectedRecipientIndex}
            setSelectedRecipient={() => setSelectedRecipient(allFilters(recipientData)[index])}
            setSelectedRecipientIndex={() => setSelectedRecipientIndex(index)}
            refreshData={refreshData}
            resetSelections={resetSelections}
            requestState={requestState}
            setRequestState={(state) => setRequestState(state)}
            user={user}
          />
        )}
      />
    </>
  );
};
export default React.memo(RecipientDataTable);
