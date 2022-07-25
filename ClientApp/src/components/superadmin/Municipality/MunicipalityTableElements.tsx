import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useState } from "react";
import useStyles from "../Styles";
import { IMunicipality } from "./MunicipalityManageTable";

interface props {
  municipality: IMunicipality;
  key: number;

  setSelectedMunicipality: (municipality: IMunicipality) => void;
  setActive: (active: boolean) => void;
  setOpenConfirm: (open: boolean) => void;
}

const MunicipalityTableElements: React.FC<props> = ({
  municipality,

  setSelectedMunicipality,

  setActive,
  setOpenConfirm,
}) => {
  const classes = useStyles();
  const [openEditForm, setOpenEditForm] = useState(true);
  const [updatedMunicipality, setUpdatedMunicipality] = useState<IMunicipality>();

  return (
    <TableRow>
      <TableCell>{municipality.name}</TableCell>
      <TableCell>{municipality.isActive ? "Ja" : "Nei"}</TableCell>
      <TableCell>
        <TextField
          disabled={openEditForm}
          value={municipality.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const copy = { ...municipality };
            copy.email = e.target.value;
            setUpdatedMunicipality(copy);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled={openEditForm}
          value={municipality.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const copy = { ...municipality };
            copy.phone = e.target.value;
            setUpdatedMunicipality(copy);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled={openEditForm}
          value={"Legg inn variabel"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const copy = { ...municipality };
            //CHANGE TO CONCTACT PERSON
            copy.phone = e.target.value;
            setUpdatedMunicipality(copy);
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
                // SEND HER med updateMunicipalityInformation(updatedMunicipality);
              }}
            >
              Lagre
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MunicipalityTableElements;
