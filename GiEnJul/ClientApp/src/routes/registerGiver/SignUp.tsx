import * as React from 'react';
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

    handleLocationChange = (newLocation: Object) => {
        this.setState({ location: Object.values(newLocation)[0] })
    }

    handleFamilyChange = (newFamilyType: Object) => {
        var value = Object.values(newFamilyType)[0]
        this.setState({ familyType: value})
        if (value == 'Liten familie') {
            this.setState({ maxRecievers: 2 })
        }
        if (value== 'Vanlig familie'){
            this.setState({ maxRecievers: 5 })
        }
        if (value == 'Stor familie') {
            this.setState({ maxRecievers: 100 })
        }
    }

    render() {
        // const { step } = this.state;
        const { location, fullname, email, phoneNumber, maxRecievers, familyType } = this.state;
        const values = { location, fullname, email, phoneNumber, maxRecievers, familyType }
        const locationOptions = ['Bodø', 'Nittedal', 'Sandnes','Stavanger'];
        const familiyOptions = ['Liten familie', 'Vanlig familie', 'Stor familie'];

        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <h1>Bli giver</h1>
                        <h3>Hvor vil du gi?</h3>
                        <LocationGiver
                            nextStep={this.nextStep}
                            handleLocationChange={this.handleLocationChange}
                            values={values}
                            options={locationOptions}
                            placeHolder={'Velg et sted...'}
                        ></LocationGiver></div>
                )
            case 2:
                return (
                    <div><ContactInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handlefullnameChange={this.handlefullnameChange}
                        handleEmailChange={this.handleEmailChange}
                        handleTlfChange={this.handleTlfChange}
                        values={values}
                    ></ContactInfo></div>
                )
            case 3:
                return (
                    <div>
                        <h1>Bli giver</h1>
                        <h3>Ønsket familiesammensetning</h3>
                        <LocationGiver
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleLocationChange={this.handleFamilyChange}
                            values={values}
                            options={familiyOptions}
                            placeHolder={'Familiestørrelse'}
                        ></LocationGiver></div>
                )
            case 4:
                return (
                    <div>
                        <h1>Bli giver</h1>
                        <h3>Oppsummering</h3>
                        <p>Du er snart et fantastisk menneske :D</p>
                        <SummaryRegistration
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        ></SummaryRegistration>
                    </div>
                )
            case 5:
                return (
                    <div>
                        <Confirmation></Confirmation>
                    </div>
                )
            default:
        };
    };
}
export default SignUp