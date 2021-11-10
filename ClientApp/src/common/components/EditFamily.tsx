import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
    TableRow,
    TableCell,
    Collapse,
    Box,
    Table,
    TableBody,
    TableHead,
    Input,
    Select,
    MenuItem,
    Snackbar,
    IconButton,

  } from "@material-ui/core";
import { FC, Key, useEffect, useState } from "react";
import { getGender } from "../functions/GetGender";
import { PersonType, RecipientType } from "../../components/admin/suggestedConnections/Types";
import Gender from "../enums/Gender";
import { GENDERS } from "../constants/Genders";
import ApiService from "../functions/apiServiceClass";
import { Alert } from "@material-ui/lab";
import { useAuth0  } from "@auth0/auth0-react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../components/admin/common/Styles";


  interface IEditFamilyDialog {
    recipientToUpdate: RecipientType;
    onClose: () => void;
    open: boolean;
    refreshRecipients: () => void;
  }

    const alertState: {
      isLoading: boolean;
      msg: string;
      severity?: "error" | "info" | "success" | "warning";
      open: boolean;
    } = {
      isLoading: false,
      msg: "",
      severity: undefined,
      open: false,
    };

  const EditFamilyDialog
  : FC<IEditFamilyDialog> = ({
    recipientToUpdate,
    onClose,
    open,
    refreshRecipients,
  }) => {

    async function getUserAccessToken(): Promise<string> {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    }

    useEffect(() => {
      getUserAccessToken().then((resp: string) => {
        setUserAccessToken(resp);
      });
    }, [open]);

    const { getAccessTokenSilently } = useAuth0();
    const [userAccessToken, setUserAccessToken] = useState<string>("");
    const apiservice = new ApiService(userAccessToken);
    const [newRecipient, setNewRecipient] = useState(Object.assign({} as RecipientType, recipientToUpdate));
    const [state, setState] = useState(alertState);

    const classes = useStyles();

    const setAlert = (
      open?: boolean,
      message?: string,
      severity?: "error" | "info" | "success" | "warning"
    ) => {
      setState((prev) => ({
        ...prev,
        open: open ?? prev.open,
        msg: message ?? prev.msg,
        severity: severity ?? prev.severity,
      }));
    };

    const handleAlertClose = (
      e: React.SyntheticEvent | React.MouseEvent,
      reason?: string
      ) => {
        if(reason == 'clickaway')
        return ;
        setAlert(false);
      };

    const updateRecipient = async () => {
      await apiservice
        .put("admin/recipient", JSON.stringify(newRecipient))
        .then((response) => {
          if (response.status === 200) {
            setAlert(true, "Familie oppdatert!", "success");
            refreshRecipients();
          }
        })
        .catch((errorStack) => {
          console.error(errorStack);
          setAlert(true, "Kunne ikke oppdatere familie..", "error")
        });
    }

    const updateFamily = () => {
      updateRecipient();
      onClose()
    }

    const newFamilyMember = () => {
      newRecipient.familyMembers.push({age: 0, gender: 9, partitionKey: recipientToUpdate.rowKey, wish: ""} as PersonType);
    }

    const removeFamilyMember = (index: number) => {
      newRecipient.familyMembers.splice(index, 1);
    }

    return (
      <>
      <Dialog onClose={(_, reason) => 
        {if (reason != "backdropClick") onClose()}} 
        aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title" disableTypography>Rediger Familie</DialogTitle>
        <TableRow>
        <IconButton
            className={classes.rightMiddleAlign}
            aria-label="close"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <TableCell colSpan={6}>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Matønsker
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                  <TableRow>
                      <TableCell>Middag</TableCell>
                      <TableCell>Dessert</TableCell>
                      <TableCell>Notat</TableCell>
                      <TableCell>Referanse Id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input type="text" value={newRecipient.dinner} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewRecipient((prev) => {return { ...prev, dinner: e.target.value }})}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newRecipient.dessert} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewRecipient((prev) => {return { ...prev, dessert: e.target.value }})}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newRecipient.note} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewRecipient((prev) => {return { ...prev, note: e.target.value }})}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newRecipient.referenceId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewRecipient((prev) => {return { ...prev, refereneId: e.target.value }})}}/>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Typography variant="h6" gutterBottom component="div">
                  Familiemedlemmer
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Kjønn</TableCell>
                      <TableCell>Alder</TableCell>
                      <TableCell>Ønske</TableCell>
                      <TableCell>Kommentar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newRecipient.familyMembers.map((familyMember : PersonType , index: number) => (
                      <TableRow key={familyMember.rowKey}>
                        <TableCell>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={familyMember.gender}
                          label="Age"
                          type="number"
                          onChange={(event) => {
                            familyMember.gender = typeof event.target.value !== "undefined" ? parseInt(event.target.value as string) : Gender.Unspecified
                            setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))
                          }}
                        >
                          {GENDERS.map((o) => {
                            return <MenuItem value={o.value.toString()}>{getGender(o.value, familyMember.age)}</MenuItem>;
                          })}
                        </Select>
                        </TableCell>
                        <TableCell component="th" scope="row">
                        <Input type="number" value={familyMember.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.age=parseInt(e.target.value); setNewRecipient((prev) => {return { ...prev, age: parseInt(e.target.value) }})}}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input type="text" value={familyMember.wish} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.wish=e.target.value; setNewRecipient((prev) => {return { ...prev, wish: e.target.value }})}}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input type="text" value={familyMember.comment} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.comment=e.target.value; setNewRecipient((prev) => {return { ...prev, comment: e.target.value }})}}/>
                        </TableCell>
                        { !familyMember.rowKey &&
                          <TableCell>
                          <IconButton
                            aria-label="close"
                            onClick={() => removeFamilyMember(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                        }
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            <DialogActions>
              <Button color="primary">
                <Button onClick={() => {newFamilyMember()}}>
                  Nytt familiemedlem
                </Button>
              </Button>
          </DialogActions>
          </TableCell>
        </TableRow>
        <DialogActions>
            <Button color="primary">
              <Button onClick={updateFamily}>
                Oppdater Familie
              </Button>
            </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity={state.severity} onClose={handleAlertClose}>
          {state.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

  export default EditFamilyDialog;