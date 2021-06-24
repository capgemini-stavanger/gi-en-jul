import * as React from 'react';
import { ButtonToolbar } from 'reactstrap';
import { Route } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


//Material ui
import Avatar from '@material-ui/core/Avatar';
import { Button, ButtonGroup, CssBaseline, Typography, Container } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

type Props = {
  nextStep: () => void,
  prevStep?: () => void,
  handleLocationChange: (newLocation: Object) => void,
    values: { location?: string; fullname?: string; email?: string; phoneNumber?: number; maxRecievers?: number; familyType?: string }
  options: string[],
  placeHolder: string,
}


const LocationGiver: React.FC<Props> = ({ nextStep, prevStep, handleLocationChange, values, options, placeHolder }) => {


  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  }

  if (prevStep) {
    const Previous = (e: any) => {
      e.preventDefault();
      prevStep();
    }
    return (
      <div className = "form">
            <Dropdown options={options} value={values.familiyType} onChange={handleLocationChange} placeholder={placeHolder}></Dropdown>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Continue} >Neste</Button>
                </Grid>
            </Grid>
                
                
      </div>
    )
  }
  return (
    <div>
          <Dropdown options={options} value={values.location} onChange={handleLocationChange} placeholder={placeHolder}></Dropdown>
          <Grid container spacing={2} justify="center">
              <Grid item>
              <Route render={({ history }) => (
                      <Button variant="contained" onClick={() => { history.push('/') }}>Tilbake</Button>)} />
              </Grid>
              <Grid item>
                  <Button variant="contained" onClick={Continue}>Neste</Button>
              </Grid>
          </Grid>
    </div>
  )

}
export default LocationGiver