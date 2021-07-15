import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import * as React from "react";
import { useEffect, useState } from "react";
import Datatable from "../common/RecipientTable";
import { GiverType } from "./Giver";

export interface PersonType {
  partitionKey: string;
  rowKey: string;
  wish: string;
  age: Number;
  gender: Number;
}
export interface RecipientType {
  contactEmail: string;
  contactFullName: string;
  contactPhoneNumber: string;
  dessert: string;
  dinner: string;
  eventName: string;
  familyMembers: PersonType[];
  hasConfirmedMatch: Boolean;
  institution: string;
  isSuggestedMatch: Boolean;
  location: string;
  matchedGiver?: GiverType;
  note: string;
  partitionKey: string;
  referenceId: string;
  rowKey: string;
}

const Recipient = () => {
  const [data, setData] = useState<RecipientType[] | []>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function fetchRecipients() {
      await fetch("./api/admin/recipients", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((errorStack) => {
          console.log(errorStack);
        });
    }
    fetchRecipients();
  }, []);

  const search = (input: RecipientType[] | []) => {
    const keys = input[0] && Object.keys(input[0]);

    return input.filter(
      (input) =>
        input.contactEmail.toLocaleLowerCase().indexOf(q) > -1 ||
        input.contactFullName.toLocaleLowerCase().indexOf(q) > -1 ||
        input.contactPhoneNumber.toLocaleLowerCase().indexOf(q) > -1 ||
        input.institution.toLocaleLowerCase().indexOf(q) > -1 ||
        input.referenceId.toLocaleLowerCase().indexOf(q) > -1
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
            placeholder="Søk etter familie"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Datatable data={search(data)} />
    </Container>
  );
};
export default Recipient;
