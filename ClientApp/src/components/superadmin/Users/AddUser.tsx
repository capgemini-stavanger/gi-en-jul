import { Grid, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { Container } from "reactstrap";
import useStyles from "components/landing-page/Styles";
import UserForm from "./UserForm";
import ConfirmationBox from "components/shared/ConfirmationBox";

interface IAddUser {
  accessToken: string;
}

const AddUser: React.FC<IAddUser> = ({ accessToken }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<string>("1");
  const [confirmAdd, setConfirmAdd] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<any>, newValue: string) => {
    setTab(newValue);
  };

  const handleConfirmAdd = (response: boolean) => {
    setConfirmAdd(response);
  };

  const handleClose = () => {};

  const handleConfirm = () => {};

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
            handleClose={handleClose}
            handleResponse={handleConfirm}
          ></ConfirmationBox>
        )}
      </Grid>
    </Grid>
  );
};

export default AddUser;
