import { Grid, Typography } from "@material-ui/core";
import * as React from "react";

const information: string[] = [
  "Før du melder inn en familie må familien ha sag ja til å bli med, og du har all informasjon som trengs nedenfor.",
  "Dersom du har en ID på familien (som PID), må det legges inn.",
  "Mange givere synes det er fint å kunne kjøpe inn gaver, og ikke bare gavekort.",
  "Gaveønskene skal ligge på rundt 300 kr per person. Kom gjerne med flere ønsker, så har giveren noe å velge mellom.",
  "Fyll inn størrelser dersom de ønsker klær eller sko.",
  "Alderstilpasset gave betyr at giveren selv kan finne noe som passer til alderen.",
  "Skriv så detaljerte ønsker som mulig -dersom barnet ikke har ønsker kan du skrive noe om interesser, som fotball, hobbyting, turn osv.",
  "Husk å skrive dersom familien har spesielle behov.",
  "Et sammendrag av familiens info og ønsker blir sendt til giver. Skriv derfor utfyllende og fullstendige setninger.",
  "Under Kontaktpersonfeltet så må du skrive ditt navn, din telefon og din epost.",
];

const RegistrationInfo = () => {
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Typography variant="h3">Registrer familie</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Tusen takk for at du melder inn familie til Gi en jul. Husk:
        </Typography>
        <ul>
          {information.map((informationPoint) => (
            <li>
              <Typography variant="body1">{informationPoint}</Typography>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default RegistrationInfo;
