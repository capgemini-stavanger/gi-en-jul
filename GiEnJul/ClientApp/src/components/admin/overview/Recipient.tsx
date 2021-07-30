import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import Datatable from "../common/RecipientTable";
import { RecipientType, SelectedConnectionType } from "./Types";

type Props = {
  data: RecipientType[] | [];
  handleRecipientChange: (
    newRecipient: RecipientType
  ) => void;
  selectedConnection: SelectedConnectionType;
};

const Recipient: React.FC<Props> = ({
  data,
  handleRecipientChange,
  selectedConnection,
}) => {
  const [query, setQuery] = useState("");

  const search = (input: RecipientType[] | []) => {
    return input.filter(
      (input) =>
        input.contactEmail?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactFullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactPhoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.institution?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.referenceId?.toLowerCase().indexOf(query.toLowerCase()) > -1
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Datatable
        data={search(data)}
        handleRecipientChange={handleRecipientChange}
        selectedConnection={selectedConnection}
      />
    </Container>
  );
};
export default React.memo(Recipient);
