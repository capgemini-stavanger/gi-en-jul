import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { FC } from "react";
import useStyles from "./Styles";

interface IPrivacyDialog {
  privacyState: boolean;
  setPrivacyState: (isChecked: boolean) => void;
  onClose: () => void;
  open: boolean;
}

const PrivacyTexts = {
  headers: [
    "Behandlingsansvarlig",
    "Personopplysninger som lagres",
    "Formål med behandlingen",
    "Grunnlaget for behandlingen",
    "Innhenting av personopplysninger",
    "Utlevering av opplysninger til tredjeparter",
    "Sletting av personopplysninger",
    "Rettigheter for den registrerte",
    "Informasjonssikkerhet",
  ],
  text: [
    "Gi en jul er behandlingsansvarlig for behandling av personopplysninger.",
    "Vi lagrer følgende personopplysninger om våre kunder:navn, telefonnummer, e-postadresse.",
    "Vi behandler opplysningene for å kunne gjennomføre prosjektet. Personopplysninger vil bli brukt for å koble givere og familier, informasjonsflyt angående prosjektet og generell kontakt om det er nødvendig.",
    "Informasjon om navn, telefon, e-postadresse benyttes for å oppfylle avtalen. Grunnlaget for denne behandlingen er personvernforordningens artikkel Art 6 (b).",
    "Vi lagrer de personopplysningene du har avgitt på våre nettsider.",
    "Vi vil ikke dele, selge, overføre eller på annen måte utlevere personopplysninger til andre, med mindre vi er rettslig forpliktet til det.",
    "Opplysninger vi har mottatt i forbindelse med din deltagelse i Gi en jul lagres i vårt aktive database i 13 måneder.",
    "Vi behandler dine personopplysninger i henhold til personopplysningsloven og gjeldende forskrifter. Det gjøres oppmerksom på at du kan kreve innsyn i og flytting av egne personopplysninger, samt kreve retting eller sletting av opplysninger. Det kan klages til Datatilsynet på behandling i strid med reglene.",
    "Vi sikrer dine personopplysninger ved både fysisk og virtuell adgangs- og tilgangskontroll, samt ved kryptering av sensitive deler av avgitte opplysninger.",
  ],
};

const PrivacyDialog: FC<IPrivacyDialog> = ({ privacyState, setPrivacyState, onClose, open }) => {
  const classes = useStyles();

  const handleAgree = () => {
    setPrivacyState(true);
    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title" disableTypography>
        <Typography variant="h5" className={classes.policyTitle}>
          Personvernerklæring for Gi en jul
        </Typography>
        {onClose ? (
          <IconButton className={classes.rightMiddleAlign} aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        {PrivacyTexts.headers.map((head, i) => (
          <React.Fragment key={i}>
            <Typography variant="h6">
              {i + 1}
              {". " + head}
            </Typography>
            <Typography>{PrivacyTexts.text[i]}</Typography>
            <br />
          </React.Fragment>
        ))}
        <Typography variant="subtitle2">Kontaktinformasjon</Typography>
        <Typography variant="caption">
          Henvendelser om hvilke opplysninger som er registrert, retting og sletting kan sende
          skriftlig til følgende adresser:
          <a href={"mailto:stavanger@gienjul.no"}> stavanger@gienjul.no</a>
        </Typography>
      </DialogContent>
      {!privacyState && (
        <DialogActions>
          <Button autoFocus onClick={handleAgree} color="primary">
            Gi samtykke
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PrivacyDialog;
