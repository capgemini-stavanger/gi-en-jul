import { Button, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GiverSuggestions from "./GiverTable";
import RecipientSuggestions from "./RecipientTable";
import RefreshIcon from "@material-ui/icons/Refresh";
import { RecipientType, GiverType } from "./Types";
import ApiService from "../../../common/functions/apiServiceClass";
import useStyles from "../common/Styles";

interface ConnectionSuggesterMacro {
  location: string;
  accessToken: string;
}

type ConnectionSuggestionProps = {
  givers: GiverType[];
  recipients: RecipientType[];
  selectedGiver: [string, string];
  selectedRecipient: [string, string];
  refreshing: boolean;
};

const initialSelection: [string, string] = ["", ""];

const initialState: ConnectionSuggestionProps = {
  givers: [],
  recipients: [],
  selectedRecipient: initialSelection,
  selectedGiver: initialSelection,
  refreshing: false,
};

const ConnectionSuggesterMacro: React.FC<ConnectionSuggesterMacro> = ({
  location,
  accessToken,
}) => {
  const api = new ApiService(accessToken);
  const classes = useStyles();

  const [state, setState] = useState(initialState);

  const getSuggestedRecipients = () => {
    setState((prev) => ({ ...prev, refreshing: true }));
    api
      .get("admin/Suggestions/Recipient", {
        params: { location: location },
      })
      .then((response) => {
        if (response.status == 200) {
          setState({
            ...state,
            recipients: response.data,
            refreshing: false,
            selectedGiver: initialSelection,
            selectedRecipient: initialSelection,
          });
        } else {
          alert("Kunne ikke hente familier, prøv igjen");
        }
      });
  };

  useEffect(() => {
    getSuggestedRecipients();
  }, []);

  //Fetch suggested givers, if recipients are updated
  useEffect(() => {
    api
      .get("admin/Suggestions/Giver", {
        params: { location: location },
      })
      .then((response) => {
        if (response.status == 200) {
          setState((prev) => ({ ...prev, givers: response.data }));
        } else {
          alert("Kunne ikke hente givere, prøv igjen");
        }
      });
  }, [state.recipients]);

  const updateSelectedRecipient = (newSelected: [string, string]): void => {
    setState((prev) => ({ ...prev, selectedRecipient: newSelected }));
  };

  const updateSelectedGiver = (newSelected: [string, string]): void => {
    setState((prev) => ({ ...prev, selectedGiver: newSelected }));
  };

  const submitConnection = () => {
    api
      .post(
        "admin/",
        JSON.stringify({
          GiverRowKey: state.selectedGiver[0],
          GiverPartitionKey: state.selectedGiver[1],
          RecipientRowKey: state.selectedRecipient[0],
          RecipientPartitionKey: state.selectedRecipient[1],
        })
      )
      .then((response) => {
        if (response.status == 200) {
          getSuggestedRecipients();
        } else {
          alert("Kunne ikke sende kobling, prøv igjen");
        }
      });
  };

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <RecipientSuggestions
          selectRecipient={updateSelectedRecipient}
          recipients={state.recipients}
        />
        <Container className="col-2">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              state.selectedGiver === initialSelection ||
              state.selectedRecipient === initialSelection
            }
            onClick={submitConnection}
          >
            Koble sammen
          </Button>
          <Button
            onClick={getSuggestedRecipients}
            fullWidth
            variant="contained"
            color="secondary"
            disabled={state.refreshing}
            className={classes.buttonRefresh}
          >
            <RefreshIcon />
          </Button>
        </Container>
        <GiverSuggestions
          selectGiver={updateSelectedGiver}
          givers={state.givers}
        />
      </Grid>
    </>
  );
};

export default ConnectionSuggesterMacro;
