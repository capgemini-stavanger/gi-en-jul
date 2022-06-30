import { DefaultEditor } from "react-simple-wysiwyg";
import React from "react";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Input,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { GiverType } from "./Types";
import ApiService from "common/functions/apiServiceClass";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import ConfirmationBox from "./ConfirmationBox";

interface ISendSingleEmail {
  open: boolean;
  handleClose: () => void;
  giver: GiverType;
}

const SendEmailContent: React.FC<ISendSingleEmail> = ({
  open,
  handleClose,
  giver,
}) => {
  const [html, setHtml] = React.useState("");
  const [subjectInput, setSubjectInput] = React.useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const apiservice = new ApiService(userAccessToken);
  // States for confirmation box
  const [openConfBox, setOpenConfBox] = React.useState(false);
  const [confText, setConfText] = React.useState("");

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

  async function sendEmailPost() {
    await apiservice
      .post(
        "email/send",
        JSON.stringify({
          EmailAddress: giver.email,
          Subject: subjectInput,
          Content: html,
          RecipientName: giver.fullName,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          // todo: Open dialog box here, all good
          setConfText("Sendte email til: " + giver.email);
          setOpenConfBox(true);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
        // todo: open dialog box here, not good
        setConfText("Problem oppsto under sending av mail!");
        setOpenConfBox(true);
      });
    setSubjectInput("");
    setHtml("");
  }

  return (
    <>
      <Dialog open={open}>
        <TableCell rowSpan={10}>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Send email to {giver.email} </Typography>
              <TextField
                fullWidth
                placeholder="Enter subject here"
                type="text"
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
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendEmailPost}
              >
                Send Email
              </Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableCell>
      </Dialog>
      <ConfirmationBox
        isOpen={openConfBox}
        handleClose={() => {
          setOpenConfBox(false);
        }}
        text={"You just sent a mail"}
      />
    </>
  );
};

export default SendEmailContent;
