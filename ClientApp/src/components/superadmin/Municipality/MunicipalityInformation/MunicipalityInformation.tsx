import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";
import useStyles from "../../Styles";
import { IMunicipality } from "../ManageMunicipalityContainer";

interface IMunicipalityInformation {
  municipality: IMunicipality;
  role: string;
  updateMunicipalityInformation: (municipality: IMunicipality) => void;
  setSelectedMunicipality: (municipality: IMunicipality) => void;
  deleteMunicipalityInformation: (municipality: IMunicipality) => void;
}

const MunicipalityInformation: React.FC<IMunicipalityInformation> = ({
  municipality,
  role,
  updateMunicipalityInformation,
  deleteMunicipalityInformation,
  setSelectedMunicipality,
}) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const classes = useStyles();
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  function onChange(e: ContentEditableEvent) {
    setSelectedMunicipality({ ...municipality, information: e.target.value });
  }

  const handleSaveClick = () => {
    setOpenConfirmBox(true);
  };

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      updateMunicipalityInformation(municipality);
      setOpenEditor(false);
    }
  };

  const handleDeleteResponse = (response: boolean) => {
    if (response) {
      setSelectedMunicipality({ ...municipality, information: "" });
      deleteMunicipalityInformation(municipality);
    }
  };

  return (
    <>
      <Box className={classes.tableBody} style={{ marginTop: "15px" }}>
        {parse(municipality.information)}
      </Box>

      <Button
        style={{ marginTop: "10px", marginBottom: "10px" }}
        variant="contained"
        className={classes.button}
        onClick={() => {
          setOpenEditor(true);
        }}
      >
        Rediger tekst
      </Button>

      {openEditor && (
        <>
          <DefaultEditor value={municipality.information} onChange={onChange} />
          <br />
          <Button
            style={{ marginRight: "10px" }}
            className={classes.button}
            variant="contained"
            onClick={handleSaveClick}
          >
            Lagre endringer
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            onClick={() => {
              setOpenEditor(false);
            }}
          >
            Avbryt
          </Button>
          <Button
            className={classes.buttonError}
            variant="outlined"
            hidden={role != "SuperAdmin"}
            onClick={() => {
              setOpenDeleteConfirmBox(true);
            }}
          >
            Slett informasjon om valgt kommune
          </Button>
        </>
      )}

      <ConfirmationBox
        open={openConfirmBox}
        text={"Er du sikker på at du ønsker å oppdatere teksten?"}
        handleClose={() => {
          setOpenConfirmBox(false);
        }}
        handleResponse={handleSaveResponse}
      />
      <ConfirmationBox
        open={openDeleteConfirmBox}
        text={"Er du sikker på at du ønsker å slette all informasjon?"}
        handleClose={() => {
          setOpenDeleteConfirmBox(false);
        }}
        handleResponse={handleDeleteResponse}
      />
    </>
  );
};

export default MunicipalityInformation;
