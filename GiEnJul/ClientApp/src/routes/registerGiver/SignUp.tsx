import * as React from 'react';
import { render } from 'react-dom';
import ContactInfo from './ContactInfo';
import LocationGiver from './LocationGiver';

interface State {
    step: number
    location: string,
    name: string,
    email: string,
    tlf: number,
    familiyType: string,
}

class SignUp extends React.PureComponent< {}, State>{
    state: State= {
        step: 1,
        location: '',
        name: '',
        email: '',
        tlf: 0,
        familiyType: '',
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
    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value})
    }
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value})
    }
    handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({tlf: parseInt(event.target.value)})
    }
    handleLocationChange = (value: any) => (newLocation: React.SetStateAction<string>) => {
        this.setState({location: String(newLocation)})}
    
        render(){
            // const { step } = this.state;
            const { location, name, email, tlf, familiyType } = this.state;
            const values = { location, name, email, tlf, familiyType }
            console.log(this.state)
        
            switch(this.state.step){
                case 1:
                    return(
                        <div><LocationGiver
                        nextStep = {this.nextStep}
                        handleLocationChange = {this.handleLocationChange}
                        values = {values}
                        ></LocationGiver></div>
                    )
                case 2: 
                    return (
                        <div><ContactInfo 
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleNameChange = {this.handleNameChange}
                        handleEmailChange = {this.handleEmailChange}
                        handleTlfChange = {this.handleTlfChange}
                        values = {values}
                        ></ContactInfo></div>
                    )
                case 3: 
                case 4:
                case 5:
                default:
            };
        };
}

export default SignUp