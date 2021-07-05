import { Box, Container } from '@material-ui/core';
import * as React from 'react';
import DotLoader from '../constants/DotLoader';


const LoadingPage = () => {
    return(
        <React.Fragment>
            <Container maxWidth="xl">
                <Box display="flex" justifyContent="center" alignContent="center">
                    <DotLoader/>
                </Box>
            </Container>
        </React.Fragment>
    )
} 

export default LoadingPage;