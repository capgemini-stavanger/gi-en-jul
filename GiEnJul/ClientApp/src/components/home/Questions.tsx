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
    <Container id="questions" className={classes.section}>
      <Typography variant="h4">Ofte stilte spørsmål</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content-1"
          id="header-1"
        >
          <Typography>Hva koster det å Gi en jul?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Juleeskene skal minimum inneholde ubrukte gaver til minimum 300 per
            person, og en julemiddag og dessert til hele familien. Hvis ønskelig
            kan dere bidra med en ekstra middag, som pølse og potetmos,
            medisterkaker og poteter, julepølse og poteter.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* <CollapseContainer title='Når får jeg familie?' body='Familiene deles ut fortløpende, og vi prøver å gi deg familien din i god tid før jul.' ></CollapseContainer>
        <CollapseContainer title='Kan jeg legge oppi noe ekstra?' body='Dersom du har noe pent brukt som passer til alderen, kan du legge det oppi. Merk: Dette erstatter ikke julegaven, og det må være i god stand.'></CollapseContainer>
        <CollapseContainer title='Kan jeg velge familie selv?' body= 'Du kan komme med ønske for antall familiemedlemmer.'></CollapseContainer>
        <CollapseContainer title='Hvordan vet jeg hva familien ønsker seg?' body='Når du får tildelt familie vil du også få vite hva de ønsker seg. Dersom de ikke har kommet med ønsker, er lue, skjerf, votter, lys, servietter, sjokolade og pledd noen tips.'></CollapseContainer>
 */}
    </Container>
  );
};

export default Questions;
