import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { RecipientType } from "./Types";
import ApiService from "../../../common/functions/apiServiceClass";
import { getGender } from "../../../common/functions/GetGender";
import { capitalize } from "@material-ui/core";
import { Group } from "@material-ui/icons";

type RecipientRowProps = {
  recipient: RecipientType;
  onClick: any;
  selected: boolean;
};

function Row(props: RecipientRowProps) {
  const { recipient } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        onClick={() => {
          props.onClick(recipient.rowKey, recipient.partitionKey);
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
        <TableCell>
          <Group />
          {" " + recipient.familyMembers.length}
        </TableCell>
        <TableCell>{recipient.institution}</TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: props.selected ? "#EEE" : "#FFF" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Matønsker
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{capitalize(recipient.dinner)}</TableCell>
                    <TableCell>{capitalize(recipient.dessert)}</TableCell>
                    <TableCell>{recipient.note}</TableCell>
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
                      <TableCell>{familyMember.age}</TableCell>
                      <TableCell component="th" scope="row">
                        {familyMember.wish == null
                          ? "Giver kjøper alderstilpasset gave"
                          : familyMember.wish}
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
  selectRecipient: (newSelected: [string, string]) => void;
  recipients: RecipientType[];
};

export default function RecipientSuggestions(props: TableProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <Table aria-label="Mottakere" className="col-5">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Id</TableCell>
          <TableCell>Størrelse</TableCell>
          <TableCell>Institusjon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.recipients.map((recipient) => (
          <Row
            key={recipient.rowKey}
            recipient={recipient}
            selected={selected === recipient.rowKey}
            onClick={() => {
              setSelected(recipient.rowKey);
              props.selectRecipient([recipient.rowKey, recipient.partitionKey]);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
}
