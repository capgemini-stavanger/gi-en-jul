import { Button, Container, Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/superadmin/Styles";
import React from "react";
import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";

interface iHowtoStartGiEnJul {
  accessToken: string;
}

interface iHowtoStartInfo {
  ContentType: string;
  info: string;
  index: string;
}

const initHowtoStartInfo: iHowtoStartInfo = {
  ContentType: "",
  info: "",
  index: "",
};

const HowToStartGiEnJul: React.FC<iHowtoStartGiEnJul> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const [html, setHtml] = React.useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [howToStartInfo, setHowToStartInfo] = useState<iHowtoStartInfo>(initHowtoStartInfo);

  useEffect(() => {
    getHowToStartGiEnJul();
  }, []);

  function onChange(e: { target: { value: React.SetStateAction<string> } }) {
    setHtml(e.target.value);
  }

  const getHowToStartGiEnJul = () => {
    apiservice
      .get("cms/getall", { params: { ContentType: "HowToStart" } })
      .then((response) => {
        if (response.data.length > 0) {
          setHtml(response.data[0].info);
          setHowToStartInfo(response.data[0]);
        } else {
          setHtml("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleSave = () => {
    apiservice
      .post("cms/Insert", {
        ContentType: "HowToStart",
        Index: howToStartInfo.index,
        Info: html,
      })
      .then((response) => {
        handleCloseConfirmation();
        setOpenEditor(false);
        if (response.status === 200) {
          setHowToStartInfo({ ...howToStartInfo, info: html });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpen = () => {
    setOpenConfirmation(true);
  };

  const handleClose = () => {
    setOpenConfirmation(false);
  };

  const handleResponse = (response: boolean) => {
    if (response) {
      handleSave();
    } else {
      setOpenEditor(false);
    }
  };

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography className={classes.heading} align="center" variant="h3">
            Forhåndsvisning av hvordan starte Gi en jul i din kommune
          </Typography>
          <Typography variant="h5" className={classes.heading}>
            {parse(howToStartInfo.info)}
          </Typography>
        </Grid>
        <Grid item className={classes.businessButton}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenEditor(true);
            }}
            className={classes.button}
          >
            Rediger tekst
          </Button>
        </Grid>
      </Grid>

      {openEditor && (
        <>
          <DefaultEditor value={html} onChange={onChange} />

          <Grid container direction="row" spacing={2}>
            <Grid item className={classes.businessButton}>
              <Button variant="contained" className={classes.button} onClick={handleOpen}>
                Lagre endringer
              </Button>
            </Grid>
            <Grid item className={classes.businessButton}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenEditor(false);
                }}
                className={classes.buttonError}
              >
                Avbryt
              </Button>
            </Grid>
          </Grid>

          <ConfirmationBox
            open={openConfirmation}
            text={"Ønsker du å lagre endringene?"}
            handleClose={handleClose}
            handleResponse={handleResponse}
          />
        </>
      )}
    </Container>
  );
};

export default HowToStartGiEnJul;
