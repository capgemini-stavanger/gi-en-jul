import * as React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import useStyles from "./Styles";

const Questions = () => {
  const classes = useStyles();
  return (
    <Container id="questions" className={classes.howContainer}>
      <Typography className={classes.textHeadline}>Ofte stilte spørsmål</Typography>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Hva koster det å Gi en jul?</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
            Juleeskene skal minimum inneholde ubrukte gaver til minimum 300 per
            person, og en julemiddag og dessert til hele familien. Hvis ønskelig
            kan dere bidra med en ekstra middag, som pølse og potetmos,
            medisterkaker og poteter, julepølse og poteter.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Når får jeg familie</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
          Familiene deles ut fortløpende, og vi prøver å gi deg familien din i god tid før jul.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Kan jeg legge oppi noe ekstra?</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
          Dersom du har noe pent brukt som passer til alderen, kan du legge det oppi. Merk: Dette erstatter ikke julegaven, og det må være i god stand.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Kan jeg legge oppi noe ekstra?</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
          Dersom du har noe pent brukt som passer til alderen, kan du legge det oppi. Merk: Dette erstatter ikke julegaven, og det må være i god stand.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Kan jeg velge familie selv?</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
          Du kan komme med ønske for antall familiemedlemmer.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.questionBox}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}>
          <Typography>Hvordan vet jeg hva familien ønsker seg?</Typography>
        </AccordionSummary>
        <AccordionDetails
        className={classes.questionBox}>
          <Typography>
          Når du får tildelt familie vil du også få vite hva de ønsker seg. Dersom de ikke har kommet med ønsker, er lue, skjerf, votter, lys, servietter, sjokolade og pledd noen tips.</Typography>
        </AccordionDetails>
      </Accordion>
      <div className={classes.questionBox}></div>
    </Container>
  );
};
export default Questions;
