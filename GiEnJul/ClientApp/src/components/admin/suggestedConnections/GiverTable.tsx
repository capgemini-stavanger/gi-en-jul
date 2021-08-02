import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { GiverType } from "./Types";
import { Group } from "@material-ui/icons";

type GiverRowProps = {
  giver: GiverType;
  onClick: any;
  selected: boolean;
};

function formatMaxreceivers(maxReceivers: number) {
  switch (maxReceivers) {
    case 2:
      return " 1 - 2";
    case 5:
      return " 3 - 5";
    case 100:
      return " 6 +";
  }
}

function Row(props: GiverRowProps) {
  const { giver } = props;

  return (
    <>
      <TableRow
        onClick={() => {
          props.onClick(giver.rowKey, giver.partitionKey);
        }}
        style={{ backgroundColor: props.selected ? "#EEE" : "#FFF" }}
      >
        <TableCell>{giver.fullName}</TableCell>
        <TableCell>
          <Group />
          {formatMaxreceivers(giver.maxReceivers)}
        </TableCell>
      </TableRow>
    </>
  );
}

type TableProps = {
  selectGiver: (newSelected: [string, string]) => void;
  givers: GiverType[];
};

export default function GiverSuggestions(props: TableProps) {
  const [selected, setSelected] = useState<string>("");

  return (
    <Table aria-label="Mottakere" className="col-5">
      <TableHead>
        <TableRow>
          <TableCell>Navn</TableCell>
          <TableCell>Ønsket størrelse</TableCell>
        </TableRow>
      </TableHead>
      <TableBody style={{ cursor: "pointer" }}>
        {props.givers.map((giver) => (
          <Row
            key={giver.rowKey}
            giver={giver}
            selected={selected === giver.rowKey}
            onClick={() => {
              setSelected(giver.rowKey);
              props.selectGiver([giver.rowKey, giver.partitionKey]);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
}
