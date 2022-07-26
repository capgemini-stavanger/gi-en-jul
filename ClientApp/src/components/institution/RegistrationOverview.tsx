import { Box, Button, Container, Grid, IconButton, Typography } from "@material-ui/core";
import { RecipientType } from "components/shared/Types";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "./Styles";
import FormInformationBox from "./FormInformationBox";
import { FiberManualRecord } from "@material-ui/icons";

interface IDatagridFamily {
  id: string;
  refId: string;
  contactName: string;
  contactMail: string;
  contactPhone: string;
}

interface IRegistrationOverview {
  accessToken: string;
  userEmail?: string;
}

const RegistrationOverview: React.FC<IRegistrationOverview> = ({ accessToken, userEmail }) => {
  const apiservice = new ApiService(accessToken);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
  const [municipalityEmail, setMunicipalityEmail] = useState("");
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
      .get("Recipient")
      .then((resp) => {
        setRecipientData(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  const fetchMuncipalityEmail = () => {
    apiservice
      .get("Municipality/email")
      .then((resp) => {
        setMunicipalityEmail(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack.response.data);
      });
  };

  useEffect(() => {
    fetchRecipients();
    fetchMuncipalityEmail();
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

  const downloadExcel = () => {
    apiservice.downloadFile("Recipient/excel", "file.xlsx").catch((ex) => {
      console.error("Error while trying to download excel", ex);
    });
  };

  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.titleText} variant="h3">
                Oversikt over familie
              </Typography>
            </Grid>
            <Grid item>
              <Typography> Her kan du se alle tidligere registrerte familier </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4} justifyContent="center">
            <Grid item xs={3}>
              <FormInformationBox index={1} info={"Tabellen kan lastes ned til excel."} />
            </Grid>
            <Grid item xs={3}>
              <FormInformationBox
                index={2}
                info={"Tabellen kan filtreres ved å bruke øverste rad i tabellen. "}
              />
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column" spacing={2} alignContent="space-between">
                <Grid item>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography className={classes.infoBoxCircleText}>{3}</Typography>
                      <FiberManualRecord className={classes.infoBoxCircle} fontSize="large" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography className={classes.formInfoBoxText}>
                        Det kan gjøres endringer til familier som ikke er tilknyttet en giver. Dette
                        er indikert ved <EditIcon />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column" spacing={2} alignContent="space-between">
                <Grid item>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography className={classes.infoBoxCircleText}>{4}</Typography>
                      <FiberManualRecord className={classes.infoBoxCircle} fontSize="large" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography className={classes.formInfoBoxText}>
                        Om det er spørsmål eller problemer relatert til oversikten, ta kontakt med{" "}
                        {municipalityEmail && (
                          <a href={"mailto:" + municipalityEmail}> {municipalityEmail} </a>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row" justifyContent="center">
        <Grid container direction="column" spacing={1}>
          <Grid container direction="row">
            <Button color="primary" onClick={downloadExcel}>
              Last ned Excel
            </Button>
          </Grid>
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
              isInstitution={true}
              userEmail={userEmail}
              accessToken={accessToken}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrationOverview;
