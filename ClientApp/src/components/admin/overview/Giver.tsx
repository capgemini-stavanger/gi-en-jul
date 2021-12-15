import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import Datatable from "../common/GiverTable";
import useStyles from "./Styles";
import { GiverType } from "../../../common/components/Types";

type Props = {
  data: GiverType[] | [];
  handleOpen: () => void;
  handleGiverChange: (newGiver: GiverType) => void;
};

const Giver: React.FC<Props> = ({ data, handleGiverChange, handleOpen }) => {
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
        handleOpen={handleOpen}
      ></Datatable>
    </Container>
  );
};
export default React.memo(Giver);
