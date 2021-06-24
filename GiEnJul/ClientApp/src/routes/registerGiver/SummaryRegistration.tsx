import * as React from 'react';
/*import { Button, ButtonToolbar } from 'reactstrap';*/
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    submit: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number };
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string}
}

const SummaryRegistration: React.FC<Props> = ({ nextStep, prevStep, submit, values }) => {

    const Submit = (e: any) => {
        e.preventDefault();
        fetch('https://localhost:5001/api/giver', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
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

                <Button onClick={Previous}>Tilbake</Button>
                <Button onClick={Continue} >Neste</Button>
        </div>
    )

}
export default SummaryRegistration