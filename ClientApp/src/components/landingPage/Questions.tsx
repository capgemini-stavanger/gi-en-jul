import * as React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import useStyles from "./Styles";


const Questions = () => {
  const classes = useStyles();
  //Method used to filter which panel to activate
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel:string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  };

  return (
    <Container id="questions" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>
          Ofte stilte spørsmål
        </Typography>
      </div>
      <Grid container justifyContent="center">
        <Grid className={classes.questionItem}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.questionBox}>
            <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>Hva koster det å gi en jul?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Juleeskene skal minimum inneholde ubrukte gaver til minimum 300
                per person, og en julemiddag og dessert til hele familien. Hvis
                ønskelig kan dere bidra med en ekstra middag, som pølse og
                potetmos, medisterkaker og poteter, julepølse og poteter.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid className={classes.questionItem}>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.questionBox}>
            <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>Når får jeg tildelt en familie?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Familiene deles ut fortløpende, og vi prøver å gi deg familien
                din i god tid før jul.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid className={classes.questionItem}>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}  className={classes.questionBox}>
            <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>Kan jeg legge oppi noe ekstra?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Dersom du har noe pent brukt som passer til alderen, kan du
                legge det oppi. Merk: Dette erstatter ikke julegaven, og det må
                være i god stand.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid className={classes.questionItem}>
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}  className={classes.questionBox}>
            <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>Kan jeg velge familie selv?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Du kan komme med ønske for antall familiemedlemmer.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid className={classes.questionItem}>
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}  className={classes.questionBox}>
            <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>Hvordan vet jeg hva familien ønsker seg?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Når du får tildelt familie vil du også få vite hva de ønsker
                seg. Dersom de ikke har kommet med ønsker, er lue, skjerf,
                votter, lys, servietter, sjokolade og pledd noen tips.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Questions;
