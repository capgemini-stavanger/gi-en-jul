import { Box, Divider, Grid, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
import { GiverType, User } from "../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import GiverDataCard from "./GiverDataCard";
import { Search } from "@material-ui/icons";
import { CONNECTION_COLORS } from "common/constants/ConnectionColors";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LinkIcon from "@material-ui/icons/Link";

type Props = {
  giverData: GiverType[];
  selectedGiverIndex: number;
  setSelectedGiver: (giver: GiverType) => void;
  setSelectedGiverIndex: (idx: number) => void;
  refreshData: () => void;
  accessToken: string;
  resetSelections: () => void;
  requestState: number;
  setRequestState: (state: number) => void;
  user: User;
};

const GiverDataTable: React.FC<Props> = ({
  giverData,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
  refreshData,
  accessToken,
  resetSelections,
  requestState,
  setRequestState,
  user,
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [familySize, setFamilySize] = useState(-1);
  const [color, setColor] = useState("alle");

  const searchFilter = (input: GiverType[] | []) => {
    return input.filter(
      (input) =>
        input.fullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.email?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.phoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  const familyFilter = (input: GiverType[] | []) => {
    if (familySize == -1) {
      return input; // Unfiltered
    } else {
      return input.filter((input) => input.maxReceivers == familySize);
    }
  };
  const colorFilter = (input: GiverType[] | []) => {
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

  const allFilters = (input: GiverType[] | []) => {
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
        Givere
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.tableHeadingSpace}
        spacing={1}
      >
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
        totalCount={allFilters(giverData).length}
        style={{ marginBottom: "2em" }}
        itemContent={(index) => (
          <GiverDataCard
            giverData={allFilters(giverData)[index]}
            giverIndex={index}
            selectedGiverIndex={selectedGiverIndex}
            setSelectedGiver={() => setSelectedGiver(allFilters(giverData)[index])}
            setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
            refreshData={refreshData}
            accessToken={accessToken}
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
export default React.memo(GiverDataTable);
