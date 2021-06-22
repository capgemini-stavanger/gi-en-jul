import * as React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';

type Props = {
    nextStep: () => void,
    prevStep: () => void,

    values: { location: string | undefined; name: string | undefined; email: string | undefined; tlf: number | undefined; familiyType: string | undefined; }
    }

const SummaryRegistration: React.FC<Props> = ({nextStep, prevStep, values}) => {

    const Continue = (e: any) => {
        e.preventDefault();
        nextStep();
      }

      const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
      }    

    return(
        <div>
            <h5>Sted:</h5>
            <h6>{values.location}</h6>
            <h5>Navn:</h5>
            <h6>{values.name}</h6>
            <h5>Epostadresse:</h5>
            <h6>{values.email}</h6>
            <h5>Telefonnummer:</h5>
            <h6>{values.tlf}</h6>
            <h5>Ønsket familiesammensetning:</h5>
            <h6>{values.familiyType}</h6>

            <ButtonToolbar>
                <Button onClick = { Previous }>Tilbake</Button>
                <Button onClick = { Continue } >Neste</Button>
            </ButtonToolbar>
        </div>
    )

}
export default SummaryRegistration