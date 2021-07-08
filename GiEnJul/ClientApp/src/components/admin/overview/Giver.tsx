import { Container } from "@material-ui/core";
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

  return (
    <Container>
      <Datatable data={data}></Datatable>
    </Container>
  );
};
export default Giver;
