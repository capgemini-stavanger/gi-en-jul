import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './routes/home/Home';
import FetchData from './components/FetchData';
import SignUp from './routes/registerGiver/SignUp';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/bli-giver' component={ SignUp }></Route>
    </Layout>
);
