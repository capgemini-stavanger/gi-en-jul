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
    
    // state: State = {
    //     name: '',
    //     email: '',
    //     tlf: 0,

    // }

    // const handleChange = (newValue: string, category: string ) => {
    //     this.setState({category: newValue})
    // }
    
    // render(){
    //     return (
    //         <div>
    //             <h1>Bli giver</h1>
    //             <h3>Kontaktinformasjon</h3>
    //             <input type="text" onChange= () />
    //         </div>
    //     )
    // }
}

export default ContactInfo;
    

