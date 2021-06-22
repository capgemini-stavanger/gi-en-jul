import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {Route} from 'react-router-dom'
import { Link, animateScroll as scroll } from "react-scroll";

import  How  from './How';
import Questions from './Questions';
import Companies from './Companies';
import Tab from '../../components/Tab';


const Home = () => (
  <div>
    <h1>Gi en jul</h1>
    <p><Route render={({ history}) => (
    <Button onClick={() => { history.push('/registerGiver/SignUp') }}>Bli Giver
    </Button>)}/>
    </p>
      <div>
        <p><Button>
          <Link to='how'spy={true} smooth={true} >
          Hvordan fungerer gi en jul
          </Link>
          </Button></p>
        <p><Button>
          <Link to="questions" spy={true} smooth={true} >
            Ofte stilte spørsmål
            </Link>
        </Button></p>
        <p><Button>
          <Link to="companies" spy={true} smooth={true} >
            For bedrifter
          </Link>
        </Button></p>
        <p><Button>Kontakt</Button></p>
        <p><Button>Start "Gi en jul" der hor du bor</Button></p>
      </div>
      <How/>
      <Questions/>
      <Companies/>
      <Tab maxPagePosition= {140} textField="Bli giver" styling ='button-giver' path='/registerGiver/SignUp'/>
      <Tab maxPagePosition= {300} textField="Til toppen" styling = 'button-to-top' path='top'/>
  </div>
  );

export default connect()(Home);
