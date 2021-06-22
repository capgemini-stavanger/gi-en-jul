import * as React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location: string | undefined; name: string | undefined; email: string | undefined; tlf: number | undefined; familiyType: string | undefined; }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handleNameChange, handleEmailChange, handleTlfChange, values }) => {

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
                <input type="text" onChange={handleNameChange} value={values.name} />
            </label>
            <label> Epost
                <input type="text" onChange={handleEmailChange} value={values.email} />
            </label>
            <label> Mobilnummer
                <input type="text" onChange={handleTlfChange} value={values.tlf} />
            </label>
            <ButtonToolbar>
                <Button onClick={Previous}>Tilbake</Button>
                <Button onClick={Continue} >Neste</Button>
            </ButtonToolbar>


        </div>
    )
}
export default ContactInfo


