import * as React from 'react';
import { connect } from 'react-redux';

const RegistrationInfo = () => (
    <div>
        <h1>Registrer familie</h1>
        <h3>Tusen takk for at du melder inn familie til Gi en jul. Husk:</h3>
        <ul>
            <li>Fyll inn størrelser dersom de ønsker klær eller sko.</li>
            <li>Alderstilpasset gave betyr at giveren selv kan finne noe som passer til alderen.</li>
            <li>Skriv så detaljerte ønsker som mulig -dersom barnet ikke har ønsker kan du skrive noe om inetresser, som fotball, hobbyting, turn osv.</li>
            <li>Husk å skrive dersom familien har spesielle behov.</li>
        </ul>
    </div>
);

export default connect()(RegistrationInfo);