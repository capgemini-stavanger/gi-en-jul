import * as React from 'react';
import { Button, Grid, TextField, FormControl} from '@material-ui/core';
import { Container } from '@material-ui/core';
import useStyles from './Styles';

type Props = {
    nextStep: () => void,
    prevStep: () => void,
    handlefullnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleTlfChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string; }
}

const ContactInfo: React.FC<Props> = ({ nextStep, prevStep, handlefullnameChange, handleEmailChange, handleTlfChange, values }) => {
    // const [state, setState] = React.useState<string>();
    // const [errors, setErrors] = React.useState<{ state: string}>();

    const Continue = (e: any) => {
        e.preventDefault();
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
             margin = "normal"
            style={{width: '100%', marginTop: '5px'}}>
                <TextField
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
                    onChange={handlefullnameChange}
                />
                <TextField
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
                    onChange={handleEmailChange} 
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Telefonnummer"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={values.phoneNumber}
                    onChange={handleTlfChange} 
                />
            </FormControl>
            <Grid container spacing={2} justify="center" className={classes.submit}>
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                    </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Continue}>Neste</Button>
                </Grid>
            </Grid>
            </Container>
    )
}
export default ContactInfo


