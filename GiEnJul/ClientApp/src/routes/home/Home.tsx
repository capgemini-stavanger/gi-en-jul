import * as React from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom'
import  How  from './How';
import Questions from './Questions';
import Companies from './Companies';
import Tab from '../../components/Tab';
import {Typography, Container, Button, Grid} from '@material-ui/core';
import useStyles from './Styles';

const Home = () => {
  const classes = useStyles();

  return(
  <Container>
    <Grid 
    container
    direction="row"
    justify="center"
    alignItems="center">
    <Typography variant="h2">
      Gi en jul
    </Typography>
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center">
    <Route render={({ history}) => (
    <Button size='large' variant='contained' className={classes.submit}  onClick={() => { history.push('/bli-giver') }}>Bli Giver
    </Button>)}/>
    </Grid>
    </Grid>
      <How/>
      <Questions/>
      <Companies/>
      <Tab maxPagePosition= {140} textField="Bli giver" styling ='button-giver' path='/bli-giver'/>
      <Tab maxPagePosition= {300} textField="Til toppen" styling = 'button-to-top' path='top'/>
  </Container>
  )
 
    };

export default connect()(Home);
