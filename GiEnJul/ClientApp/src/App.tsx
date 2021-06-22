import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './routes/home/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Registration from './components/Registration';
import LocationGiver from './routes/registerGiver/LocationGiver';
import ContactInfo from './routes/registerGiver/ContactInfo';
import SignUp from './routes/registerGiver/SignUp';

import './custom.css'


export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/registration' component={ Registration } />
        <Route path='/registerGiver/LocationGiver' component={ LocationGiver }></Route>
        <Route path='/registerGiver/ContactInfo' component={ ContactInfo }></Route>
        <Route path='/registerGiver/SignUp' component={ SignUp }></Route>
    </Layout>
);
