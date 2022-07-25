import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import ApiService from "common/functions/apiServiceClass";
import parse from "html-react-parser";
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
}

export interface IMunicipality {
  name: string;
  isActive: boolean;
  info: string;
  email: string;
  phone: string;
}
const initInterfaceMunicipality: IMunicipality = {
  name: "",
  isActive: false,
  info: "",
  email: "",
  phone: "",
};

const initFormDataState: () => IMunicipalityFormData = () => ({
  ...getFormAddMunicipality(),
});

const MunicipalityManageTable: React.FC<IMunicipalityManageTable> = ({ accessToken }) => {
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
      });
    setOpen(false);
  };

  const updateMunicipalityInformation = () => {
    apiservice
      .put("municipality/update", {
        Country: Country,
        Name: selectedMunicipality?.name,
        IsActive: active,
      })
      .then(() => {
        fetchInformation();
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
      <Typography>Liste over Kommuner</Typography>
      <Table style={{ width: "1300px" }}>
        <TableBody className={classes.tableBody}>
          <TableRow className={classes.table}>
            <TableCell className={classes.tableHeaderText}>Kommune</TableCell>
            <TableCell>Aktiv</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Kontaktperson</TableCell>
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
        text={"Er du sikker på at du vil sette denne kommunen inaktiv?"}
        handleClose={() => {
          handleCloseConfirm(false);
        }}
        handleResponse={handleResponseConfirm}
      />
    </>
  );
};

export default MunicipalityManageTable;
