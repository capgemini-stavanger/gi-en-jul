import * as React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

const Confirmation = () => {
    return (
        <div>
            <h1>Takk for at du gir en jul</h1>
            <p>Vi har nå registret deg som giver til årets Gi en Jul. vi har sendt en  oppsummering av din registrering i til Ola.Normann@gmail.com. Når det nermer seg jul vil vi sende deg mer informasjon. </p>
            <p><Route render={({ history}) => (
             <Button onClick={() => { history.push('/') }}>Til forsiden</Button>)}/>
        </p>
        </div>
    )


}

export default Confirmation