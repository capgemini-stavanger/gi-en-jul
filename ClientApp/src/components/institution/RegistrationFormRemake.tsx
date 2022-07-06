import { Button, Container, Divider, Grid, Radio, TextField, Typography } from "@material-ui/core";
import RegistrationInfoRemake from "./RegistrationInfoRemake";
import useStyles from "./Styles";

interface props {
  accessToken: string;
}

const RegistrationFormRemake: React.FC<props> = ({ accessToken }) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Grid container direction="column" spacing={10}>
          <Grid item>
            <RegistrationInfoRemake />
          </Grid>
          {/* --- THE FOLLOWING WILL BE 1 COMPONENT; RegistrationForm, LIKE BEFORE | CAN IT BE SEVERAL? */}
          <Divider className={classes.divider}></Divider>
          <Grid item>
            {/* CONTACT PERSON FORM */}
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography variant="h5">Kontaktperson *</Typography>
                    <Typography>Vennligst fyll ut navn, telefon og email</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={3}>
                  <Grid item>
                    <TextField label="Navn" variant="outlined"></TextField>
                  </Grid>
                  <Grid item>
                    <TextField label="Telefon" variant="outlined"></TextField>
                  </Grid>
                  <Grid item>
                    <TextField label="Email" variant="outlined"></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item>
            {/* FOOD WISHES FORM */}
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Typography variant="h5">Matønsker *</Typography>
                <Typography>Vennligst fyll ut familiens matønsker</Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={3}>
                  <Grid item>
                    <Typography>Middag*</Typography>
                    Mat 1 <Radio /> <br />
                    Mat 2 <Radio /> <br />
                    Annet <Radio /> <TextField variant="outlined" size="small" /> <br />
                  </Grid>
                  <Grid item>
                    <Typography>Dessert*</Typography>
                    Mat 1 <Radio /> <br />
                    Mat 2 <Radio /> <br />
                    Annet <Radio /> <TextField variant="outlined" size="small" /> <br />
                  </Grid>
                  <Grid item>
                    <Typography>Kommentarer</Typography> <br />
                    <TextField multiline variant="outlined" rows={4} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item>
            {/* FAMILY FORM */}
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Typography variant="h5">Familie *</Typography>
                <Typography>Vennligst fyll familiens informasjon og gaveønsker</Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={3}>
                  <Grid item>COMPONENT 1</Grid>
                  <Grid item>COMPONENT 2</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>FORM PERSON 1</Grid>
                      <Grid item>FORM PERSON 2</Grid>
                      <Grid item>
                        <Button> ADD PERSON </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item>
            {/* FAMILY ID */}
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography variant="h5"> Family ID *</Typography>
                    <Typography>Hvis familien har PID..</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <TextField variant="outlined" size="small" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* SUBMIT BUTTON */}
            <Grid container justifyContent="center">
              <Grid item>
                <Button variant="contained" type="submit" color="primary">
                  SEND
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RegistrationFormRemake;
