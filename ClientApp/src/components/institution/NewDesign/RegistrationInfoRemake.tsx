import { Grid, Typography } from "@material-ui/core";

const information: string[] = [
  "Før du melder inn en familie må familien ha sagt ja til å bli med, og du har all informasjon som trengs nedenfor.",
  "Mange givere synes det er fint å kunne kjøpe inn gaver, og ikke bare gavekort.",
  "Gaveønskene skal ligge på rundt 300 kr per person. Kom gjerne med flere ønsker, så har giveren noe å velge mellom.",
  "Alderstilpasset gave betyr at giveren selv kan finne noe som passer til alderen.",
];

const RegistrationInfoRemake = () => {
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h3">Registrer familie</Typography>
            <Typography>Tusen takk for at du melder inn familie til Gi en jul.</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={3}
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item> COMPONENT 1 </Grid>
          <Grid item> COMPONENT 2 </Grid>
          <Grid item> COMPONENT 3 </Grid>
          <Grid item> COMPONENT 4 </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RegistrationInfoRemake;
