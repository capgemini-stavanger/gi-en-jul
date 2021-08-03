import {
  Button,
  Container,
  Grid,
  Slide,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GiverSuggestions from "./GiverTable";
import RecipientSuggestions from "./RecipientTable";
import RefreshIcon from "@material-ui/icons/Refresh";
import { RecipientType, GiverType } from "./Types";
import ApiService from "../../../common/functions/apiServiceClass";
import useStyles from "../common/Styles";
import MuiAlert from "@material-ui/lab/Alert";
import { TransitionProps } from "@material-ui/core/transitions";

interface ConnectionSuggesterMacro {
  location: string;
  accessToken: string;
}

type ConnectionSuggestionProps = {
  givers: GiverType[];
  recipients: RecipientType[];
  selectedGiver: GiverType;
  selectedRecipient: RecipientType;
  refreshing: boolean;
};

const initialState: ConnectionSuggestionProps = {
  givers: [],
  recipients: [],
  selectedRecipient: {} as RecipientType,
  selectedGiver: {} as GiverType,
  refreshing: false,
};

const initialSnackBar = {
  textContent: "",
  open: false,
};

const slideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="up" />;
};

const ConnectionSuggesterMacro: React.FC<ConnectionSuggesterMacro> = ({
  location,
  accessToken,
}) => {
  const api = new ApiService(accessToken);
  const classes = useStyles();

  const [state, setState] = useState(initialState);
  const [snackbarContent, setSnackbarContent] = useState(initialSnackBar);

  const getSuggestedRecipients = () => {
    setState((prev) => ({ ...prev, refreshing: true }));
    api
      .get("admin/Suggestions/Recipient", {
        params: { location: location },
      })
      .then((response) => {
        if (response.status == 200) {
          setState({
            ...initialState,
            recipients: response.data,
            refreshing: false,
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

  const updateSelectedRecipient = (newSelected: RecipientType): void => {
    setState((prev) => ({ ...prev, selectedRecipient: newSelected }));
  };

  const updateSelectedGiver = (newSelected: GiverType): void => {
    setState((prev) => ({ ...prev, selectedGiver: newSelected }));
  };

  const submitConnection = () => {
    api
      .post(
        "admin/",
        JSON.stringify({
          GiverRowKey: state.selectedGiver.rowKey,
          GiverPartitionKey: state.selectedGiver.partitionKey,
          RecipientRowKey: state.selectedRecipient.rowKey,
          RecipientPartitionKey: state.selectedRecipient.partitionKey,
        })
      )
      .then((response) => {
        if (response.status == 200) {
          const snackbarText = ` Foreslo kobling til ${state.selectedGiver.fullName} med familie: ${state.selectedRecipient.familyId}`;
          setSnackbarContent({ textContent: snackbarText, open: true });
          getSuggestedRecipients();
        } else {
          alert("Kunne ikke sende kobling, prøv igjen");
        }
      });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarContent(initialSnackBar);
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
              state.selectedGiver === initialState.selectedGiver ||
              state.selectedRecipient === initialState.selectedRecipient
            }
            onClick={submitConnection}
          >
            <Typography>Koble sammen</Typography>
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
      <Snackbar
        open={snackbarContent.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        TransitionComponent={slideTransition}
      >
        <MuiAlert severity="success" variant="filled">
          {snackbarContent.textContent}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ConnectionSuggesterMacro;
