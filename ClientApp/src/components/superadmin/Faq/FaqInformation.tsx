import { useState, useEffect } from "react";
import ApiService from "common/functions/apiServiceClass";
import { Box, Button, Divider, Grid, TextField } from "@material-ui/core";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import useStyles from "components/superadmin/Styles";

interface IFaqInformation {
  accessToken: string;
  index: string;
  getFaqInformation: () => void;
}

const FaqInformation: React.FC<IFaqInformation> = ({ accessToken, index, getFaqInformation }) => {
  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

  const [faq, setFaq] = useState("");
  const [html, setHtml] = useState("");
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openConfirmBox2, setOpenConfirmBox2] = useState(false);
  const [openConfirmBox3, setOpenConfirmBox3] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [openAddFaqEditor, setOpenAddFaqEditor] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const fetchInformation = () => {
    if (index.length > 0) {
      setShowButtons(true);
    }
    if (!index) {
      // FAQ is not set (FAQ starts as an empty string in the parent)
      return;
    }
    apiservice
      .get("Cms/GetSingle", {
        params: { contentType: "FAQ", index: index },
      })
      .then((resp) => {
        setFaq(resp.data.info);
        setHtml(resp.data.info);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchInformation, [index]);

  function onChange(e: ContentEditableEvent) {
    setHtml(e.target.value);
  }

  const handleDeleteClick = () => {
    setOpenConfirmBox3(true);
  };

  const handleConfirmDelete = (response: boolean) => {
    if (response) {
      apiservice
        .post("Cms/deleteSingle", {
          ContentType: "FAQ",
          Index: index,
        })
        .then(() => {
          setFaq("");
          setHtml("");
          getFaqInformation();
        })
        .catch((errorStack) => {
          console.error(errorStack);
        });
    }
  };

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      apiservice
        .post("cms/insert", {
          ContentType: "FAQ",
          Index: index,
          Info: html,
        })
        .then((response) => {
          if (response.status === 200) {
            setOpenEditor(false);
            getFaqInformation();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const addNewFaqResponse = (response: boolean) => {
    if (response) {
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
            getFaqInformation();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box>{parse(faq)}</Box>
        </Grid>
        {showButtons && (
          <>
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => {
                  setOpenEditor(true);
                  setOpenAddFaqEditor(false);
                  setHtml(faq);
                }}
              >
                Rediger tekst
              </Button>
              <Button
                hidden={openAddFaqEditor}
                style={{ marginLeft: "10px" }}
                className={classes.buttonError}
                variant="contained"
                onClick={handleDeleteClick}
              >
                Slett spørsmål og svar
              </Button>
              <ConfirmationBox
                open={openConfirmBox3}
                text={"Er du sikker på at du ønsker å slette dette ofte stilte spørsmålet?"}
                handleClose={() => {
                  setOpenConfirmBox3(false);
                }}
                handleResponse={handleConfirmDelete}
              />
            </Grid>
          </>
        )}

        {openAddFaqEditor && (
          <Grid item>
            <TextField
              fullWidth
              placeholder="Skriv spørsmål her"
              type="text"
              variant="outlined"
              value={faqQuestion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFaqQuestion(e.target.value);
              }}
            />
            <DefaultEditor value={html} onChange={onChange} />
            <Grid container direction="row" spacing={2} style={{ marginTop: "10px" }}>
              <Grid item>
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => {
                    setOpenConfirmBox(true);
                  }}
                >
                  Lagre endringer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.buttonError}
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
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={() => {
                    setOpenConfirmBox2(true);
                  }}
                >
                  Lagre endringer
                </Button>
              </Grid>
              <Grid item>
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
              open={openConfirmBox2}
              text={"Er du sikker på at du ønsker å oppdatere teksten?"}
              handleClose={() => {
                setOpenConfirmBox2(false), setOpenEditor(false);
              }}
              handleResponse={handleSaveResponse}
            />
          </Grid>
        )}
        <Divider />
        <Grid item>
          <Button
            hidden={openAddFaqEditor}
            className={classes.button}
            variant="contained"
            onClick={() => {
              setOpenAddFaqEditor(true), setHtml(""), setOpenEditor(false);
            }}
          >
            Legg til nytt spørsmål og svar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FaqInformation;
