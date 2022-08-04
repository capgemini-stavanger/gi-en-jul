import { Grid, Typography } from "@material-ui/core";
import FormInformationBox from "./FormInformationBox";
import useStyles from "./Styles";

const informationList: string[] = [
  "Før du melder inn en familie må familien ha sagt ja til å bli med, og du har all informasjon som trengs nedenfor.",
  "Mange givere synes det er fint å kunne kjøpe inn gaver, og ikke bare gavekort.",
  "Gaveønskene skal ligge på rundt 300 kr per person. Kom gjerne med flere ønsker, så har giveren noe å velge mellom.",
  "Alderstilpasset gave betyr at giveren selv kan finne noe som passer til alderen.",
];

const RegistrationInfo = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography className={classes.titleText} variant="h3">
              Registrer familie
            </Typography>
            <Typography>Tusen takk for at du melder inn familie til Gi en jul.</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={4}>
          {informationList.map((info, index) => (
            <Grid key={index} item xs={3}>
              <FormInformationBox index={index + 1} info={info} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RegistrationInfo;
