import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import Datatable from "../common/GiverTable";
import { GiverType, SelectedConnectionType } from "./Types";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (
    newGiver: GiverType
  ) => void;
};

const Giver: React.FC<Props> = ({
  data,
  handleGiverChange,
}) => {
  const [query, setQuery] = useState("");

  const search = (input: GiverType[] | []) => {

    return input.filter(
      (input) =>
        input.fullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.email?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.phoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

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
          ></TextField>
        </Grid>
      </Grid>
      <Datatable
        data={search(data)}
        handleGiverChange={handleGiverChange}
      ></Datatable>
    </Container>
  );
};
export default React.memo(Giver);
