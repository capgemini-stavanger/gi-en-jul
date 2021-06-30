import * as React from 'react';
import { Container, Button, Grid, MenuItem } from '@material-ui/core';
import LOCATIONS from '../../common/constants/Locations';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useStyles from './Styles';
import { useState } from 'react';
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import validator from 'validator';


type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleFamilyChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    options: string[],    
    errors: {
        errorPhone: boolean; errorPhoneText: string; setErrorPhone: (e: boolean) => void; setErrorPhoneText: (e: string) => void;
        errorEmail: boolean; errorEmailText: string; setErrorEmail: (e: boolean) => void; setErrorEmailText: (e: string) => void;
    }
    submit: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; confirmationOK: boolean},
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string, confirmationOK: boolean},
    callingback: (e: boolean) => void
    
}

const SummaryRegistration: React.FC<Props> = ({ nextStep, prevStep, handleLocationChange, handlefullnameChange, handleEmailChange, handleTlfChange, handleFamilyChange, options,  submit, values, errors, callingback }) => {
const [changeLocation, setChangeLocation ] = useState<boolean>(true);
const [changeFullName, setChangeFullName ] = useState(true);
const [changeEmail, setChangeEmail ] = useState(true);
const [changePhone, setChangePhone ] = useState(true);
const [changeFamily, setChangeFamily ] = useState(true);

    const trigger = (b: boolean) => {
        callingback(b);
    }

    const Continue = (e: any) => {
        e.preventDefault();
        if (values.phoneNumber !== undefined && !!!validator.isMobilePhone(values.phoneNumber, ["nb-NO", "nn-NO"]) &&
            values.email !== undefined && !!!validator.isEmail(values.email)) {
            errors.setErrorPhone(true);
            errors.setErrorPhoneText('Telefonnummeret er ikke gyldig')
            setChangePhone(false);
            errors.setErrorEmail(true);
            errors.setErrorEmailText('Eposten er ikke gyldig')
            setChangeEmail(false);
            return;
        }
        else if (values.phoneNumber !== undefined && !!!validator.isMobilePhone(values.phoneNumber, ["nb-NO", "nn-NO"])) {
            errors.setErrorPhone(true);
            errors.setErrorPhoneText('Telefonnummeret er ikke gyldig')
            setChangePhone(false);
            return;
        }
        else if (values.email !== undefined && !!!validator.isEmail(values.email)) {
            errors.setErrorEmail(true);
            errors.setErrorEmailText('Eposten er ikke gyldig')
            setChangeEmail(false);
            return;
        }
        else {
            errors.setErrorEmail(false);
            errors.setErrorEmailText('');
            errors.setErrorPhone(false);
            errors.setErrorPhoneText('')
            Submit(e);
        }
    }

    const Submit = async( e: any) => {
        e.preventDefault();
        await fetch('api/giver', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
        .then((response) => {
            if (response.status === 201) {
                trigger(true);
            }
        })
        .catch((errorStack) => {
            console.log(errorStack);
        })
        nextStep();
    }
    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const handleChangeLocation = () =>{
        setChangeLocation(!changeLocation);
    }
    const handleChangeFullName = () =>{
        setChangeFullName(!changeFullName);
    }
    const handleChangeEmail = () =>{
        setChangeEmail(!changeEmail);
    }
    const handleChangePhone = () =>{
        setChangePhone(!changePhone);
    }
    const handleChangeFamily = () => {
        setChangeFamily(!changeFamily);
    }

    const classes = useStyles();

    return (
        <Container>
            <ValidatorForm
                onSubmit={Continue}
                variant="outlined"
                fullWidth
                required
                margin="normal"
                style={{ width: '100%', marginTop: '20px' }}>
                <Grid container spacing={3} >
                    <Grid item xs={9}>
                        <SelectValidator
                            disabled={changeLocation}
                            variant="outlined"
                            fullWidth
                            placeholder={values.location}
                            label="Lokasjon*"
                            name="location-input"
                            value={values.location ? values.location : ""}
                            id="location-input"
                            onChange={handleChangeLocation}
                            errorMessages={['Vennligst velg lokasjon']}
                        >
                            {LOCATIONS.map(x =>
                                <MenuItem key={x} value={x}>{x}</MenuItem>)}
                        </SelectValidator>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeLocation}>
                            <EditOutlinedIcon className={classes.iconSelector}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={9}>
                        <TextValidator
                            disabled={changeFullName}
                            placeholder={values.fullname}
                            label="Fult navn*"
                            variant="outlined"
                            fullWidth
                            name="fullname"
                            autoComplete="name"
                            value={values.fullname ? values.fullname : ""}
                            onChange={handlefullnameChange}
                            validators={['required']}
                            errorMessages={['Vennligst skriv inn ditt navn']}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeFullName}>
                            <EditOutlinedIcon className={classes.iconTexField}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={9}>
                        <TextValidator
                            disabled={changeEmail}
                            placeholder={values.email}
                            error={errors.errorEmail}
                            helperText={errors.errorEmailText}
                            onChange={handleEmailChange}
                            name="email"
                            value={values.email ? values.email : ""}
                            validators={['required']}
                            errorMessages={['Vennligst skriv inn din epost']}
                            autoComplete="email"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeEmail}>
                            <EditOutlinedIcon className={classes.iconTexField}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={9}>
                        <TextValidator
                            disabled={changePhone}
                            placeholder={values.phoneNumber}
                            error={errors.errorPhone}
                            helperText={errors.errorPhoneText}
                            onChange={handleTlfChange}
                            name="phoneNumber"
                            value={values.phoneNumber ? values.phoneNumber : ""}
                            validators={['required']}
                            errorMessages={['Vennligst skriv inn ditt telefonnummer']}
                            autoComplete="tel"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangePhone}>
                            <EditOutlinedIcon className={classes.iconTexField}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={9}>
                        <SelectValidator
                            disabled={changeFamily}
                            variant="outlined"
                            fullWidth
                            autoFocus
                            placeholder={values.familyType}
                            validators={['required']}
                            name="familyType-input"
                            value={values.familyType ? values.familyType : ""}
                            onChange={handleFamilyChange}
                            label="Familiesammensetning*"
                            errorMessages={['Vennligst velg familiesammensetning']}
                        >
                            {options.map(x =>
                                <MenuItem key={x} value={x}>{x}</MenuItem>)}
                        </SelectValidator>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeFamily}>
                            <EditOutlinedIcon className={classes.iconSelector}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justify="center" className={classes.submit}>
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                </Grid>
                <Grid item>
                <Button variant="contained" type="submit">Bli Giver</Button>
                </Grid>
            </Grid>
            </ValidatorForm>
        </Container>
    )
}
export default SummaryRegistration