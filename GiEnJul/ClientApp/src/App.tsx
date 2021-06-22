import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './routes/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Registration from './components/Registration';
import ContactInfo from './routes/registerGiver/ContactInfo'
import Admin from './routes/Admin';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/registration' component={ Registration } />
        <Route path='/registerGiver/ContactInfo' component={ ContactInfo }></Route>
        <Route path='/admin' component={ Admin } />
    </Layout>
);
