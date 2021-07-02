import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './nav/NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
