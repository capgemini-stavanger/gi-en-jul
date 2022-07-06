import { Button, Container, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/superadmin/Styles";
import React from "react";
import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";

interface IBusinessInformation {
  accessToken: string;
}

interface businessInfo {
  question: string;
  info: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
}

const initBusinessInfo: businessInfo = {
  question: "",
  info: "",
  partitionKey: "Bedrift",
  rowKey: "",
  timestamp: "",
};

const BusinessInformation: React.FC<IBusinessInformation> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const [businessInfo, setBusinessInfo] = useState<businessInfo>(initBusinessInfo);
  const [html, setHtml] = React.useState("");
  const [openEditor, setOpenEditor] = useState(false);

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
        if (response.data[0] == undefined) {
          setBusinessInfo(response.data[0]);
          setHtml(response.data[0].info);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveBusinessInformation = () => {
    apiservice
      .post("cms/insert", {
        ContentType: businessInfo.partitionKey,
        Index: businessInfo.rowKey,
        Info: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setBusinessInfo({ ...businessInfo, info: html });
          setOpenEditor(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Typography className={classes.heading} align="center" variant="h3">
        Forhåndsvisning av bedriftinformasjon
      </Typography>
      <br></br>
      <Typography variant="h5" className={classes.heading}>
        <Typography>{parse(html)}</Typography>
        <br></br>
        <Button
          variant="contained"
          onClick={() => {
            setOpenEditor(true);
          }}
        >
          Rediger tekst
        </Button>
      </Typography>
      <br></br>
      <br></br>
      {openEditor && (
        <Typography>
          <DefaultEditor value={html} onChange={onChange} />
          <br></br>
          <Button variant="contained" onClick={saveBusinessInformation}>
            Lagre endringer
          </Button>
        </Typography>
      )}
    </Container>
  );
};

export default BusinessInformation;
