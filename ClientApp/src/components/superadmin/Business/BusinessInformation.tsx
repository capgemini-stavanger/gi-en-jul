import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/superadmin/Styles";
import React from "react";
import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";

interface IBusinessInformation {
  accessToken: string;
}

interface businessInfo {
  question: string;
  info: string;
  contentType: string;
  index: string;
  timestamp: string;
}

const initBusinessInfo: businessInfo = {
  question: "",
  info: "",
  contentType: "Bedrift",
  index: "",
  timestamp: "",
};

const BusinessInformation: React.FC<IBusinessInformation> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const [businessInfo, setBusinessInfo] = useState<businessInfo>(initBusinessInfo);
  const [html, setHtml] = React.useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    getBusinessInformation();
  }, []);

  function onChange(e: { target: { value: React.SetStateAction<string> } }) {
    setHtml(e.target.value);
  }

  const getBusinessInformation = () => {
    apiservice
      .get("cms/getall", { params: { contentType: "Bedrift" } })
      .then((response) => {
        if (response.data.length > 0) {
          setBusinessInfo(response.data[0]);
          setHtml(response.data[0].info);
        } else {
          setBusinessInfo(initBusinessInfo);
          setHtml("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveBusinessInformation = () => {
    apiservice
      .post("cms/insert", {
        ContentType: "Bedrift",
        Index: businessInfo.index,
        Info: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setBusinessInfo({ ...businessInfo, info: html });
          setOpenEditor(false);
          getBusinessInformation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResponse = (response: boolean) => {
    if (response) {
      saveBusinessInformation();
    } else {
      setOpenEditor(false);
    }
  };

  const handleOpen = () => {
    setOpenConfirmation(true);
  };

  const handleClose = () => {
    setOpenConfirmation(false);
  };

  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item xs={10}>
          <Typography className={classes.heading} align="center" variant="h3">
            Forhåndsvisning av bedriftinformasjon
          </Typography>
          <Box className={classes.tableBody} style={{ marginTop: "15px" }}>
            {parse(businessInfo.info)}
          </Box>
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
                className={classes.buttonError}
                variant="contained"
                onClick={() => {
                  setOpenEditor(false);
                }}
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

export default BusinessInformation;
