import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, {useState } from "react";
import Datatable from "../common/GiverTable";
import { GiverType } from "./Types";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (
    newGiverRowKey: string,
    newGiverPartitionKey: string
  ) => void;
};

const Giver: React.FC<Props> = ({ data, handleGiverChange }) => {
  const [query, setQuery] = useState("");

  const search = (input: GiverType[] | []) => {
    const keys = input[0] && Object.keys(input[0]);

    return input.filter(
      (input) =>
        input?.fullName.toLocaleLowerCase().indexOf(query) > -1 ||
        input?.email.toLocaleLowerCase().indexOf(query) > -1 ||
        input?.phoneNumber.toLocaleLowerCase().indexOf(query) > -1
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
export default Giver;
