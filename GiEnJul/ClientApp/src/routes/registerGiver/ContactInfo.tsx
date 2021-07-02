import * as React from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import useStyles from './Styles';
import InputValidator from '../../components/InputFields/Validators/InputValidator';
import { isNotNull, isPhoneNumber, isEmail } from '../../components/InputFields/Validators/Validators';
import { useState } from 'react';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string; },
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values }) => {

    const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

    const [isNotEmptyFullName, setIsNotEmptyFullName] = useState(false);
    const [isNotEmptyEmail, setIsNotEmptyEmail] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isNotEmptyPhone, setIsNotEmptyPhone] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(false);

    const Continue = (e: any) => {
        e.preventDefault();
        if (!(isNotEmptyFullName && isNotEmptyEmail && isValidEmail && isNotEmptyPhone && isValidPhone)) {
            setViewErrorTrigger(v => v + 1);
            return;
        }
        nextStep();
    }

    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();
    return (
        <Container>
            <form
                style={{ width: '100%', marginTop: '5px' }}
                onSubmit={Continue}
            >
                <InputValidator
                    autoFocus
                    viewErrorTrigger={viewErrorTrigger}
                    setIsValids={[setIsNotEmptyFullName]}
                    label="Fullt navn*"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="fullname"
                    autoComplete="name"
                    value={values.fullname ? values.fullname: ""}
                    onChange={handlefullnameChange}
                    validators={[isNotNull]}
                    errorMessages={['Vi vil gjerne vite hvem som gir en jul']}
                />
                <InputValidator
                    viewErrorTrigger={viewErrorTrigger}
                    setIsValids={[setIsNotEmptyEmail, setIsValidEmail]}                
                    label="Epost*"
                    onChange={handleEmailChange}
                    name="email"
                    value={values.email ? values.email: ""}
                    validators={[isEmail, isNotNull]}
                    errorMessages={['Eposten din ser litt rar ut, er den skrevet riktig?', 'Vi trenger din epost for å sende deg viktig informasjon']}
                    autoComplete="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <InputValidator
                    viewErrorTrigger={viewErrorTrigger}
                    setIsValids={[setIsNotEmptyPhone, setIsValidPhone]}                
                    label="Telefonnummer*"
                    onChange={handleTlfChange}
                    name="phoneNumber"
                    value={values.phoneNumber ? values.phoneNumber: ""}
                    validators={[isPhoneNumber, isNotNull]}
                    errorMessages={['Telefonnummeret ditt ser litt rart ut, er det skrevet riktig?', 'Vi trenger ditt telefonnummer for å kunne kontakte deg']}
                    autoComplete="tel"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Grid container spacing={2} justify="center" className={classes.submit}>
                    <Grid item>
                        <Button variant="contained" onClick={Previous}>Tilbake</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" type="submit">Neste</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
export default ContactInfo