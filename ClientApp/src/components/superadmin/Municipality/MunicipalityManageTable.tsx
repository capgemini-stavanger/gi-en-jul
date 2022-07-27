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
import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import React from "react";
import AddMunicipalityForm, {
  getFormAddMunicipality,
  IMunicipalityFormData,
} from "./AddMunicipalityForm";
import InformationBox from "components/shared/InformationBox";
import ConfirmationBox from "components/shared/ConfirmationBox";
import useStyles from "../Styles";
import MunicipalityTableElements from "./MunicipalityTableElements";

interface IMunicipalityManageTable {
  accessToken: string;
  refreshData: () => void;
}

export interface IMunicipality {
  name: string;
  isActive: boolean;
  information: string;
  email: string;
  phoneNumber: string;
  contactPerson: string;
  image: string;
  facebook: string;
  instagram: string;
}
const initInterfaceMunicipality: IMunicipality = {
  name: "",
  isActive: false,
  information: "",
  email: "",
  phoneNumber: "",
  contactPerson: "",
  image: "",
  facebook: "",
  instagram: "",
};

const initFormDataState: () => IMunicipalityFormData = () => ({
  ...getFormAddMunicipality(),
});

const MunicipalityManageTable: React.FC<IMunicipalityManageTable> = ({
  accessToken,
  refreshData,
}) => {
  const apiservice = new ApiService(accessToken);
  const [Municipalities, setMunicipalities] = useState<IMunicipality[]>([
    initInterfaceMunicipality,
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [formDataState] = useState(initFormDataState());
  const [Country] = useState<string>("Norge");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<IMunicipality>(initInterfaceMunicipality);
  const [active, setActive] = useState(false);
  const classes = useStyles();

  const fetchInformation = () => {
    apiservice
      .get("municipality/all")
      .then((resp) => {
        setMunicipalities(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const addMunicipality = (data: IMunicipalityFormData) => {
    apiservice
      .post("municipality", {
        Country: data.country,
        Name: data.name,
        IsActive: "false",
      })
      .then(() => {
        fetchInformation();
        setOpenAdd(true);
        refreshData();
      });

    setOpen(false);
  };

  const setMunicipalityInactive = () => {
    apiservice
      .put("municipality/update", {
        Country: Country,
        Name: selectedMunicipality?.name,
        IsActive: active,
      })
      .then(() => {
        fetchInformation();
        refreshData();
      });
    setOpen(false);
  };

  const updateMunicipalityInformation = (municipality: IMunicipality) => {
    apiservice
      .put("municipality/update", {
        Country: Country,
        Name: municipality.name,
        Email: municipality.email,
        PhoneNumber: municipality.phoneNumber,
        ContactPerson: municipality.contactPerson,
      })
      .then(() => {
        fetchInformation();
        refreshData();
      });
  };

  const handleResponseConfirm = (response: boolean) => {
    if (response) {
      setMunicipalityInactive();
    }
    handleCloseConfirm(true);
  };

  const handleCloseConfirm = (response: boolean) => {
    if (response) {
      setOpenConfirm(false);
    }
  };

  const handleCloseAdd = (response: boolean) => {
    if (response) {
      setOpenAdd(false);
    }
  };

  useEffect(fetchInformation, []);
  return (
    <>
      <Typography>
        <Typography>Liste over kommuner</Typography>
        <List>
          <ListItem>
            <ListItemIcon>-</ListItemIcon>Denne Tabellen viser alle kommuner
          </ListItem>
          <ListItem>
            <ListItemIcon>-</ListItemIcon> Her kan du redigere informasjon om kommunen og velge om
            informasjonen om kommunen skal vises på hjemsiden
          </ListItem>
        </List>
      </Typography>
      <Table style={{ width: "1300px" }}>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.table}>
            <TableCell className={classes.tableHeaderText}>Kommune</TableCell>
            <TableCell className={classes.tableHeaderText}>Vises informasjonen</TableCell>
            <TableCell className={classes.tableHeaderText}>Email</TableCell>
            <TableCell className={classes.tableHeaderText}>Telefon</TableCell>
            <TableCell className={classes.tableHeaderText}>Kontaktperson</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>

          {Municipalities.map((municipality, index) => (
            <MunicipalityTableElements
              municipality={municipality}
              key={index}
              setSelectedMunicipality={setSelectedMunicipality}
              setActive={setActive}
              setOpenConfirm={setOpenConfirm}
              updateMunicipalityInformation={updateMunicipalityInformation}
            />
          ))}
        </TableBody>
      </Table>
      <Button
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
        key={formDataState.name}
        values={formDataState}
        open={open}
        handleClose={() => setOpen(false)}
        handleAddMunicipality={(data: IMunicipalityFormData) => addMunicipality(data)}
        openAdd={openAdd}
        handleOpenAdd={() => setOpenAdd(openAdd)}
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
