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
  } from "@material-ui/core";
import { Group } from "@material-ui/icons";
  import CloseIcon from "@material-ui/icons/Close";
  import { FC, useState } from "react";
import { getGender } from "../../common/functions/GetGender";
import { PersonType, RecipientType } from "./suggestedConnections/Types";
  
  const style = {
    dialogWidth: {
      minWidth: "50vh"
    }
  }

  interface IEditFamilyDialog {
    recipient: RecipientType;
    setRecipient: (recipient: RecipientType) => void;
    onClose: () => void;
    open: boolean;
  }
  
  const EditFamilyDialog
  : FC<IEditFamilyDialog> = ({
    setRecipient,
    recipient,
    onClose,
    open,
  }) => {


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
                        <Input type="text" value={recipient.dinner} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {recipient.dinner = e.target.value; setRecipient(recipient)}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={recipient.dessert} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {recipient.dessert = e.target.value; setRecipient(recipient)}}/>
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={recipient.note} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {recipient.note = e.target.value; setRecipient(recipient)}}/>
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
                    {recipient.familyMembers.map((familyMember) => (
                      <TableRow key={familyMember.rowKey}>
                        <TableCell>
                          {getGender(familyMember.gender, familyMember.age)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                        <Input type="number" value={familyMember.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.age=parseInt(e.target.value); setRecipient(recipient)}}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input type="text" value={familyMember.wish || "Giver kjøper alderstilpasset gave"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {familyMember.age=parseInt(e.target.value); setRecipient(recipient)}}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
          </TableCell>
        </TableRow>
      </Dialog>
    </>
  );
}
  
  export default EditFamilyDialog;
  