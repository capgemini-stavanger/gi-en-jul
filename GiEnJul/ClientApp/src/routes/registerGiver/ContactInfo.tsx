import * as React from 'react';
import { Button, Grid, Container} from '@material-ui/core';
import useStyles from './Styles';
import validator from 'validator';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useEffect, useState } from 'react';


type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string; }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values }) => {
    const [errorPhone, setErrorPhone]= useState(false);
    const [errorPhoneText, setErrorPhoneText] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setErrorEmailText] = useState('');

    const Continue = (e: any) => {
        e.preventDefault();
        if(values.phoneNumber !== undefined && !!!validator.isMobilePhone(values.phoneNumber, ["nb-NO", "nn-NO"])){
                setErrorPhone(true);
                setErrorPhoneText('Telefonnummeret er ikke gyldig')
                return;
        }
        if (values.email !== undefined && !!!validator.isEmail(values.email)){
                setErrorEmail(true);
                setErrorEmailText('Eposten er ikke gyldig')
                return;
        }
        else {
            setErrorEmail(false);
            setErrorEmailText('');
            setErrorPhone(false);
            setErrorPhoneText('')
            nextStep();
        }
    }

    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();
    return (
        <Container>
            <ValidatorForm 
            style={{width: '100%', marginTop: '5px'}}
            onSubmit={Continue}
            >
                <TextValidator
                autoFocus
                    label="Fult navn*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="fullname"
                    autoComplete="name"
                    value={values.fullname}
                    onChange={handlefullnameChange}
                    validators={['required']}
                    errorMessages={['Vennligst skriv inn ditt navn']}
                />
                <TextValidator
                error = {errorEmail}
                helperText= {errorEmailText}
                label="Epost*"
                onChange={handleEmailChange}
                name="email"
                value={values.email}
                validators={['required']}
                errorMessages={['Vennligst skriv inn din epost']}
                autoComplete="email"
                variant="outlined"
                margin="normal"
                fullWidth
                />
                <TextValidator
                error = {errorPhone}
                helperText= {errorPhoneText}
                label="Telefonnummer*"
                onChange={handleTlfChange}
                name="phoneNumber"
                value={values.phoneNumber}
                validators={['required']}
                errorMessages={['Vennligst skriv inn ditt telefonnummer']}
                autoComplete="tel"
                variant="outlined"
                margin="normal"
                fullWidth>
                </TextValidator>
            <Grid container spacing={2} justify="center" className={classes.submit}>
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                    </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">Neste</Button>
                </Grid>
            </Grid>
            </ValidatorForm>
            </Container>
    )
}
export default ContactInfo


