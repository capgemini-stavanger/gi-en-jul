import { DefaultEditor } from "react-simple-wysiwyg";
import React from "react";
import {
  Button,
  Dialog,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ApiService from "common/functions/apiServiceClass";
import { useAuth0 } from "@auth0/auth0-react";
import InformationBox from "./InformationBox";
import { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import useUser from "hooks/useUser";

interface ISendSingleEmail {
  open: boolean;
  handleClose: () => void;
  toEmail: string;
  fullName: string;
}

const SendEmailContent: React.FC<ISendSingleEmail> = ({ open, handleClose, toEmail, fullName }) => {
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [html, setHtml] = React.useState("");
  const [subjectInput, setSubjectInput] = React.useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const apiservice = new ApiService(userAccessToken);
  // States for confirmation box
  const [openConfBox, setOpenConfBox] = React.useState(false);
  const [confText, setConfText] = React.useState("");

  const { location, email } = useUser();

  function onChange(e: { target: { value: React.SetStateAction<string> } }) {
    setHtml(e.target.value);
  }

  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }

  useEffect(() => {
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  });

  async function sendEmailToUser() {
    if (subjectInput == "") {
      setError(true);
      setErrorText("Please enter a subject");
      return;
    }
    await apiservice
      .post(
        "email/send",
        JSON.stringify({
          Subject: subjectInput,
          Content: html,
          FromEmail: email,
          ToEmail: toEmail,
          FromName: "Gi en jul " + location,
          ToName: fullName,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          setConfText("Sendte mail til: " + fullName + " <" + toEmail + ">");
          setOpenConfBox(true);
          setError(false);
          setErrorText("");
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
        setConfText("Problem oppsto under sending av mail!");
        setOpenConfBox(true);
      })
      .finally(() => {
        setSubjectInput("");
        setHtml("");
      });
  }

  return (
    <>
      <Dialog open={open}>
        <TableCell rowSpan={10}>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Sender email til {toEmail} </Typography>
              <TextField
                fullWidth
                placeholder="Enter subject here"
                type="text"
                variant="outlined"
                error={error}
                helperText={errorText}
                value={subjectInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSubjectInput(e.target.value);
                }}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Innhold</Typography>
              <DefaultEditor value={html} onChange={onChange} />
              <Typography variant="h6"></Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variant="contained" endIcon={<SendIcon />} onClick={sendEmailToUser}>
                Send Email
              </Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableCell>
      </Dialog>
      <InformationBox
        open={openConfBox}
        text={confText}
        handleClose={() => {
          setOpenConfBox(false);
        }}
      />
    </>
  );
};

export default SendEmailContent;
