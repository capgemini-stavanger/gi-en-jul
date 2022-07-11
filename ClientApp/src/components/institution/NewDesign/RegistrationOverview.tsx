import { Box, Button, Container, Grid, IconButton, TextField } from "@material-ui/core";
import { RecipientType } from "components/shared/Types";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "../Styles";

interface IDatagridFamily {
  id: string;
  refId: string;
  contactName: string;
  contactMail: string;
  contactPhone: string;
}

interface IRegistrationOverview {
  accessToken: string;
  institution?: string;
}

const RegistrationOverview: React.FC<IRegistrationOverview> = ({ accessToken, institution }) => {
  const apiservice = new ApiService(accessToken);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editRecipient, setEditRecipient] = useState({} as RecipientType);
  const [rowData, setRowData] = useState<IDatagridFamily[] | []>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Familie ID", width: 200 },
    { field: "refId", headerName: "Referanse ID", width: 200 },
    { field: "contactName", headerName: "Kontaktperson navn", width: 200 },
    { field: "contactMail", headerName: "Kontaktperson mail", width: 200 },
    { field: "contactPhone", headerName: "Kontaktperson nummer", width: 200 },
    {
      field: "",
      headerName: "Endringer",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const recipientToEdit = findEditRecipient(params.row.id);

        const showButton = validRecipient(recipientToEdit);
        let button;
        if (showButton) {
          button = (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => onEditFamily(recipientToEdit)}
            >
              <EditIcon />
            </IconButton>
          );
        }

        return button;
      },
    },
  ];

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
  useEffect(() => {
    setRowData(updateRowData(recipientData));
  }, [recipientData]);

  const findEditRecipient = (familyId: string) => {
    const matchingRecipient = recipientData.find((recipient) => recipient.familyId === familyId);
    return matchingRecipient ? matchingRecipient : ({} as RecipientType);
  };

  const validRecipient = (recipient: RecipientType) => {
    if (recipient) {
      if (!recipient.isSuggestedMatch && !recipient.hasConfirmedMatch) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const onEditFamily = (recipient: RecipientType) => {
    setEditRecipient(recipient);
    setShowEditDialog(true);
  };

  const refreshData = () => {
    fetchRecipients();
  };

  const updateRowData = (data: RecipientType[]) => {
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      rows[i] = {
        id: data[i].familyId,
        refId: data[i].referenceId,
        contactName: data[i].contactFullName,
        contactMail: data[i].contactEmail,
        contactPhone: data[i].contactPhoneNumber,
      };
    }
    return rows;
  };

  return (
    <Container className={classes.root}>
      <Grid container direction="row" justifyContent="center">
        <Grid item>
          <Box style={{ height: "600px", width: "1200px" }}>
            <DataGrid rows={rowData} columns={columns} autoPageSize pagination />
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
