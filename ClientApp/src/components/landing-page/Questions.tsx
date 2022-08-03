import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Box,
} from "@material-ui/core";
import useStyles from "./Styles";
import { useEffect, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import DotLoader from "common/constants/DotLoader";
import parse from "html-react-parser";
import { isMobile } from "common/functions/IsMobile";

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
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item className={classes.headLineContainer}>
        <Typography className={classes.textHeadline}>Ofte stilte spørsmål</Typography>
      </Grid>
      {isMobile() ? (
        <Grid item xs={12}>
          {questions ? (
            Array.from(questions).map((val, index) => (
              <Box className={classes.questionItem} key={index}>
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
              </Box>
            ))
          ) : (
            <DotLoader />
          )}
        </Grid>
      ) : (
        <Grid item xs={6}>
          {questions ? (
            Array.from(questions).map((val, index) => (
              <Box className={classes.questionItem} key={index}>
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
              </Box>
            ))
          ) : (
            <DotLoader />
          )}
        </Grid>
      )}
    </Grid>
  );
};
export default Questions;
