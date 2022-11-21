import { Button, Grid, TableCell, TableRow, TextField } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import { useEffect, useState } from "react";
import useStyles from "../../Styles";
import { IMunicipality, initInterfaceMunicipality } from "../ManageMunicipalityContainer";
import img_placeholder from "styling/img/person.png";

interface props {
  municipality: IMunicipality;
  key: number;
  role: string;
  accessToken: string;
  setSelectedMunicipality: (municipality: IMunicipality) => void;
  setOpenConfirm: (open: boolean) => void;
  updateMunicipalityInformation: (municipality: IMunicipality) => void;
}

const MunicipalityTableElements: React.FC<props> = ({
  municipality,
  setSelectedMunicipality,
  updateMunicipalityInformation,
  setOpenConfirm,
  accessToken,
}) => {
  const classes = useStyles();
  const [openEditForm, setOpenEditForm] = useState(true);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [time, setTime] = useState(Date.now().toString());

  const apiService = new ApiService(accessToken);

  const handleSaveInformation = (response: boolean) => {
    if (response) {
      updateMunicipalityInformation(updatedMunicipality);
      setOpenInfo(true);
    }
  };

  const [updatedMunicipality, setUpdatedMunicipality] = useState<IMunicipality>({
    ...initInterfaceMunicipality,
  });

  useEffect(() => {
    setUpdatedMunicipality(municipality);
  }, [municipality]);

  const handleUploadImage = (event: any) => {
    const files = Array.from<File>(event.target.files);
    if (files.length) {
      files.forEach((file: File) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        apiService.post(`municipality/contactImage/${municipality.name}`, formData).then(() => {
          setTime(Date.now().toString());
        });
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{municipality.name}</TableCell>
        <TableCell>{municipality.isActive ? "Ja" : "Nei"}</TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            placeholder="Fyll inn epost"
            value={updatedMunicipality.email ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, email: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            placeholder="Fyll inn telefonnummer"
            value={updatedMunicipality.phoneNumber ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, phoneNumber: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            placeholder="Fyll inn kontaktperson"
            value={updatedMunicipality.contactPerson ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, contactPerson: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            placeholder="Fyll inn Facebook link"
            value={updatedMunicipality.facebook ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, facebook: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            disabled={openEditForm}
            placeholder="Fyll inn Instagram link"
            value={updatedMunicipality.instagram ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedMunicipality({ ...updatedMunicipality, instagram: e.target.value });
            }}
          />
        </TableCell>
        <TableCell>
          <Grid container direction={"row"}>
            <Grid item>
              <Button variant={"contained"} component={"label"} className={classes.button}>
                Last opp
                <input type={"file"} accept={"image/*"} onChange={handleUploadImage} hidden />
              </Button>
            </Grid>
            <Grid item>
              <img
                src={`${municipality.image}?${time}`}
                className={classes.smallImage}
                alt={"Finner ikke bilde.."}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${img_placeholder}`;
                }}
              />
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>
          <Button
            className={classes.button}
            variant="contained"
            disabled={!openEditForm}
            onClick={() => {
              if (municipality.isActive) {
                setSelectedMunicipality({ ...municipality, isActive: false });
              } else {
                setSelectedMunicipality({ ...municipality, isActive: true });
              }
              setOpenConfirm(true);
            }}
          >
            {municipality.isActive ? "Ikke vis informasjon" : "Vis informasjon"}
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
                className={classes.buttonError}
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
