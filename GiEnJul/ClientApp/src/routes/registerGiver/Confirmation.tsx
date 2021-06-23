import * as React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

type Props = {
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string }
}

const Confirmation: React.FC<Props> = ({ values }) => {
    console.log(values.fullname)
    console.log(values.email)


    return (
        <div>
            <h1>Takk for at du gir en jul {values.fullname}</h1>
            <p>Vi har nå registret deg som giver til årets Gi en Jul og har sendt en  oppsummering av din registrering i til  { values.email}. Når det nermer seg jul vil vi sende deg mer informasjon. </p>
            <p><Route render={({ history }) => (
                <Button onClick={() => { history.push('/') }}>Til forsiden</Button>)} />
            </p>
        </div>
    )


}

export default Confirmation