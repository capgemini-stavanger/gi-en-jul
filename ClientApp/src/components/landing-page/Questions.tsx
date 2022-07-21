import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from "@material-ui/core";
import useStyles from "./Styles";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import DotLoader from "common/constants/DotLoader";
import parse from "html-react-parser";

interface Question {
  question: string; // question
  info: string; // answer
}

const Questions = () => {
  const classes = useStyles();
  // Method used to filter which panel to activate
  const [expanded, setExpanded] = useState<string | false>(false);
  const [questions, setQuestions] = useState<Question[] | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const apiservice = new ApiService();
  const fetchQuestions = () => {
    apiservice
      .get("Cms/Getall", {
        params: { contentType: "FAQ" },
      })
      .then((resp) => {
        setQuestions(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchQuestions, []);

  return (
    <Container id="questions" className={classes.sectionContainer}>
      <div className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>Ofte stilte spørsmål</Typography>
      </div>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        {questions ? (
          Array.from(questions).map((val, index) => (
            <Grid className={classes.questionItem} key={index}>
              <Divider />
              <Accordion
                expanded={expanded === index.toString()}
                onChange={handleChange(index.toString())}
              >
                <AccordionSummary
                  className={classes.questionSummary}
                  expandIcon={<ExpandMoreIcon className={classes.questionSummary} />}
                >
                  <Typography className={classes.questionText}>{val.question}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.questionDetails}>
                  <Typography>{parse(val.info)}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))
        ) : (
          <DotLoader />
        )}
      </Grid>
    </Container>
  );
};
export default Questions;
