import { Box, Button, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect } from "react";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/confirmationBox";

interface IKommuneInformation {
  accessToken: string;
  location: string;
}

const KommuneInformation: React.FC<IKommuneInformation> = ({ accessToken, location }) => {
  const apiservice = new ApiService(accessToken);
  const [kommuneInformation, setKommuneInformation] = useState("");
  const [html, setHtml] = useState("");
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const fetchInformation = () => {
    apiservice
      .get("Cms/GetSingle", {
        params: { contentType: "Kommune", index: location },
      })
      .then((resp) => {
        setKommuneInformation(resp.data[0].info);
        setHtml(resp.data[0].info);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchInformation, [location]);

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  const saveKommuneInformation = () => {
    apiservice
      .post("cms/insert", {
        ContentType: "Kommune",
        Index: location,
        Info: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setKommuneInformation(html);
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
      saveKommuneInformation();
    }
  };

  return (
    <>
      <Box>{parse(kommuneInformation)}</Box>

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
    </>
  );
};

export default KommuneInformation;
