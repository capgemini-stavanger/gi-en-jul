import * as React from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  List,
  ListItemText,
} from "@material-ui/core";

const How = () => (
  <Container id="how">
    <CssBaseline />
    <Grid>
      <Typography variant="h5">Hvordan fungerer gi en jul?</Typography>
      <List>
        <ListItemText primary="Alene, eller sammen med vennegjengen, kolleger, familie eller naboer bestemmer du deg for at du vil bli med på Gi en jul."></ListItemText>
        <ListItemText primary="På gienjul.no registrerer du deg som giver og opplyser antall familiemedlemmer du/dere ønsker å hjelpe."></ListItemText>
        <ListItemText>
          I mellomtiden jobber barnevernet, NAV og Flyktningtjenesten med å
          kartlegge og finne familier som trenger hjelp.
        </ListItemText>
        <ListItemText>
          Når du har registrert deg får du en mail med info, hvor det står
          hvordan det fungerer med selve juleeskene, hva som skal oppi, hvor de
          skal leveres og når.
        </ListItemText>
        <ListItemText>
          Så snart jeg får inn familiene matcher jeg familie og giver, og sender
          en epost til deg med kjønn, alder og gaveønsker til familiemedlemmene.
          Det er selvsagt helt anonymt.
        </ListItemText>
        <ListItemText>
          Til slutt møtes vi dato i x lokaler, hvor eskene blir kjørt ut av de
          som jobber i de ulike instansene.
        </ListItemText>
      </List>
    </Grid>
  </Container>
);

export default How;
