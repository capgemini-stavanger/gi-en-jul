import * as React from 'react';
import ContactInfo from './ContactInfo';
import LocationGiver from './LocationGiver';

interface State {
    step: number
    location: string,
    name: string,
    email: string,
    tlf: string,
    familiyType: string,
}



class SignUp extends React.PureComponent< {}, State>{
    state: State= {
        step: 1,
        location: '',
        name: '',
        email: '',
        tlf: '',
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
//     handleChange = (input: state) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({input}: event.target.value);
//   }

    render(){
        switch(this.state.step){
            case 1:
                return(
                    <div><LocationGiver></LocationGiver></div>
                )
            case 2: 
                return (
                    <div><ContactInfo location = {this.state.location}></ContactInfo></div>
                )
            case 3: 
            case 4:
            case 5:
            default:
        }
    }
}

export default SignUp