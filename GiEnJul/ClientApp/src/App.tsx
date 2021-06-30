import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './routes/home/Home';
import Institution from './components/institution/InstitutionMacro';
import AdminPage from '../src/components/admin/AdminPage';
import SignUp from './routes/registerGiver/SignUp';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/registrer-familie' component={ Institution } />
        <Route path='/admin' component={ AdminPage } />
        <Route path='/bli-giver' component={ SignUp }/>
    </Layout>
);
