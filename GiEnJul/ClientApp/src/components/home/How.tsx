import * as React from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Box,
} from "@material-ui/core";
import useStyles from "./Styles";
import {ExpandMore} from '@material-ui/icons';

const How = () => {
  const classes = useStyles();
  return(
  <Container id="how">
    <CssBaseline />
    
      <Typography className={classes.textHeadline} >Hvordan fungerer gi en jul?</Typography>
      <Grid container className={classes.howContainer}>
      <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>Alene, eller sammen med vennegjengen, kolleger, familie eller naboer bestemmer du deg for at du vil bli med på Gi en jul</Typography>
        </Box>
        <ExpandMore className={classes.nextIcon}/>
        <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>På gienjul.no registrerer du deg som giver og opplyser antall familiemedlemmer du/dere ønsker å hjelpe</Typography>
        </Box>
        <ExpandMore className={classes.nextIcon}/>
        <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>I mellomtiden jobber barnevernet, NAV og Flyktningtjenesten med å
          kartlegge og finne familier som trenger hjelp</Typography>
        </Box>
        <ExpandMore className={classes.nextIcon}/>
        <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>Når du har registrert deg får du en mail med info, hvor det står
          hvordan det fungerer med selve juleeskene, hva som skal oppi, hvor de
          skal leveres og når</Typography>
        </Box>
        <ExpandMore className={classes.nextIcon}/>
        <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>Så snart jeg får inn familiene matcher jeg familie og giver, og sender
          en epost til deg med kjønn, alder og gaveønsker til familiemedlemmene.
          Det er selvsagt helt anonymt.</Typography>
        </Box>
        <ExpandMore className={classes.nextIcon}/>
        <Box 
        className={classes.howItem}
        boxShadow={1}>
          <Typography>Til slutt møtes vi dato i x lokaler, hvor eskene blir kjørt ut av de som jobber i de ulike instansene</Typography>
        </Box>
    </Grid>
  </Container>
  )
  };

export default How;
