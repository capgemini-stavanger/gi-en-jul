import {
  Button,
  Grid,
  Slide,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GiverSuggestions from "components/admin/connectionSuggester/GiverTable";
import RecipientSuggestions from "components/admin/connectionSuggester/RecipientTable";
import RefreshIcon from "@material-ui/icons/Refresh";
import { RecipientType, GiverType } from "components/shared/Types";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/admin/Styles";
import MuiAlert, { Color } from "@material-ui/lab/Alert";
import { TransitionProps } from "@material-ui/core/transitions";

interface ConnectionSuggesterMacro {
  location: string;
  accessToken: string;
}

interface ISnackBar {
  textContent: string;
  open: boolean;
  severity: Color;
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

const initialSnackBar: ISnackBar = {
  textContent: "",
  open: false,
  severity: "success"
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
          setState((prev) => ({
            ...prev,
            recipients: response.data,
            refreshing: false
          }))
        } else {
          setState(initialState);
          setSnackbarContent({textContent:"Kunne ikke hente familier, prøv igjen senere.", open:true, severity: "error"});
        }
      });
  };

  const getSuggestedGivers = () => {
    api
      .get("admin/Suggestions/Giver", {
        params: { location: location },
      })
      .then((response) => {
        if (response.status == 200) {
          setState((prev) => ({ ...prev, givers: response.data }));
        } else {
          setSnackbarContent({textContent:"Kunne ikke hente givere, prøv igjen senere.", open:true, severity: "error"});
        }
      });
    }

  useEffect(() => {
    getSuggestedRecipients();
  }, []);

  //Fetch suggested givers, if recipients are updated
  useEffect(() => {
    getSuggestedGivers();
  }, []);

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
          setSnackbarContent({ textContent: snackbarText, open: true, severity: "success" });
          setState(initialState);
          getSuggestedRecipients();
          getSuggestedGivers();
        } else {
          setSnackbarContent({textContent:"Kunne ikke foreslå kobling, prøv igjen senere.", open:true, severity: "error"});
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
      <Grid container direction="row" justifyContent="center" spacing={10}>
        <Grid item xs={4}>
          <Typography variant="h4" align="center">
            Givere
          </Typography>
          <GiverSuggestions
            selectGiver={updateSelectedGiver}
            givers={state.givers}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              state.selectedGiver === initialState.selectedGiver ||
              state.selectedRecipient === initialState.selectedRecipient
            }
            onClick={submitConnection}
            className={classes.submitButton}
          >
            <Typography>Koble sammen</Typography>
          </Button>
          <Button
            onClick={getSuggestedRecipients}
            fullWidth
            variant="contained"
            color="secondary"
            disabled={state.refreshing}
            className={classes.refreshButton}
          >
            <RefreshIcon />
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4" align="center">
            Familier
          </Typography>
          <RecipientSuggestions
            selectRecipient={updateSelectedRecipient}
            recipients={state.recipients}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarContent.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={slideTransition}
      >
        <MuiAlert severity={snackbarContent.severity} variant="filled">
          {snackbarContent.textContent}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ConnectionSuggesterMacro;
