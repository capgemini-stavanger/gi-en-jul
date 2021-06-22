import * as React from 'react';
import { Button } from 'reactstrap';

type Props = {
nextStep: () => void,
prevStep: () => void,
handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
values: { location: string; name: string; email: string; tlf: number; familiyType: string; }
}

const ContactInfo: React.FC<Props> = ({nextStep, prevStep, handleNameChange, handleEmailChange, handleTlfChange, values}) => {

    const Continue = (e: any) => {
        e.preventDefault();
        nextStep();
      }

      const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
      }

return (
    <div>
                <h1>Bli giver</h1>
                <h3>Kontaktinformasjon</h3>
                <label> Navn 
                    <input type="text" onChange={handleNameChange} value = {values.name}/>
                </label>
                <label> Epost 
                    <input type="text" onChange={handleEmailChange} value = {values.email}/>
                </label>
                <label> Mobilnummer 
                    <input type="text" onChange={handleTlfChange} value = {values.tlf}/>
                </label>
                <Button onClick = { Previous }>Tilbake</Button>
                <Button onClick = { Continue } >Neste</Button>
        
    </div>
)
}
export default ContactInfo


// interface Props {
//     location: string;
// }

// interface State {
//     name: string;
//     email: string;
//     tlf: number;
// }
// class ContactInfo extends React.PureComponent<Props, State>{

//     handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({name: event.target.value})
//     }
//     handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({email: event.target.value})
//     }
//     handleTlfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         this.setState({tlf: parseInt(event.target.value)})
//     }
    
//     render(){
//         return (
//             <div>
//                 <h1>Bli giver</h1>
//                 <h3>Kontaktinformasjon</h3>
//                 <label> Navn 
//                     <input type="text" onChange={this.handleNameChange}/>
//                 </label>
//                 <label> Epost 
//                     <input type="text" onChange={this.handleEmailChange}/>
//                 </label>
//                 <label> Mobilnummer 
//                     <input type="text" onChange={this.handleTlfChange}/>
//                 </label>
//             </div>
//         )
//     }
// }

// export default ContactInfo;
    

