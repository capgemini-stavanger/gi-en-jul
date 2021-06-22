import * as React from 'react';


interface Props {
    location: string;
}

interface State {
    name: string;
    email: string;
    tlf: number;
}
class ContactInfo extends React.PureComponent<Props, State>{

    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value})
    }
    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value})
    }
    handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({tlf: parseInt(event.target.value)})
    }
    
    render(){
        return (
            <div>
                <h1>Bli giver</h1>
                <h3>Kontaktinformasjon</h3>
                <label> Navn 
                    <input type="text" onChange={this.handleNameChange}/>
                </label>
                <label> Epost 
                    <input type="text" onChange={this.handleEmailChange}/>
                </label>
                <label> Mobilnummer 
                    <input type="text" onChange={this.handleTlfChange}/>
                </label>
            </div>
        )
    }
}

export default ContactInfo;
    

