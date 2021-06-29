import * as React from 'react';
import { Container, Button, Grid, TextField, FormControl } from '@material-ui/core';
import useStyles from './Styles';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    submit: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; confirmationOK: boolean},
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: string; maxRecievers?: number; familyType?: string, confirmationOK: boolean},
    callingback: (e: boolean) => void
    
}

const SummaryRegistration: React.FC<Props> = ({ nextStep, prevStep, submit, values, callingback }) => {

    const trigger = (b: boolean) => {
        callingback(b);
    }

    const Submit = async( e: any) => {
        e.preventDefault();
        await fetch('api/giver', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submit)
        })
        .then((response) => {
            if (response.status === 201) {
                trigger(true);
            }
        })
        .catch((errorStack) => {
            console.log(errorStack);
        })
        nextStep();
    }
    const Previous = (e: any) => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();

    return (
        <Container>
            <FormControl
                variant="outlined"
                fullWidth
                required
                margin="normal"
                style={{ width: '100%', marginTop: '20px' }}>
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
            </FormControl>
            <Grid container spacing={2} justify="center" className={classes.submit}>
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Submit}>Bli giver</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default SummaryRegistration