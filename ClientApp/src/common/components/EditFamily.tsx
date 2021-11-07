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
  } from "@material-ui/core";
import { FC, Key, useEffect, useState } from "react";
import { getGender } from "../functions/GetGender";
import { PersonType, RecipientType } from "../../components/admin/suggestedConnections/Types";
import Gender from "../enums/Gender";
import { GENDERS } from "../constants/Genders";
import ApiService from "../functions/apiServiceClass";
import { Alert } from "@material-ui/lab";

  interface IEditFamilyDialog {
    recipient: RecipientType;
    onClose: () => void;
    open: boolean;
    accessToken: string;
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
    recipient,
    onClose,
    open,
    accessToken,
    refreshRecipients,
  }) => {

    useEffect(() => {
      setNewRecipient(JSON.parse(JSON.stringify(recipient)))
    }, [open]);


    const apiservice = new ApiService(accessToken);
    const [newRecipient, setNewRecipient] = useState(JSON.parse(JSON.stringify(recipient)));
    const [state, setState] = useState(alertState);

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
      recipient.dinner = newRecipient.dinner;
      recipient.dessert = newRecipient.dessert;
      recipient.note = newRecipient.note;
      recipient.familyMembers = newRecipient.familyMembers;
      recipient.familyMembers.forEach(person => person.partitionKey = recipient.rowKey);
      updateRecipient();
      onClose()
    }

    const newFamilyMember = () => {
      newRecipient.familyMembers.push({age: 0, gender: 9, partitionKey: recipient.rowKey, wish: ""} as PersonType);
      setNewRecipient(JSON.parse(JSON.stringify(newRecipient)));
    }

    return (
      <>
      <Dialog onClose={() => {onClose()}} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title" disableTypography>Rediger Familie</DialogTitle>
        <TableRow>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input type="text" value={newRecipient.dinner} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {newRecipient.dinner = e.target.value; setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newRecipient.dessert} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {newRecipient.dessert = e.target.value; setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newRecipient.note} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {newRecipient.note = e.target.value; setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))}}/>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newRecipient.familyMembers.map((familyMember: { rowKey: Key | null | undefined; gender: Gender; age: number; wish: any; }) => (
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
                        <Input type="number" value={familyMember.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.age=parseInt(e.target.value); setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))}}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input type="text" value={familyMember.wish} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.wish=e.target.value; setNewRecipient(JSON.parse(JSON.stringify(newRecipient)))}}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            <DialogActions>
              <Button color="primary">
                <Button onClick={newFamilyMember}>
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