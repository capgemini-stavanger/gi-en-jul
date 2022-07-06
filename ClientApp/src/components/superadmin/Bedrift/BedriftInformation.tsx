import { Button, Container, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import useStyles from "components/superadmin/Styles";
import React from "react";
import { useEffect, useState } from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";

interface IBedriftInformation {
  accessToken: string;
}

interface bedriftInfo {
  question: string;
  info: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
}

const initBedriftInfo: bedriftInfo = {
  question: "",
  info: "",
  partitionKey: "",
  rowKey: "",
  timestamp: "",
};

const BedriftInformation: React.FC<IBedriftInformation> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const [bedriftInfo, setBedriftInfo] = useState<bedriftInfo>(initBedriftInfo);
  const [html, setHtml] = React.useState("");
  const [openEditor, setOpenEditor] = useState(false);

  useEffect(() => {
    getBedriftInformation();
  }, []);

  function onChange(e: { target: { value: React.SetStateAction<string> } }) {
    setHtml(e.target.value);
  }

  const getBedriftInformation = () => {
    apiservice
      .get("cms/getall", { params: { contentType: "Bedrift" } })
      .then((response) => {
        setBedriftInfo(response.data[0]);
        setHtml(response.data[0].info);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveBedriftInformation = () => {
    apiservice
      .post("cms/insert", {
        ContentType: bedriftInfo?.partitionKey,
        Index: bedriftInfo?.rowKey,
        Info: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setBedriftInfo({ ...bedriftInfo, info: html });
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
          <Button variant="contained" onClick={saveBedriftInformation}>
            Lagre endringer
          </Button>
        </Typography>
      )}
    </Container>
  );
};

export default BedriftInformation;
