import * as React from 'react';
import RegistrationInfo from './RegistrationInfo';
import RegistrationForm from './RegistrationForm';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <RegistrationInfo/>
        <RegistrationForm/>
    </React.Fragment>


);