import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import  React, { useState } from "react";
import Datatable from "../common/RecipientTable";
import { RecipientType} from "./Types";

type Props = {
  data: RecipientType[] | [];
  handleRecipientChange: (
    newRecipientRowKey: string,
    newRecipientPartitionKey: string
  ) => void;
};

const Recipient: React.FC<Props> = ({ data, handleRecipientChange }) => {
  const [query, setQuery] = useState("");

  const search = (input: RecipientType[] | []) => {
    const keys = input[0] && Object.keys(input[0]);

    return input.filter(
      (input) =>
        input.contactEmail.toLocaleLowerCase().indexOf(query) > -1 ||
        input.contactFullName.toLocaleLowerCase().indexOf(query) > -1 ||
        input.contactPhoneNumber.toLocaleLowerCase().indexOf(query) > -1 ||
        input.institution.toLocaleLowerCase().indexOf(query) > -1 ||
        input.referenceId.toLocaleLowerCase().indexOf(query) > -1
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
      />
    </Container>
  );
};
export default Recipient;
