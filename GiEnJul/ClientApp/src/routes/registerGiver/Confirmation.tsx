import * as React from 'react';
import { Route } from 'react-router-dom';
import { Button, Container, Grid, Typography} from '@material-ui/core';

type Props = {
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string }
}

const Confirmation: React.FC<Props> = ({ values }) => {
    return (
        <Container>
            <Typography component="h1" variant="h4">
                Takk for at du gir en jul {values.fullname}!
                            </Typography>
            <Typography component="p" >
                Vi har nå registrert deg som giver til årets Gi en Jul og har sendt en  oppsummering av din registrering i til  {values.email}. Når det nærmer seg jul vil vi sende deg mer informasjon.
                            </Typography>
            <Grid item >
                <Route render={({ history }) => (
                    <Button variant="contained" onClick={() => { history.push('/') }}>Tilbake</Button>)} />
            </Grid>
            </Container>
    )


}

export default Confirmation
