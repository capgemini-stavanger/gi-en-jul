import * as React from 'react';
import { Route } from 'react-router-dom'
import 'react-dropdown/style.css';


import { Button, Grid,  Select, MenuItem, Container, FormControl, InputLabel} from '@material-ui/core';


type Props = {
  nextStep: () => void,
  prevStep?: () => void,
    handleLocationChange: (event: any) => void,
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
          <Container>
            <FormControl 
          variant="outlined" 
          fullWidth
          required
          margin = "normal"
          
          >
            <InputLabel id="familiType">Familiesammensetning</InputLabel>
                <Select
                    label ="Familiesammensetning"
                    variant="outlined"
                    fullWidth
                    id="familyType-input"
                    autoFocus
                    placeholder={placeHolder}
                    onChange={handleLocationChange}
                >
                    {options.map(x =>
                        <MenuItem value={x}>{x}</MenuItem>)}
                </Select>
                </FormControl>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button variant="contained" onClick={Previous}>Tilbake</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={Continue}>Neste</Button>
                </Grid>
            </Grid>
          </Container>
    )
  }
  return (
      <Container>
          <FormControl 
                    variant="outlined" 
                    fullWidth
                    required
                    margin = "normal" 
          >
            <InputLabel id="location">Lokasjon</InputLabel>
              <Select
                label = "Lokasjon"
                  id="location-input"
                  autoFocus
                  placeholder={placeHolder}
                  onChange={handleLocationChange}
                  value={values.location}
              >
                  {options.map(x =>
                      <MenuItem value={x}>{x}</MenuItem>)}
              </Select>
              </FormControl>
          <Grid container spacing={2} justify="center">
              <Grid item>
              <Route render={({ history }) => (
                      <Button variant="contained" onClick={() => { history.push('/') }}>Tilbake</Button>)} />
              </Grid>
              <Grid item>
                  <Button variant="contained" onClick={Continue}>Neste</Button>
              </Grid>
          </Grid>
      </Container>
  )

}
export default LocationGiver