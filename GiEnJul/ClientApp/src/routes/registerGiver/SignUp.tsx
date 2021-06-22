import * as React from 'react';

interface State {
    step: number
    location?: string,
    name?: string,
    email?: string,
    tlf?: number,
    familiyType?: number,
}



class SignUp extends React.PureComponent< {}, State>{
    state: State= {
        step: 1
    }

    // go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    // proceed to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    // handle field change
//     handleChange = (input: State) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({input}: event.target.value);
//   }
}

export default SignUp