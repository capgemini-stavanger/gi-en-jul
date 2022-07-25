import { Box, Button, Grid } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect } from "react";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";

interface IMunicipalityInformation {
  accessToken: string;
  municipalityName: string;
  role: string;
}

const IMunicipalityInit = () => {
  return {
    country: "",
    name: "",
    isActive: false,
    information: "",
  };
};

interface IMunicipality {
  country: string;
  name: string;
  isActive: boolean;
  information: string;
}

const MunicipalityInformation: React.FC<IMunicipalityInformation> = ({
  accessToken,
  municipalityName,
  role,
}) => {
  const apiservice = new ApiService(accessToken);
  const [municipality, setMunicipality] = useState<IMunicipality>(IMunicipalityInit());
  const [municipalityInformation, setMunicipalityInformation] = useState("");
  const [html, setHtml] = useState("");
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const fetchInformation = () => {
    if (!municipalityName) {
      // location is not set (location starts as an empty string in the parent)
      return;
    }
    apiservice
      .get("Municipality/GetSingle", {
        params: { Country: "Norge", Municipality: municipalityName },
      })
      .then((resp) => {
        // response an array-wrapped object
        let kommuneInformation: string | undefined = resp.data[0].information;
        if (kommuneInformation == undefined) {
          kommuneInformation = "";
        }
        setMunicipality(resp.data[0]);
        setMunicipalityInformation(kommuneInformation);
        setHtml(kommuneInformation);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchInformation, [municipalityName]);

  const deleteMunicipalityInformation = () => {
    apiservice
      .put("Municipality/update", {
        ...municipality,
        information: "",
      })
      .then(() => {
        setMunicipalityInformation("");
        setMunicipality(IMunicipalityInit());
        setHtml("");
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  const saveMunicipalityInformation = () => {
    apiservice
      .put(`Municipality/Update`, {
        ...municipality,
        information: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setMunicipalityInformation(html);
          setOpenEditor(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveClick = () => {
    setOpenConfirmBox(true);
  };

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      saveMunicipalityInformation();
    }
  };

  return (
    <>
      <Box>{parse(municipalityInformation)}</Box>

      <Button
        variant="contained"
        onClick={() => {
          setOpenEditor(true);
        }}
      >
        Rediger tekst
      </Button>

      {openEditor && (
        <>
          <DefaultEditor value={html} onChange={onChange} />
          <br />

          <Button variant="contained" onClick={handleSaveClick}>
            Lagre endringer
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenEditor(false);
            }}
          >
            Avbryt
          </Button>
        </>
      )}

      <Grid item>
        <Button hidden={role != "SuperAdmin"} onClick={deleteMunicipalityInformation}>
          Slett informasjon om valgt kommune
        </Button>
      </Grid>

      <ConfirmationBox
        open={openConfirmBox}
        text={"Er du sikker på at du ønsker å oppdatere teksten?"}
        handleClose={() => {
          setOpenConfirmBox(false);
        }}
        handleResponse={handleSaveResponse}
      />
    </>
  );
};

export default MunicipalityInformation;
