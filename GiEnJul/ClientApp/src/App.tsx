import * as React from 'react';
import { Route } from 'react-router';
import Home from './components/home/Home';
import Institution from './components/institution/InstitutionMacro';
import AdminPage from '../src/components/admin/AdminPage';
import SignUp from './components/registerGiver/SignUp';
import './custom.css'
import NavMenu from './common/components/NavMenu';
import { Container } from '@material-ui/core';

const App = () => {
    if (window.location.pathname === '/admin') {
        return (
            <React.Fragment>
                <NavMenu />
                <Container>
                    <Route path ='/admin' component={AdminPage} />
                    <Route exact path='/' component={Home} />
                    <Route path='/registrer-familie' component={Institution} />
                    <Route path='/bli-giver' component={SignUp} />
                </Container>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <NavMenu />
                <Container>
                    <Route exact path='/' component={Home} />
                    <Route path='/registrer-familie' component={Institution} />
                    <Route path='/bli-giver' component={SignUp} />
                </Container>
            </React.Fragment>
        );
    }
}
export default App;