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
import EditFamily from "../EditFamily";

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
  dialogOpen: boolean;
};

const initialState: ConnectionSuggestionProps = {
  givers: [],
  recipients: [],
  selectedRecipient: {} as RecipientType,
  selectedGiver: {} as GiverType,
  refreshing: false,
  dialogOpen: false,
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
          setState((prev) => ({
            ...prev,
            recipients: JSON.parse(JSON.stringify(response.data)),
            refreshing: false
          }))
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
  }, []);

  const updateSelectedRecipient = (newSelected: RecipientType): void => {
    setState((prev) => ({ ...prev, selectedRecipient: newSelected }));
  };

  const updateSelectedGiver = (newSelected: GiverType): void => {
    setState((prev) => ({ ...prev, selectedGiver: newSelected }));
  };

  const updateRecipient = async () => {
    console.log(state.selectedRecipient)
    console.log("before")
    await api
      .put("admin/recipient", JSON.stringify(state.selectedRecipient))
      .then((response) => {
        if (response.status === 200) {
          console.log("updated")
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  }

  const setOpenDialog = (show: boolean) => {
    setState((prev) => ({
      ...prev,
      dialogOpen: show,
    }));
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
            openDialog={setOpenDialog}
            selectRecipient={updateSelectedRecipient}
            recipients={state.recipients}
          />
        </Grid>
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
      {state.selectedRecipient.familyMembers && 
      <EditFamily 
      updateRecipient={updateRecipient}
      recipient={state.selectedRecipient} 
      onClose={() => setOpenDialog(false)}
      open={state.dialogOpen} />
}
    </>
  );
};

export default ConnectionSuggesterMacro;
