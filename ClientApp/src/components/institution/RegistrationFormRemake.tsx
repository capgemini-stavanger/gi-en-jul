import { Box, Container, Divider, Grid } from "@material-ui/core";
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
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <RegistrationInfoRemake />
          </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item> CONTACT PERSON FORM </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item> REGISTER FAMILY FORM </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item> FOOD WISHES FORM </Grid>
          <Divider className={classes.divider}></Divider>
          <Grid item> FAMILY ID FORM </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RegistrationFormRemake;
