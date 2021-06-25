import * as React from 'react';
import { Route } from 'react-router-dom'
import useStyles from './Styles';
import { ValidatorForm, SelectValidator} from 'react-material-ui-form-validator';



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

  const classes = useStyles();

  if (prevStep) {
    const Previous = (e: any) => {
      e.preventDefault();
      prevStep();
      }
      
      return (
          <Container>
            <ValidatorForm
            onSubmit={Continue}
            variant="outlined"     
            fullWidth
            required
            margin = "normal"
            style={{width: '100%', marginTop: '5px'}}
            onError={errors => console.log(errors)}
            >
                <SelectValidator
                    variant="outlined"
                    fullWidth
                    autoFocus
                    placeholder={placeHolder}
                    validators={['required']}
                    name="familyType-input"
                    id="familyType-input"
                    value = {values.familyType}
                    onChange={handleLocationChange}
                    label ="Familiesammensetning"
                    errorMessages={['Vennligst velg familiesammensetning']}
                >
                    {options.map(x =>
                        <MenuItem value={x}>{x}</MenuItem>)}
                </SelectValidator>
            <Grid container spacing={2} justify="center" className={classes.submit}>
                <Grid item >
                    <Button variant="contained" onClick={Previous} >Tilbake</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">Neste</Button>
                </Grid>
            </Grid>
            </ValidatorForm>
          </Container>
    )
  }
  return (
      <Container>
          <ValidatorForm 
                    onSubmit={Continue}
                    onError={errors => console.log(errors)}
                    variant="outlined" 
                    fullWidth
                    required
                    margin = "normal"
                    style={{width: '100%', marginTop: '20px'}}>
              <SelectValidator
                  variant="outlined"
                  fullWidth
                  autoFocus
                  placeholder={placeHolder}
                  validators={['required']}
                  label = "Lokasjon"
                  name="location-input"
                  value = {values.location}
                  id="location-input"
                  onChange={handleLocationChange}
                  errorMessages={['Vennligst velg lokasjon']}
              >
                  {options.map(x =>
                      <MenuItem value={x}>{x}</MenuItem>)}
              </SelectValidator>
          <Grid container spacing={2} justify="center" className={classes.submit}>
              <Grid item>
              <Route render={({ history }) => (
                      <Button variant="contained" onClick={() => { history.push('/') }}>Tilbake</Button>)} />
              </Grid>
              <Grid item>
                  <Button variant="contained" type="submit">Neste</Button>
              </Grid>
          </Grid>
          </ValidatorForm>
      </Container>
  )

}
export default LocationGiver