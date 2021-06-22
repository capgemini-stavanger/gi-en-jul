import * as React from 'react';
import { connect } from 'react-redux';
import Connections from '../components/admin/connections/Connections';


const Admin = () => (
    <div>
        <Connections />
    </div>
);

export default connect()(Admin);
