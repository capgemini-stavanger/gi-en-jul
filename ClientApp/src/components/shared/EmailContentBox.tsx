import {DefaultEditor} from "react-simple-wysiwyg"
import React from "react";
import { Button, Dialog, IconButton, Input, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { GiverType } from "./Types";
import ApiService from "common/functions/apiServiceClass";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect, useState } from "react";


interface ISendSingleEmail {

    open: boolean;
    handleClose: () => void;
    giver: GiverType;
 }




const SendSingleEmail: React.FC<ISendSingleEmail> = (
    {
        open,
        handleClose,
        giver,
    }
) => { 
      
    const [html, setHtml] = React.useState('');
    const [subjectInput, setSubjectInput] = React.useState('');
    const { getAccessTokenSilently } = useAuth0();
    const [userAccessToken, setUserAccessToken] = useState<string>("");
    const apiservice = new ApiService(userAccessToken);
    
    function onChange(e: { target: { value: React.SetStateAction<string>; }; }) {
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
        console.log('Sending email Post...');
        
        await apiservice
          .post("email/send", 
            JSON.stringify({
              EmailAddress: giver.email,
              Subject: subjectInput,
              Content: html,
              RecipientName: giver.fullName
            })
          )
          .then((response) => {
            console.log(response)
          })
          .catch((errorStack) => {
            console.error(errorStack);
          });
      }
    function sendEmail(inputString:string, htmlInput : string) {
    console.log(htmlInput);
    console.log(inputString);
    console.log(userAccessToken);
    }

    return (
     <Dialog
        open = {open}>
          
            <TableCell rowSpan={10}>
                <TableRow>
                    <TableCell>
                    <Typography variant="h6">Send email to {giver.email} </Typography>
                    <TextField fullWidth placeholder="Enter subject here" type="text" value={subjectInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSubjectInput(e.target.value)}}/>
                    </TableCell>
                    <TableCell>
                    <IconButton
                        onClick={handleClose}
                        aria-label="close" >
                        <CloseIcon />
                        </IconButton>
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                    <TableCell>
                    <Typography variant="h5">Innhold</Typography>
                        <DefaultEditor value={html} onChange={onChange} />
                    </TableCell>
                </TableRow>
                  
            </TableCell>
      
       
        <Button onClick={() => {sendEmailPost(); setSubjectInput("");setHtml("")}}>Send Email</Button>
      </Dialog>
    );
  }

  export default SendSingleEmail;