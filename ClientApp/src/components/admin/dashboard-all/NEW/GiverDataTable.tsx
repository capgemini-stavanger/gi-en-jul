import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../Styles";
import { GiverType } from "../../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import GiverDataCard from "./GiverDataCard";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Search } from "@material-ui/icons";
import { CONNECTION_COLORS } from "common/constants/ConnectionColors";
import { FAMILY_SIZES } from "common/constants/FamilySizes";

type Props = {
  giverData: GiverType[];
  selectedGiverIndex: number;
  setSelectedGiver: (giver: GiverType) => void;
  setSelectedGiverIndex: (idx: number) => void;
};

const GiverDataTable: React.FC<Props> = ({
  giverData,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
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
      <Grid container direction="row" xs={12}>
        <Grid item xs={2}>
          <Typography variant="h5">Givere</Typography>
        </Grid>
        <Grid item xs={4}>
          <Search />
          <TextField
            placeholder="Søk her"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={3}>
          <InputLabel htmlFor="color" shrink>
            Tilstand
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

      <Virtuoso
        totalCount={giverData.length}
        itemContent={(index) => (
          <GiverDataCard
            giverData={giverData[index]}
            giverIndex={index}
            selectedGiverIndex={selectedGiverIndex}
            setSelectedGiver={() => setSelectedGiver(giverData[index])}
            setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
          />
        )}
      />
    </>
  );
};
export default GiverDataTable;
