import { Grid, Tab, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import useStyles from "components/landing-page/Styles";
import UserForm from "./UserForm";
import ConfirmationBox from "components/shared/ConfirmationBox";
import ApiService from "common/functions/apiServiceClass";

interface IAddUser {
  accessToken: string;
}

export interface IUser {
  email: string;
  nickname: string;
}
const initInterfaceUser: IUser = {
  email: "",
  nickname: "",
};

const AddUser: React.FC<IAddUser> = ({ accessToken }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("1");
  const [confirmAdd, setConfirmAdd] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);

  const [nicknames, setNicknames] = useState<string[]>([]);

  const apiservice = new ApiService(accessToken);

  const fetchEmails = () => {
    apiservice
      .get("user/getallemails")
      .then((resp) => {
        setEmails(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchEmails, []);

  const fetchNicknames = () => {
    apiservice
      .get("user/getallnicknames")
      .then((resp) => {
        setNicknames(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchNicknames, []);

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  const handleConfirmAdd = (response: boolean) => {
    setConfirmAdd(response);
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Typography className={classes.textHeadline}>Legg til bruker</Typography>
      </Grid>
      <Grid item>
        <Container className={classes.root}>
          <TabContext value={tab}>
            <TabList onChange={handleChange} centered>
              <Tab label="Administrator" value="1" />
              <Tab label="Institusjon" value="2" />
            </TabList>
            <TabPanel value="1" className={classes.root}>
              <UserForm
                accessToken={accessToken}
                institution={false}
                handleConfirm={handleConfirmAdd}
                confirmOpen={confirmAdd}
              />
            </TabPanel>
            <TabPanel value="2">
              <UserForm
                accessToken={accessToken}
                institution={true}
                confirmOpen={confirmAdd}
                handleConfirm={() => {
                  handleConfirmAdd(confirmAdd);
                }}
              />
            </TabPanel>
          </TabContext>
        </Container>
      </Grid>
      <Grid item>
        {confirmAdd && (
          <ConfirmationBox
            open={confirmAdd}
            text={"Er du sikker på at du vil legge til brukeren?"}
            handleClose={() => setConfirmAdd(false)}
            handleResponse={() => setConfirmAdd(confirmAdd)}
          ></ConfirmationBox>
        )}
      </Grid>

      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <Typography className={classes.textHeadline}>Alle brukere</Typography>
        </Grid>

        <Grid item>
          <Table style={{ width: "800px" }}>
            <TableBody>
              <TableRow>
                <TableCell>Navn</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  {nicknames.map((nickname, index) => (
                    <Typography key={index}>{nickname}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {emails.map((email, index) => (
                    <Typography key={index}>{email}</Typography>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddUser;
