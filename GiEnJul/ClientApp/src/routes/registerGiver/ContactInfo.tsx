import * as React from 'react';
import { Button, Grid, Container} from '@material-ui/core';
import useStyles from './Styles';
import validator from 'validator';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string; }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values }) => {

    const Continue = (e: any) => {
        e.preventDefault();
        nextStep();
    }

    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();

   
    ValidatorForm.addValidationRule('isName', (value) => {
            if (validator.isAscii(value)) {
                return true;
            }
            return false;
    });

    ValidatorForm.addValidationRule('isTlf', (value) => {
        if (validator.isMobilePhone(value, ["nb-NO", "nn-NO"])) {
            return true;
        }
        return false;
});

    return (
        <Container>
            <ValidatorForm 
            style={{width: '100%', marginTop: '5px'}}
            onSubmit={Continue}
            >
                <TextValidator
                    label="Fult navn*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="fullname"
                    autoComplete="name"
                    autoFocus
                    value={values.fullname}
                    onChange={handlefullnameChange}
                    validators={['required', 'isName']}
                    errorMessages={['Vennligst skriv inn ditt navn', 'Navnet er ikke gyldig']}
                />
                <TextValidator
                label="Epost*"
                onChange={handleEmailChange}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['Vennligst skriv inn din epost', 'Eposten er ikke gyldig']}
                autoComplete="email"
                autoFocus
                variant="outlined"
                margin="normal"
                fullWidth
                />
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="phoneNumber"
                    label="Telefonnummer*"
                    autoComplete="tel"
                    value={values.phoneNumber}
                    onChange={handleTlfChange} 
                    validators={['required', 'isTlf']}
                    errorMessages={['Vennligst skriv inn ditt telefonnummer', 'Telefonnummer er ikke gyldig']} 
                />
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


