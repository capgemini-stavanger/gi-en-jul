import * as React from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import useStyles from './Styles';
import validator from 'validator';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string; },

    errors: {
        errorPhone: boolean; errorPhoneText: string; setErrorPhone: (e: boolean) => void; setErrorPhoneText: (e: string) => void;
        errorEmail: boolean; errorEmailText: string; setErrorEmail: (e: boolean) => void; setErrorEmailText: (e: string) => void;
    }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values, errors }) => {

    const Continue = (e: any) => {
        e.preventDefault();
        if (values.phoneNumber !== undefined && !!!validator.isMobilePhone(values.phoneNumber, ["nb-NO", "nn-NO"]) &&
            values.email !== undefined && !!!validator.isEmail(values.email)) {
            errors.setErrorPhone(true);
            errors.setErrorPhoneText('Telefonnummeret er ikke gyldig')
            errors.setErrorEmail(true);
            errors.setErrorEmailText('Eposten er ikke gyldig')
            return;
        }
        else if (values.phoneNumber !== undefined && !!!validator.isMobilePhone(values.phoneNumber, ["nb-NO", "nn-NO"])) {
            errors.setErrorPhone(true);
            errors.setErrorPhoneText('Telefonnummeret er ikke gyldig')
            return;
        }
        else if (values.email !== undefined && !!!validator.isEmail(values.email)) {
            errors.setErrorEmail(true);
            errors.setErrorEmailText('Eposten er ikke gyldig')
            return;
        }
        else {
            errors.setErrorEmail(false);
            errors.setErrorEmailText('');
            errors.setErrorPhone(false);
            errors.setErrorPhoneText('')
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
                style={{ width: '100%', marginTop: '5px' }}
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
                    error={errors.errorEmail}
                    helperText={errors.errorEmailText}
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
                    error={errors.errorPhone}
                    helperText={errors.errorPhoneText}
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