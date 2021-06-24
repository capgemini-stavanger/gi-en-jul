import * as React from 'react';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import useStyles from './Styles';

// Components
import Confirmation from './Confirmation';
import ContactInfo from './ContactInfo';
import LocationGiver from './LocationGiver';
import SummaryRegistration from './SummaryRegistration';


interface State {
    step: number,
    location?: string,
    fullname?: string,
    email?: string,
    phoneNumber?: number,
    maxRecievers?: number,
    familyType?: string, 
}

class SignUp extends React.PureComponent<{}, State>{
    state: State = {
        step: 1,
    };

    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    // proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    };

    // handle field change
    handleChange = (input: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        // this.setState({input}: event.target.value);
    }
    handlefullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ fullname: event.target.value })
    }
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value })
    }
    handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ phoneNumber: parseInt(event.target.value) })
    }

    handleLocationChange = (event: any) => {
        this.setState({ location: event.target.value })
    }

    handleFamilyChange = (event: any) => {
        var value = event.target.value;
        this.setState({ familyType: value})
        if (value === 'Liten familie') {
            this.setState({ maxRecievers: 2 })
        }
        if (value === 'Vanlig familie'){
            this.setState({ maxRecievers: 5 })
        }
        if (value === 'Stor familie') {
            this.setState({ maxRecievers: 100 })
        }
    }

    render() {
        const { location, fullname, email, phoneNumber, maxRecievers, familyType } = this.state;
        const values = { location, fullname, email, phoneNumber, maxRecievers, familyType }
        const submit = { location, fullname, email, phoneNumber, maxRecievers}
        const locationOptions = ['Bodø', 'Nittedal', 'Sandnes','Stavanger'];
        const familiyOptions = ['Liten familie', 'Vanlig familie', 'Stor familie'];
        // const classes = useStyles();

        

        switch (this.state.step) {
            case 1:
                return (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className = 'paper'>
                            <Typography component="h1" variant="h4">
                                Bli giver
                            </Typography>
                            <Typography component="h2">
                                Hvor vil du gi?
                            </Typography>
                            <LocationGiver
                                nextStep={this.nextStep}
                                handleLocationChange={this.handleLocationChange}
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
                        <div className = 'paper'>
                            <Typography component="h1" variant="h4">
                                Bli giver
                            </Typography>
                            <Typography component="h2">
                                Kontaktinformasjon
                            </Typography>
                            <ContactInfo
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                handlefullnameChange={this.handlefullnameChange}
                                handleEmailChange={this.handleEmailChange}
                                handleTlfChange={this.handleTlfChange}
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
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleLocationChange={this.handleFamilyChange}
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
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            submit={submit}
                            values={values}
                        ></SummaryRegistration>
                        </div>
                    </Container>
                )
            case 5:
                return (
                       <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className='paper'>
                                <Confirmation values={ values }></Confirmation>
                        </div>
                    </Container>
                )
            default:
        };
    };
}
export default SignUp