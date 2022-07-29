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
import { Container, Table } from "reactstrap";
import useStyles from "components/landing-page/Styles";
import UserForm from "./UserForm";
import ConfirmationBox from "components/shared/ConfirmationBox";
import ApiService from "common/functions/apiServiceClass";
import DeleteIcon from "@material-ui/icons/Delete";
import InformationBox from "components/shared/InformationBox";

interface IAddUser {
  accessToken: string;
}

export interface IUser {
  email: string;
  nickname: string;
}

interface User {
  email: string;
  location: string;
  role: string;
  institution: string;
}

const AddUser: React.FC<IAddUser> = ({ accessToken }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("1");
  const [institutions, setInstitutions] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  const apiservice = new ApiService(accessToken);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const fetchUsers = async () => {
    await apiservice
      .get("user/users")
      .then((resp) => {
        handleInstitutions(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (email: string) => {
    await apiservice.delete(`user/delete/?email=${email}`, {}).then(() => {
      setTimeout(async () => {
        await fetchUsers();
      }, 1000);
    });
  };

  const handleInstitutions = (data: User[]) => {
    setInstitutions(data.filter((user) => user.institution || user.role == "Institution"));
    setAdmins(data.filter((user) => !user.institution && user.role != "Institution"));
  };

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  const handleConfirmDelete = (response: boolean) => {
    if (response) {
      deleteUser(selectedEmail);
      setConfirmDelete(true);
    }
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
              <Tab label={<strong>Administrator</strong>} value="1" />
              <Tab label={<strong>Institusjon</strong>} value="2" />
            </TabList>
            <TabPanel value="1" className={classes.root}>
              <UserForm accessToken={accessToken} institution={false} handleRefresh={fetchUsers} />
            </TabPanel>
            <TabPanel value="2">
              <UserForm accessToken={accessToken} institution={true} handleRefresh={fetchUsers} />
            </TabPanel>
          </TabContext>
        </Container>
      </Grid>

      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <Typography className={classes.textHeadline}>Alle brukere</Typography>
        </Grid>

        <Grid item>
          <Container>
            <TabContext value={tab}>
              <TabList onChange={handleChange} centered>
                <Tab label={<strong>Administrator</strong>} value="1" />
                <Tab label={<strong>Institusjon</strong>} value="2" />
              </TabList>
              <TabPanel value="1">
                <Grid item>
                  <Table style={{ width: "1200px" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Rolle</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Lokasjon</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Slett</strong>
                        </TableCell>
                      </TableRow>

                      {admins.map((user, index) => {
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell>
                                <Typography>{user.email}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{user.role}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{user.location}</Typography>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  key={index}
                                  onClick={() => {
                                    setSelectedEmail(user.email);
                                    setOpenDelete(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid item>
                  <Table style={{ width: "1200px" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Institusjon</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Lokasjon</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Slett</strong>
                        </TableCell>
                      </TableRow>

                      {institutions.map((user, index) => {
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell>
                                <Typography>{user.email}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{user.institution}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{user.location}</Typography>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  key={index}
                                  onClick={() => {
                                    setSelectedEmail(user.email);
                                    setOpenDelete(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </TabPanel>
            </TabContext>
          </Container>
        </Grid>
        <ConfirmationBox
          open={openDelete}
          text={"Er du sikker på at du vil slette"}
          handleClose={() => setOpenDelete(false)}
          handleResponse={handleConfirmDelete}
        ></ConfirmationBox>

        <InformationBox
          open={confirmDelete}
          text={"Brukeren har blitt slettet"}
          handleClose={() => setConfirmDelete(false)}
        ></InformationBox>
      </Grid>
    </Grid>
  );
};

export default AddUser;
