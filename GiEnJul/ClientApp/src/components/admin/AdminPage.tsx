import { Container } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import AdminMenu from './common/AdminMenu';
import Completed from './connections/Completed';
import Suggested from './connections/Suggested';
import EditQuestions from './editLandingPage/EditQuestions';


function AdminPage() {
        return(
            <React.Fragment>
                <Container maxWidth="xl">
                    <AdminMenu />
                    <Suggested/>
                    <Suggested />
                    <Completed />
                    <EditQuestions/>
                </Container> 
            </React.Fragment>
        );

}

export default connect()(AdminPage);