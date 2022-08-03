import { DefaultEditor } from "react-simple-wysiwyg";
import React, { useEffect } from "react";
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
import InformationBox from "./InformationBox";
import SendIcon from "@material-ui/icons/Send";
import { User } from "./Types";

interface ISendSingleEmail {
  open: boolean;
  handleClose: () => void;
  toEmail: string;
  fullName: string;
  accessToken: string;
  user: User;
}

const SendEmailContent: React.FC<ISendSingleEmail> = ({
  open,
  handleClose,
  toEmail,
  fullName,
  accessToken,
  user,
}) => {
  const apiservice = new ApiService(accessToken);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [html, setHtml] = React.useState("");
  const [subjectInput, setSubjectInput] = React.useState("");
  const [openConfBox, setOpenConfBox] = React.useState(false);
  const [confText, setConfText] = React.useState("");

  useEffect(() => {
    return () => {
      // Prevent memory leak by resetting values that MAY be part of async functions (?)
      setError(false);
      setErrorText("");
      setHtml("");
      setSubjectInput("");
      setOpenConfBox(false);
      setConfText("");
    };
  }, []);

  function onChange(e: { target: { value: React.SetStateAction<string> } }) {
    setHtml(e.target.value);
  }

  async function sendEmailToUser() {
    if (subjectInput == "") {
      setError(true);
      setErrorText("Please enter a subject");
      return;
    }
    await apiservice
      .post(
        "email/sendFromUser",
        JSON.stringify({
          Subject: subjectInput,
          Content: html,
          FromEmail: user.email,
          ToEmail: toEmail,
          FromName: "Gi en jul " + user.location,
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
