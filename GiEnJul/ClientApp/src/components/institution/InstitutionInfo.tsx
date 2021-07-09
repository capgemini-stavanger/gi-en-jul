import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import * as React from "react";

const RegistrationInfo = () => (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <Typography variant="h3">Registrer familie</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h6">
        Tusen takk for at du melder inn familie til Gi en jul. Husk:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1">
            Fyll inn størrelser dersom de ønsker klær eller sko.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Alderstilpasset gave betyr at giveren selv kan finne noe som passer
            til alderen.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Skriv så detaljerte ønsker som mulig -dersom barnet ikke har ønsker
            kan du skrive noe om interesser, som fotball, hobbyting, turn osv.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Husk å skrive dersom familien har spesielle behov.
          </Typography>
        </li>
      </ul>
    </Grid>
  </Grid>
);

export default RegistrationInfo;
