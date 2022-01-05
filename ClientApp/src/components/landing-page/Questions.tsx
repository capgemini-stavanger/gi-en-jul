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
import {faq} from "common/constants/FAQs"

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
        {Array.from(faq).map((val,index)=>(
          <Grid className={classes.questionItem} key={index}>
          <Accordion  expanded={expanded === index.toString()} onChange={handleChange(index.toString())}>
          <AccordionSummary
              className={classes.questionSummary}
              expandIcon={
                <ExpandMoreIcon className={classes.questionSummary} />
              }
            >
              <Typography>{val.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {val.answer}
                </Typography>
              </AccordionDetails>
          </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Questions;