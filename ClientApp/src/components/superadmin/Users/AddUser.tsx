import {
  Grid,
  IconButton,
  Tab,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import useStyles from "components/landing-page/Styles";
import UserForm from "./UserForm";
import ConfirmationBox from "components/shared/ConfirmationBox";
import ApiService from "common/functions/apiServiceClass";
import DeleteIcon from "@material-ui/icons/Delete";

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
  const [meta, setMeta] = useState<string[]>([]); //denne er en dictionairy ikke en liste, må være dobbel?
  const [selectedUser, setSelectedUser] = useState<string>("");

  const [nicknames, setNicknames] = useState<string[]>([]);

  const apiservice = new ApiService(accessToken);

  const fetchEmails = () => {
    apiservice
      .get("user/getemails")
      .then((resp) => {
        setEmails(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchEmails, []);

  const deleteUser = (email: string) => {
    apiservice.delete(`user/delete/?email=${email}`, {}).then(() => {
      fetchEmails();
    });
  };

  const fetchNicknames = () => {
    apiservice
      .get("user/getnicknames")
      .then((resp) => {
        setNicknames(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchNicknames, []);

  const fetchMeta = () => {
    apiservice
      .get("user/getmeta")
      .then((resp) => {
        setMeta(resp.data.key);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchMeta, []);

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
                handleRefresh={fetchEmails}
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
                handleRefresh={fetchEmails}
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

      <Grid container spacing={3} direction="column" alignItems="center" className={classes.root}>
        <Grid item>
          <Typography className={classes.textHeadline}>Alle brukere</Typography>
        </Grid>

        <Grid direction="row" alignItems="center">
          <Grid item>
            <Table style={{ width: "1200px" }}>
              <TableBody>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Rolle</TableCell>
                  <TableCell>Lokasjon</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    {emails.map((email, index) => {
                      return (
                        <>
                          <Typography key={index}>
                            <IconButton
                              onClick={() => {
                                deleteUser(email);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            {email}
                          </Typography>
                        </>
                      );
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddUser;
