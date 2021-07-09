import * as React from 'react';
import { Container, Button, Grid } from '@material-ui/core';
import LOCATIONS from '../../common/constants/Locations';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useStyles from './Styles';
import { useState } from 'react';
import InputValidator from '../../components/InputFields/Validators/InputValidator';
import { isEmail, isNotNull, isPhoneNumber } from '../../components/InputFields/Validators/Validators';


type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[],
    submit: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; confirmationOK: boolean },
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string, confirmationOK: boolean },
    callingback: (e: boolean) => void

}

const SummaryRegistration: React.FC<Props> = ({ nextStep, prevStep, handleLocationChange, handlefullnameChange, handleEmailChange, handleTlfChange, handleFamilyChange, options, submit, values, callingback }) => {
    const [changeLocation, setChangeLocation] = useState<boolean>(true);
    const [changeFullName, setChangeFullName] = useState(true);
    const [changeEmail, setChangeEmail] = useState(true);
    const [changePhone, setChangePhone] = useState(true);
    const [changeFamily, setChangeFamily] = useState(true);

    const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

    const [isValidLocation, setIsValidLocation] = useState(true);
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isNotNullEmail, setIsNotNullEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isNotNullPhone, setIsNotNullPhone] = useState(true);
    const [isValidFamily, setIsValidFamily] = useState(true);

    const trigger = (b: boolean) => {
        callingback(b);
    }

    const Continue = (e: any) => {
        e.preventDefault();
        if (!(isValidLocation &&
              isValidFullName &&
              isNotNullEmail &&
              isValidEmail &&
              isValidPhone &&
              isNotNullPhone &&
              isValidFamily)) 
        {
            setViewErrorTrigger(v => v + 1);
            return;
        }
        Submit();
    }

    const Submit = async () => {
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
            <form
                onSubmit={Continue}
                style={{ width: '100%', marginTop: '20px' }}>
                <Grid container className={classes.inputRow} >
                    <Grid item xs={9}>
                        <InputValidator
                            viewErrorTrigger={viewErrorTrigger}
                            type="select"
                            disabled={changeLocation}
                            variant="outlined"
                            fullWidth
                            label="Lokasjon*"
                            name="location-input"
                            value={values.location ? values.location : ""}
                            id="location-input"
                            onChange={handleLocationChange}
                            errorMessages={['Vennligst velg lokasjon']}
                            validators={[isNotNull]}
                            setIsValids={setIsValidLocation}
                            options={LOCATIONS.map(x => 
                                {return {value: x, text: x};})}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeLocation}>
                            <EditOutlinedIcon className={classes.iconSelector}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className={classes.inputRow} >
                    <Grid item xs={9}>
                        <InputValidator
                            viewErrorTrigger={viewErrorTrigger}
                            disabled={changeFullName}
                            label="Fullt navn*"
                            variant="outlined"
                            fullWidth
                            name="fullname"
                            autoComplete="name"
                            value={values.fullname ? values.fullname : ""}
                            onChange={handlefullnameChange}
                            validators={[isNotNull]}
                            errorMessages={['Vennligst skriv inn ditt navn']}
                            setIsValids={setIsValidFullName}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={handleChangeFullName}>
                            <EditOutlinedIcon className={classes.iconTexField}></EditOutlinedIcon>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className={classes.inputRow} >
                    <Grid item xs={9}>
                        <InputValidator
                            viewErrorTrigger={viewErrorTrigger}
                            disabled={changeEmail}
                            label="Email"
                            onChange={handleEmailChange}
                            name="email"
                            value={values.email ? values.email : ""}
                            validators={[isEmail, isNotNull]}
                            errorMessages={['Eposten din ser litt rar ut, er den skrevet riktig?', 'Vennligst skriv inn din epost']}
                            setIsValids={[setIsValidEmail, setIsNotNullEmail]}
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
                <Grid container className={classes.inputRow} >
                    <Grid item xs={9}>
                        <InputValidator
                            viewErrorTrigger={viewErrorTrigger}
                            disabled={changePhone}
                            label="telefon"
                            onChange={handleTlfChange}
                            name="phoneNumber"
                            value={values.phoneNumber ? values.phoneNumber : ""}
                            validators={[isPhoneNumber, isNotNull]}
                            errorMessages={['Telefonnummeret ditt ser litt rart ut, er det skrevet riktig?', 'Vennligst skriv inn ditt telefonnummer']}
                            setIsValids={[setIsValidPhone, setIsNotNullPhone]}
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
                <Grid container className={classes.inputRow} >
                    <Grid item xs={9}>
                        <InputValidator
                            viewErrorTrigger={viewErrorTrigger}
                            type="select"
                            disabled={changeFamily}
                            variant="outlined"
                            fullWidth
                            name="familyType-input"
                            value={values.familyType ? values.familyType : ""}
                            onChange={handleFamilyChange}
                            label="Familiesammensetning*"
                            validators={[isNotNull]}
                            setIsValids={setIsValidFamily}
                            options={options.map(x => 
                                {return {value: x, text: x};})}
                        />
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
            </form>
        </Container>
    )
}
export default SummaryRegistration