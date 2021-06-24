import * as React from 'react';

import { Button, Grid, TextField} from '@material-ui/core';


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
            <form className="form" noValidate>
                <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Lokasjon"
                    name="location"
                    autoFocus
                    value={values.location}
                //onChange={handlefullnameChange}
                />
                <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="Fult navn"
                    name="fullname"
                    autoComplete="name"
                    autoFocus
                    value={values.fullname}
                    //onChange={handlefullnameChange}
                />
                <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Epost"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                   // onChange={handleEmailChange}
                />
                <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Telefonnummer"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={values.phoneNumber}
                    // onChange={handleTlfChange}
                />
            </form>
            <TextField
                disabled
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="maxRecievers"
                label="Familiesammensetning"
                id="maxRecieverse"
                autoComplete="tel"
                value={values.familyType}
            // onChange={handleTlfChange}
            />
             <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                    </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Submit}>Bli giver</Button>
                </Grid>
            </Grid>
        </div>
    )

}
export default SummaryRegistration