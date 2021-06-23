import * as React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';

type Props = {
    nextStep: () => void,
    prevStep: () => void,

    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string}
}

const SummaryRegistration: React.FC<Props> = ({ nextStep, prevStep, values }) => {

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
            <h5>Sted:</h5>
            <h6>{values.location}</h6>
            <h5>Navn:</h5>
            <h6>{values.fullname}</h6>
            <h5>Epostadresse:</h5>
            <h6>{values.email}</h6>
            <h5>Telefonnummer:</h5>
            <h6>{values.phoneNumber}</h6>
            <h5>Ønsket familiesammensetning:</h5>
            <h6>{values.familyType}</h6>

            <ButtonToolbar>
                <Button onClick={Previous}>Tilbake</Button>
                <Button onClick={Continue} >Bli giver</Button>
            </ButtonToolbar>
        </div>
    )

}
export default SummaryRegistration