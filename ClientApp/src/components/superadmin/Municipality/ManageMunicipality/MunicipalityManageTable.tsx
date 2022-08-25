import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import { useState } from "react";
import React from "react";
import AddMunicipalityForm from "./AddMunicipalityForm";
import InformationBox from "components/shared/InformationBox";
import ConfirmationBox from "components/shared/ConfirmationBox";
import MunicipalityTableElements from "./MunicipalityTableElements";
import useStyles from "components/superadmin/Styles";
import { IMunicipality, initInterfaceMunicipality } from "../ManageMunicipalityContainer";

interface IMunicipalityManageTable {
  municipalities: IMunicipality[];
  setMunicipalities: (municipalities: IMunicipality[]) => void;
  addMunicipality: (data: IMunicipality) => void;
  updateMunicipalityInformation: (data: IMunicipality) => void;
  openAdd: boolean;
  setOpenAdd: (open: boolean) => void;
  handleCloseAdd: (response: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  role: string;
}

const MunicipalityManageTable: React.FC<IMunicipalityManageTable> = ({
  addMunicipality,
  municipalities,
  updateMunicipalityInformation,
  openAdd,
  handleCloseAdd,
  open,
  setOpen,
  role,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [selectedMunicipality, setSelectedMunicipality] =
    useState<IMunicipality>(initInterfaceMunicipality);
  const classes = useStyles();

  const handleResponseConfirm = (response: boolean) => {
    if (response) {
      updateMunicipalityInformation(selectedMunicipality);
    }
    handleCloseConfirm(true);
  };

  const handleCloseConfirm = (response: boolean) => {
    if (response) {
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Typography>Liste over kommuner</Typography>
      <List>
        <ListItem>
          <ListItemIcon>-</ListItemIcon> <Typography>Denne Tabellen viser alle kommuner</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography>
            Her kan du redigere kontakt informasjon om kommunen og velge om informasjonen om
            kommunen skal vises på hjemsiden
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography>
            Opplasting av bilder skjer umiddelbart og kan ikke angres. Informasjonsbilder kan
            slettes og kontakt person bilder overskrives
          </Typography>
        </ListItem>
      </List>
      <Table>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.table}>
            <TableCell className={classes.tableHeaderText}>Kommune</TableCell>
            <TableCell className={classes.tableHeaderText}>Vises info</TableCell>
            <TableCell className={classes.tableHeaderText}>Email</TableCell>
            <TableCell className={classes.tableHeaderText}>Telefon</TableCell>
            <TableCell className={classes.tableHeaderText}>Kontaktperson</TableCell>
            <TableCell className={classes.tableHeaderText}>Facebook</TableCell>
            <TableCell className={classes.tableHeaderText}>Instagram</TableCell>
            <TableCell className={classes.tableHeaderText}>Kontakt bilde</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>

          {municipalities.map((municipality, index) => (
            <MunicipalityTableElements
              role={role}
              municipality={municipality}
              key={index}
              setSelectedMunicipality={setSelectedMunicipality}
              setOpenConfirm={setOpenConfirm}
              updateMunicipalityInformation={updateMunicipalityInformation}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        hidden={role != "SuperAdmin"}
        className={classes.button}
        style={{ marginTop: "10px" }}
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Legg til ny kommune
      </Button>

      <InformationBox
        open={openAdd}
        text={"Kommunen har blitt lagt til"}
        handleClose={() => handleCloseAdd(true)}
      />
      <AddMunicipalityForm
        open={open}
        setOpen={setOpen}
        handleAddMunicipality={(data: IMunicipality) => addMunicipality(data)}
      />
      <ConfirmationBox
        open={openConfirm}
        text={"Ønsker du å endre visning av informasjon om kommunen?"}
        handleClose={() => {
          handleCloseConfirm(false);
        }}
        handleResponse={handleResponseConfirm}
      />
    </>
  );
};

export default MunicipalityManageTable;
