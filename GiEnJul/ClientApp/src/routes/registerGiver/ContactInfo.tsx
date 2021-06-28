import * as React from 'react';
import { Button, Grid, Container} from '@material-ui/core';
import useStyles from './Styles';
import validator from 'validator';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useEffect } from 'react';


type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string; }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values }) => {
    let errorMessage; 

    const Continue = (e: any) => {
        e.preventDefault();
        nextStep();
    }

    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();

    useEffect( ()=> {
        ValidatorForm.addValidationRule('isTlf', (value) => {
            if (validator.isMobilePhone(value, ["nb-NO", "nn-NO"])){
                return true;
            }
            else {
                return false;
            }   
    });

        ValidatorForm.addValidationRule('isValid', (value) => {
            if (value === ("")){
                console.log('andre gang')
                return false;
            }
            else if (value === undefined) {
                console.log('første gang')
                return false;
            }
            else {
                return true;
            }

        })
    return () => {
        ValidatorForm.removeValidationRule('isTlf')
        ValidatorForm.removeValidationRule('isValid')

    }

    }, [])
    

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
                label="Epost*"
                onChange={handleEmailChange}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['Vennligst skriv inn din epost', 'Eposten er ikke gyldig']}
                autoComplete="email"
                variant="outlined"
                margin="normal"
                fullWidth
                />
                <TextValidator
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


