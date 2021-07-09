import { Container, Grid, TextField } from "@material-ui/core";
import {Search} from '@material-ui/icons';
import * as React from "react";
import { useEffect, useState } from "react";

export interface RecipientType {
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

const Recipient = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function fetchRecipients() {
      await fetch('./api/admin/allrecipients', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers : { 
            'Content-Type': 'application/json'
           },
      })
        .then((response) =>  {console.log(response.json()) 
        return response.json()} )
        .then((json) => setData(json))
        .catch((errorStack) => {
          console.log(errorStack);
        });
    }
    fetchRecipients();
  }, []);

  const search = (input: [RecipientType] | []) => {
    const keys = input[0] && Object.keys(input[0]);

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
      {/* <Datatable data={search(data)}></Datatable> */}
    </Container>
  );
};
export default Recipient;