import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import { useEffect, useState } from "react";
import useStyles from "../Styles";
import { IMunicipality } from "./MunicipalityManageTable";

interface props {
  municipality: IMunicipality;
  key: number;

  setSelectedMunicipality: (municipality: IMunicipality) => void;
  setActive: (active: boolean) => void;
  setOpenConfirm: (open: boolean) => void;
  updateMunicipalityInformation: (municipality: IMunicipality) => void;
}

const MunicipalityTableElements: React.FC<props> = ({
  municipality,
  setSelectedMunicipality,
  updateMunicipalityInformation,
  setActive,
  setOpenConfirm,
}) => {
  const classes = useStyles();
  const [openEditForm, setOpenEditForm] = useState(true);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const initInterfaceMunicipality: IMunicipality = {
    name: municipality.name,
    isActive: municipality.isActive,
    information: "",
    email: municipality.email,
    phoneNumber: municipality.phoneNumber,
    contactPerson: municipality.contactPerson,
    image: "",
    facebook: "",
    instagram: "",
  };
  const handleSaveInformation = (response: boolean) => {
    if (response) {
      updateMunicipalityInformation(updatedMunicipality);
      setOpenInfo(true);
    }
  };

  const [updatedMunicipality, setUpdatedMunicipality] =
    useState<IMunicipality>(initInterfaceMunicipality);

  useEffect(() => {
    setUpdatedMunicipality(municipality);
  }, [municipality]);

  return (
    <>
      <TableRow>
        <TableCell>{municipality.name}</TableCell>
        <TableCell>{municipality.isActive ? "Ja" : "Nei"}</TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            value={updatedMunicipality.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, email: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            value={updatedMunicipality.phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, phoneNumber: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            value={updatedMunicipality.contactPerson}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, contactPerson: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => {
              setSelectedMunicipality(municipality);
              if (municipality.isActive) {
                setActive(false);
              } else {
                setActive(true);
              }
              setOpenConfirm(true);
            }}
          >
            {municipality.isActive ? "Sett inaktiv" : "Sett aktiv"}
          </Button>
        </TableCell>
        <TableCell>
          {openEditForm ? (
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => {
                setSelectedMunicipality(municipality);
                setOpenEditForm(false);
              }}
            >
              Rediger kommune
            </Button>
          ) : (
            <>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => {
                  setOpenEditForm(true);
                }}
              >
                Avbryt
              </Button>
              <Button
                className={classes.button}
                style={{ marginLeft: "10px" }}
                variant="contained"
                onClick={() => {
                  setOpenEditForm(true);
                  setOpen(true);
                }}
              >
                Lagre
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
      <ConfirmationBox
        text="Ønsker du å oppdatere informasjonen om kommunen?"
        open={open}
        handleResponse={handleSaveInformation}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <InformationBox
        text="Du har oppdatert informasjon om kommunen"
        open={openInfo}
        handleClose={() => {
          setOpenInfo(false);
        }}
      />
    </>
  );
};

export default MunicipalityTableElements;
