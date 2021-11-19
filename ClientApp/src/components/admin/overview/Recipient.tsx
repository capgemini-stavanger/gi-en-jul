import { Container, Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";
import useStyles from "./Styles";
import Datatable from "../common/RecipientTable";
import { RecipientType} from "../../../common/components/Types";

type Props = {
  data: RecipientType[] | [];
  refreshRecipients: () => void;
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const Recipient: React.FC<Props> = ({
  data,
  refreshRecipients,
  handleRecipientChange,
}) => {
  const [query, setQuery] = useState("");

  const search = (input: RecipientType[] | []) => {
    return input.filter(
      (input) =>
        input.contactEmail?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactFullName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.contactPhoneNumber?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.institution?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.referenceId?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        input.familyId.toString()?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const classes= useStyles();

  return (
    <Container>
      <Grid container>
        <Grid item>
          <Search />
        </Grid>
        <Grid item
        >
          <TextField
            placeholder="Søk etter familie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={classes.searchField}
          ></TextField>
        </Grid>
      </Grid>
      <Datatable
        data={search(data)}
        refreshRecipients={() => refreshRecipients()}
        handleRecipientChange={handleRecipientChange}
      />
    </Container>
  );
};
export default React.memo(Recipient);
