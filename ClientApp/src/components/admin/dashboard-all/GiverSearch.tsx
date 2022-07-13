import { Container, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import Datatable from "./GiverTable";
import useStyles from "./Styles";
import { GiverType } from "../../shared/Types";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import { CONNECTION_COLORS } from "common/constants/ConnectionColors";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiver: GiverType) => void;
  refreshData: () => void;
};

const Giver: React.FC<Props> = ({ data, handleGiverChange, refreshData }) => {
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

  const classes = useStyles();

  return (
    <Container>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Søk etter giver"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.searchField}
          ></TextField>
        </Grid>
        <Grid item>
          <InputLabel htmlFor="fam-str" shrink>
            Familie Størrelse
          </InputLabel>
          <Select
            inputProps={{
              name: "familie",
              id: "fam-str",
            }}
            value={familySize}
            onChange={onFamSizeChange}
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
        </Grid>
        <Grid item>
          <InputLabel htmlFor="color" shrink>
            Farge
          </InputLabel>
          <Select
            inputProps={{
              name: "color",
              id: "color",
            }}
            value={color}
            onChange={onColorChange}
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
        </Grid>
      </Grid>
      <Datatable
        data={allFilters(data)}
        handleGiverChange={handleGiverChange}
        refreshData={refreshData}
      ></Datatable>
    </Container>
  );
};
export default React.memo(Giver);
