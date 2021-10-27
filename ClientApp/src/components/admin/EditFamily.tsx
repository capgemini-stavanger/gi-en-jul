import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    TextField,
    TableRow,
    TableCell,
    Collapse,
    Box,
    Table,
    TableBody,
    TableHead,
    capitalize,
    TableFooter,
    Input,
    Select,
    MenuItem,
  } from "@material-ui/core";
import ApiService from "../../common/functions/apiServiceClass";
import { Group } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { FC, Key, useEffect, useState } from "react";
import { getGender } from "../../common/functions/GetGender";
import { PersonType, RecipientType } from "./suggestedConnections/Types";
import Gender from "../../common/enums/Gender";
import { GENDERS } from "../../common/constants/Genders";
import { string } from "joi";
import { Agent } from "http";
  
  const style = {
    dialogWidth: {
      minWidth: "50vh"
    }
  }

  interface IEditFamilyDialog {
    updateRecipient: () => void;
    recipient: RecipientType;
    onClose: () => void;
    open: boolean;
  }

  
  const EditFamilyDialog
  : FC<IEditFamilyDialog> = ({
    updateRecipient,
    recipient,
    onClose,
    open,
  }) => {
    
    useEffect(() => {
      setNewRecipient(JSON.parse(JSON.stringify(recipient)))
    }, [open]);

    const [newRecipient, setNewRecipient] = useState(JSON.parse(JSON.stringify(recipient)));

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
                            familyMember.gender = event.target.value.toString().length >= 0 ? parseInt(event.target.value as string) : Gender.Unspecified
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
    </>
  );
}
  
  export default EditFamilyDialog;
  