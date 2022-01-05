import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import Datatable from "./GiverTable";
import useStyles from "./Styles";
import { GiverType } from "../../shared/Types";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiver: GiverType) => void;
  refreshData: () => void;
};

const Giver: React.FC<Props> = ({ data, handleGiverChange, refreshData }) => {
  const [query, setQuery] = useState("");

  const search = (input: GiverType[] | []) => {
    return input.filter(
      (input) =>
        input.fullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.email?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.phoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
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
            placeholder="Søk etter giver"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.searchField}
          ></TextField>
        </Grid>
      </Grid>
      <Datatable
        data={search(data)}
        handleGiverChange={handleGiverChange}
        refreshData={refreshData}
      ></Datatable>
    </Container>
  );
};
export default React.memo(Giver);