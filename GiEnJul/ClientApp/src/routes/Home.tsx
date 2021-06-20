import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Link, animateScroll as scroll } from "react-scroll";

import  How  from './How';
import Questions from './Questions';
import Companies from './Companies';
import Tab from '../components/Tab';


const Home = () => (
  <div>
    <h1>Gi en jul</h1>
    <p><Button onClick = {() => {scroll.scrollToBottom()}}>Bli Giver</Button></p> 
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
      <Tab maxPagePosition= {140} textField="Bli giver" styling ='button-giver'/>
      <Tab maxPagePosition= {300} textField="Tilbake" styling = 'button-to-top'/>
  </div>
  );

export default connect()(Home);
