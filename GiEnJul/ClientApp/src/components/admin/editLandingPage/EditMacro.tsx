import { Typography } from '@material-ui/core';
import { Button, Container, Grid } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import EditHow from './EditHow';
import EditQuestions from './EditQuestions';
import {  EditorState } from 'draft-js';

export default () => {
    const [step, setStep] = useState<Number>(1);
    const [howState, setHowState] = useState<EditorState>(EditorState.createEmpty());
    const [questionState, setQuestionState] = useState<EditorState>(EditorState.createEmpty());
    const [companyState, setCompanyState] = useState<EditorState>(EditorState.createEmpty());
    const [contactState, setContactState] = useState<EditorState>(EditorState.createEmpty());
    const [startState, setStartState] = useState<EditorState>(EditorState.createEmpty());
    const [saving, setSaving] = useState<boolean>(false);

    
    return (
        <Container>
            <Typography align="center" variant='h4' >Rediger gienjul.no</Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={2}>
                    <Button variant='outlined' fullWidth={true} onClick={() => {
                        setStep(1)
                    }}>HVordan</Button>
                </Grid>
                <Grid item xs={2} >
                    <Button variant='outlined' fullWidth={true} onClick={() => {
                        setStep(2)
                    }}>Spørsmål</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' fullWidth={true} onClick={() => {
                        setStep(3)
                    }}>Bedrifter</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' fullWidth={true} onClick={() => {
                        setStep(4)
                    }}>Kontakt</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='outlined' fullWidth={true} onClick={() => {
                        setStep(5)
                    }}>Start "Gi en jul"</Button>
                </Grid>
            </Grid>
                    
                    <EditHow
                    step = {step}
                    howState = {howState}
                    setHowState = {setHowState}/>
                    <EditQuestions
                    step = {step}
                    questionState ={questionState}
                    setQuestionState ={setQuestionState}
                    />
        </Container>
    )

};