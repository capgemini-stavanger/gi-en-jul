import * as React from 'react';
import { Route } from 'react-router';
import AdminPage from '../src/components/admin/AdminPage';
import Institution from './components/institution/InstitutionMacro';
import Layout from './components/Layout';
import './custom.css';
import Home from './routes/home/Home';
import SignUp from './routes/registerGiver/SignUp';
import { Auth0Provider } from "@auth0/auth0-react";

export default () => (
    <Auth0Provider
    domain="dev-r7fmessb.eu.auth0.com"
    clientId="sxpa9h7p3UnlhP2aIttZHlLVr41rU0RR"
    redirectUri={window.location.origin}
    >
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/registrer-familie' component={ Institution } />
            <Route path='/admin' component={ AdminPage } />
            <Route path='/bli-giver' component={ SignUp }/>
        </Layout>
    </Auth0Provider>
);
