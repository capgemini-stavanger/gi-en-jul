import * as React from 'react';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import Confirmation from './Confirmation';
import ContactInfo from './ContactInfo';
import LocationGiver from './LocationGiver';
import SummaryRegistration from './SummaryRegistration';
import { useEffect, useState } from 'react';
import getLocations from '../../common/constants/Locations';

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [confirmationOK, setConfirmationOK] = useState(false);

    const [location, setLocation] = useState<string | undefined>(undefined);
    const [fullname, setFullname] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [maxRecievers, setMaxRecievers] = useState<number | undefined>(undefined);
    const [familyType, setFamilyType] = useState<string | undefined>(undefined);

    const [locationOptions, setLocationOptions] = useState<string[]>([]);

    useEffect(() => {
        getLocations().then((locationArray) => setLocationOptions(locationArray))
     }, []);

    // go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };
    // proceed to the next step
    const nextStep = () => {
        setStep(step + 1);
    };
    const handlefullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(event.target.value)
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    };
    const handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value)
    };
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value)
    }
    const handleFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        var value = event.target.value;
        setFamilyType(value)
        if (value === 'Liten familie') {
            setMaxRecievers(2)
        }
        if (value === 'Vanlig familie') {
            setMaxRecievers(5)
        }
        if (value === 'Stor familie') {
            setMaxRecievers(100)
        }
    }
    const handleConfirm = (submitOK: boolean) => {
        setConfirmationOK(submitOK)
    }

    const values = { location, fullname, email, phoneNumber, maxRecievers, familyType, confirmationOK  };
    const submit = { location, fullname, email, phoneNumber, maxRecievers, confirmationOK }
    const familiyOptions = ['Liten familie', 'Vanlig familie', 'Stor familie'];

    switch (step) {
        case 1:
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className='paper'>
                        <Typography component="h1" variant="h4">
                            Bli giver
                        </Typography>
                        <Typography component="h2">
                            Hvor vil du gi?
                        </Typography>
                        <LocationGiver
                            nextStep={nextStep}
                            handleLocationChange={handleLocationChange}
                            values={values}
                            options={locationOptions}
                            placeHolder={'Velg et sted...'}
                        ></LocationGiver>
                    </div>
                </Container>
            )
        case 2:
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className='paper'>
                        <Typography component="h1" variant="h4">
                            Bli giver
                        </Typography>
                        <Typography component="h2">
                            Kontaktinformasjon
                        </Typography>
                        <ContactInfo
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handlefullnameChange={handlefullnameChange}
                            handleEmailChange={handleEmailChange}
                            handleTlfChange={handleTlfChange}
                            values={values}
                        ></ContactInfo>
                    </div>
                </Container>
            )
        case 3:
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className='paper'>
                        <Typography component="h1" variant="h4">
                            Bli giver
                        </Typography>
                        <Typography component="h2">
                            Familiesammensetning
                        </Typography>
                        <LocationGiver
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleLocationChange={handleFamilyChange}
                            values={values}
                            options={familiyOptions}
                            placeHolder={'Familiestørrelse'}
                        ></LocationGiver>
                    </div>
                </Container>
            )
        case 4:
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className='paper'>
                        <Typography component="h1" variant="h4">
                            Bli giver
                        </Typography>
                        <Typography component="h2">
                            Oppsummering
                        </Typography>
                        <SummaryRegistration
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleLocationChange={handleLocationChange}
                            handlefullnameChange={handlefullnameChange}
                            handleEmailChange={handleEmailChange}
                            handleTlfChange={handleTlfChange}
                            handleFamilyChange={handleFamilyChange}
                            options={familiyOptions}
                            locationOptions={locationOptions}
                            submit={submit}
                            values={values}
                            callingback={handleConfirm}
                        ></SummaryRegistration>
                    </div>
                </Container>
            )
        case 5:
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className='paper'>
                        <Confirmation values={values} confirmationOK= {confirmationOK}></Confirmation>
                    </div>
                </Container>
            )
        default:
            return(
                <Container>

                </Container>
            )
    };
};
export default SignUp