import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/confirmationBox";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import useStyles from "components/superadmin/Styles";

interface IFaqInformation {
  accessToken: string;
  index: string;
}

const FaqInformation: React.FC<IFaqInformation> = ({ accessToken, index }) => {
  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

  const [faq, setFaq] = useState("");
  const [html, setHtml] = useState("");
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [openAddFaqEditor, setOpenAddFaqEditor] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");

  const fetchInformation = () => {
    apiservice
      .get("Cms/GetSingle", {
        params: { contentType: "FAQ", index: index },
      })
      .then((resp) => {
        setFaq(resp.data[0].info);
        setHtml(resp.data[0].info);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchInformation, [index]);
  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }
  const handleSaveClick = () => {
    setOpenConfirmBox(true);
  };

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      saveFaqformation();
    }
  };
  const addNewFaqResponse = (response: boolean) => {
    if (response) {
      makeNewFaq();
    }
  };
  const saveFaqformation = () => {
    apiservice
      .post("cms/insert", {
        ContentType: "FAQ",
        Index: index,
        Info: html,
      })
      .then((response) => {
        if (response.status === 200) {
          setOpenEditor(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const makeNewFaq = () => {
    apiservice
      .post("cms/insert", {
        ContentType: "FAQ",
        Index: "",
        Info: html,
        question: faqQuestion,
      })
      .then((response) => {
        if (response.status === 200) {
          setOpenEditor(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>{parse(faq)}</Box>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setOpenEditor(true);
            }}
          >
            Rediger tekst
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setOpenAddFaqEditor(true), setHtml("");
            }}
          >
            Legg til spørsmål og svar
          </Button>
        </Grid>
        {openAddFaqEditor && (
          <Grid item>
            <TextField
              fullWidth
              placeholder="Enter question here"
              type="text"
              variant="outlined"
              value={faqQuestion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFaqQuestion(e.target.value);
              }}
            />
            <DefaultEditor value={html} onChange={onChange} />
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleSaveClick}>
                  Lagre endringer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenAddFaqEditor(false);
                  }}
                >
                  Avbryt
                </Button>
              </Grid>
            </Grid>

            <ConfirmationBox
              open={openConfirmBox}
              text={"Er du sikker på at du ønsker å oppdatere teksten?"}
              handleClose={() => {
                setOpenConfirmBox(false), setOpenAddFaqEditor(false);
              }}
              handleResponse={addNewFaqResponse}
            />
          </Grid>
        )}

        {openEditor && (
          <Grid item>
            <DefaultEditor value={html} onChange={onChange} />
            <br />
            <Grid container direction="row" spacing={2}>
              <Grid item>
                {" "}
                <Button variant="contained" onClick={handleSaveClick}>
                  Lagre endringer
                </Button>
              </Grid>
              <Grid item>
                <Button
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
              open={openConfirmBox}
              text={"Er du sikker på at du ønsker å oppdatere teksten?"}
              handleClose={() => {
                setOpenConfirmBox(false), setOpenEditor(false);
              }}
              handleResponse={handleSaveResponse}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FaqInformation;
