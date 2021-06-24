import * as React from 'react';
import { ButtonToolbar } from 'reactstrap';
import { Route } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


import { Button, Grid,  Select, MenuItem, Container} from '@material-ui/core';


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
            <form className="form" noValidate>
                <Select
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="familyType-input"
                    placeholder={placeHolder}
                    onChange={handleLocationChange}
                >
                    {options.map(x =>
                        <MenuItem value={x}>{x}</MenuItem>)}
                </Select>
            </form>
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
          <form className="form" noValidate>
              <Select
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="location-input"
                  placeholder={placeHolder}
                  onChange={handleLocationChange}
                  value={values.location}
              >
                  {options.map(x =>
                      <MenuItem value={x}>{x}</MenuItem>)}
              </Select>
          </form>
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