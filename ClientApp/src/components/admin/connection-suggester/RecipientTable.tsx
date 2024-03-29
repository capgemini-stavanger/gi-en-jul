import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { RecipientType } from "components/shared/Types";
import getGender from "common/functions/GetGender";
import { capitalize } from "@material-ui/core";
import { Group } from "@material-ui/icons";
import useStyles from "components/admin/Styles";

type RecipientRowProps = {
  recipient: RecipientType;
  onClick: any;
  selected: boolean;
};

function Row(props: RecipientRowProps) {
  const { recipient } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow
        onClick={() => {
          props.onClick(recipient.recipientId, recipient.event);
          setOpen(!open);
        }}
        style={{ backgroundColor: props.selected ? "#EEE" : "#FFF" }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{recipient.familyId}</TableCell>
        <TableCell>{recipient.referenceId}</TableCell>
        <TableCell align="center">
          <Group />
          {" " + recipient.familyMembers.length}
        </TableCell>
        <TableCell align="center">{recipient.institution}</TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: props.selected ? "#EEE" : "#FFF" }}>
        <TableCell className={classes.unpaddedTableCell} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Matønsker
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Middag: {capitalize(recipient.dinner)}</TableCell>
                    <TableCell>Dessert: {capitalize(recipient.dessert)}</TableCell>
                    <TableCell>{recipient.note ? "Kommentar: " + recipient.note : ""}</TableCell>
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
                    <TableRow key={familyMember.personId}>
                      <TableCell>{getGender(familyMember.gender, familyMember.age)}</TableCell>
                      <TableCell>{familyMember.age}</TableCell>
                      <TableCell>
                        {!familyMember.noWish
                          ? familyMember.wishes[0]
                          : "Giver kjøper alderstilpasset gave. "}
                        <br />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom component="div">
                Kontakt
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{recipient.contactFullName}</TableCell>
                    <TableCell>{recipient.contactEmail}</TableCell>
                    <TableCell>{recipient.contactPhoneNumber}</TableCell>
                    <TableCell>{recipient.referenceId}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

type TableProps = {
  selectRecipient: (newSelected: RecipientType) => void;
  recipients: RecipientType[];
};

export default function RecipientSuggestions(props: TableProps) {
  const [selectedRow, setSelectedRow] = useState<string>("");
  const classes = useStyles();

  return (
    <Table aria-label="Mottakere">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Familienummer</TableCell>
          <TableCell>Referanse ID</TableCell>
          <TableCell align="center">Størrelse</TableCell>
          <TableCell align="center">Institusjon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={classes.clickableTableBody}>
        {props.recipients.map((recipient) => (
          <Row
            key={recipient.recipientId}
            recipient={recipient}
            selected={selectedRow === recipient.recipientId}
            onClick={() => {
              setSelectedRow(recipient.recipientId);
              props.selectRecipient(recipient);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
}
