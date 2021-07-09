import { Container, Grid, TextField } from "@material-ui/core";
import {Search} from '@material-ui/icons';
import * as React from "react";
import { useEffect, useState } from "react";
import Datatable from "../common/Datatable";

export interface GiverType {
  email: string;
  eventName: string;
  fullName: string;
  hasConfirmedMatch: Boolean;
  isSuggestedMatch: Boolean;
  location: string;
  matchedRecipient?: string;
  maxRecievers: Number;
  partitionKey: string;
  rowKey: string;
  phoneNumber: string;
}

const Giver = () => {
  const [data, setData] = useState<[GiverType] | []>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function fetchGivers() {
      await fetch("api/admin/allgivers", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          return setData(json);
        })
        .catch((errorStack) => {
          console.log(errorStack);
        });
    }
    fetchGivers();
  }, []);

  const search = (input: [GiverType] | []) => {
    const keys = input[0] && Object.keys(input[0]);
    console.log(keys);

    return input.filter(
      (input) =>
        input.fullName.toLocaleLowerCase().indexOf(q) > -1 ||
        input.email.toLocaleLowerCase().indexOf(q) > -1 ||
        input.phoneNumber.toLocaleLowerCase().indexOf(q) > -1
    );
  };

  return (
    <Container>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <TextField
            placeholder="Søk etter giver"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Datatable data={search(data)}></Datatable>
    </Container>
  );
};
export default Giver;
