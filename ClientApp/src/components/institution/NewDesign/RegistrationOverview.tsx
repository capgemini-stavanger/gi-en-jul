import { Box, Container, Grid, IconButton, TextField } from "@material-ui/core";
import { RecipientType } from "components/shared/Types";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "../Styles";

const columns: GridColDef[] = [
  { field: "id", headerName: "Familie ID", width: 200 },
  { field: "refId", headerName: "Referanse ID", width: 200 },
  { field: "contactName", headerName: "Kontaktperson navn", width: 200 },
  { field: "contactMail", headerName: "Kontaktperson mail", width: 200 },
  { field: "contactPhone", headerName: "Kontaktperson nummer", width: 200 },
];

interface IRegistrationOverview {
  accessToken: string;
  institution?: string;
}

const RegistrationOverview: React.FC<IRegistrationOverview> = ({ accessToken, institution }) => {
  const apiservice = new ApiService(accessToken);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const [familyIdInput, setFamilyIdInput] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRecipient, setEditRecipient] = useState({} as RecipientType);

  const classes = useStyles();

  const fetchRecipients = () => {
    apiservice
      .get("Recipient", { params: { Institution: institution } })
      .then((resp) => {
        setRecipientData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const onFamilyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyIdInput(e.target.value);

    const matchingRecipient = recipientData.find(
      (recipient) => recipient.familyId === e.target.value
    );
    if (matchingRecipient != undefined) {
      setEditRecipient(matchingRecipient);
    } else {
      setEditRecipient({} as RecipientType);
    }
  };

  const onEditFamily = () => {
    if (editRecipient["rowKey"]) {
      setShowEditDialog(true);
    }
  };

  const refreshData = () => {
    fetchRecipients();
  };

  const rows = [];
  for (let i = 0; i < recipientData.length; i++) {
    rows[i] = {
      id: recipientData[i].familyId,
      refId: recipientData[i].referenceId,
      contactName: recipientData[i].contactFullName,
      contactMail: recipientData[i].contactEmail,
      contactPhone: recipientData[i].contactPhoneNumber,
    };
  }

  return (
    <Container className={classes.root}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <Box style={{ height: "600px", width: "1000px" }}>
            <DataGrid rows={rows} columns={columns} autoPageSize pagination />
          </Box>
          <Box sx={{ ml: 5 }}>
            <TextField
              type="number"
              label="Family ID"
              value={familyIdInput}
              onChange={onFamilyInputChange}
            />
            <IconButton aria-label="expand row" size="small" onClick={onEditFamily}>
              <EditIcon />
            </IconButton>
          </Box>
          <EditFamilyDialog
            open={showEditDialog}
            onClose={() => {
              setShowEditDialog(false);
            }}
            refreshRecipients={() => refreshData()}
            recipient={editRecipient}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrationOverview;
