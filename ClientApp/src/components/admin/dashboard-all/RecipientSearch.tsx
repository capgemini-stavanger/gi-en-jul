import { Container, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import useStyles from "./Styles";
import Datatable from "./RecipientTable";
import { RecipientType } from "components/shared/Types";
import { FAMILY_SIZES } from "common/constants/FamilySizes";
import { CONNECTION_COLORS } from "common/constants/ConnectionColors";
import { PersonType } from "components/institution/NewDesign/RegistrationFormTypes";

type Props = {
  data: RecipientType[] | [];
  refreshData: () => void;
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const Recipient: React.FC<Props> = ({ data, refreshData, handleRecipientChange }) => {
  const [query, setQuery] = useState("");
  const [familySize, setFamilySize] = useState(-1);
  const [color, setColor] = useState("alle");

  const searchFilter = (input: RecipientType[] | []) => {
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
  const familyFilter = (input: RecipientType[] | []) => {
    if (familySize == -1) {
      return input; // Unfiltered
    } else {
      return input.filter((input) => rounUpFamilyMembers(input.familyMembers.length) == familySize);
    }
  };
  const colorFilter = (input: RecipientType[] | []) => {
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

  const allFilters = (input: RecipientType[] | []) => {
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
      <Grid container>
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Søk etter familie"
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
        refreshData={() => refreshData()}
        handleRecipientChange={handleRecipientChange}
      />
    </Container>
  );
};
export default React.memo(Recipient);
