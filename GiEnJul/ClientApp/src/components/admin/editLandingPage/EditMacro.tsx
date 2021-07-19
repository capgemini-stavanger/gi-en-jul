import { Typography } from "@material-ui/core";
import { Button, Container, Grid } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import EditHow from "./EditHow";
import EditQuestions from "./EditQuestions";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import EditCompany from "./EditCompany";
import EditContact from "./EditContact";
import EditStart from "./EditStart";

export default () => {
  const [step, setStep] = useState<Number>(0);

  const [howState, setHowState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [howTitleState, setHowTitleState] = useState<string>("");

  const [questionState, setQuestionState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [questionTitleState, setQuestionTitleState] = useState<string>("");

  const [companyState, setCompanyState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [companyTitleState, setCompanyTitleState] = useState<string>("");

  const [contactState, setContactState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [contactTitleState, setContactTitleState] = useState<string>("");

  const [startState, setStartState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [startTitleState, setStartTitleState] = useState<string>("");
  //these states will be implemented later
  // const [saving, setSaving] = useState<boolean>(false);

  const save = () => {
    localStorage.setItem(
      "how",
      draftToHtml(convertToRaw(howState.getCurrentContent()))
    );
    console.log(localStorage.getItem("how"));
    // localStorage.setItem('howTitle', draftToHtml(convertToRaw(howTitleState.getCurrentContent())));
  };
  const sections = [
    "Hvordan",
    "Spørsmål",
    "Bedrift",
    "Kontakt",
    "Start Gi en jul",
  ];

  return (
    <Container>
      <Typography align="center" variant="h4">
        Rediger gienjul.no
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {sections.map((key, index) => (
          <Grid item xs={2} key={`section_${index}`}>
            <Button
              variant="outlined"
              fullWidth={true}
              onClick={() => {
                setStep(index);
              }}
            >
              {key}
            </Button>
          </Grid>
        ))}
      </Grid>
      {step === 0 && (
        <EditHow
          howState={howState}
          setHowState={setHowState}
          howTitleState={howTitleState}
          setHowTitleState={setHowTitleState}
        />
      )}
      {step === 1 && (
        <EditQuestions
          questionState={questionState}
          setQuestionState={setQuestionState}
          questionTitleState={questionTitleState}
          setQuestionTitleState={setQuestionTitleState}
        />
      )}
      {step === 2 && (
        <EditCompany
          companyState={companyState}
          setCompanyState={setCompanyState}
          companyTitleState={companyTitleState}
          setCompanyTitleState={setCompanyTitleState}
        />
      )}
      {step === 3 && (
        <EditContact
          contactState={contactState}
          setContactState={setContactState}
          contactTitleState={contactTitleState}
          setContactTitleState={setContactTitleState}
        />
      )}
      {step === 4 && (
        <EditStart
          startState={startState}
          setStartState={setStartState}
          startTitleState={startTitleState}
          setStartTitleState={setStartTitleState}
        />
      )}
      <Button variant="contained" onClick={save}>
        Lagre
      </Button>
    </Container>
  );
};
