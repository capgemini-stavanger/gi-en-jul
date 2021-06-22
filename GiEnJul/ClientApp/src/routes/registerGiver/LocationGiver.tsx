import * as React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Route } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

type Props = {
  nextStep: () => void,
  prevStep?: () => void,
  handleLocationChange: (newLocation: Object) => void,
  values: { location: string | undefined; name: string | undefined; email: string | undefined; tlf: number | undefined; familiyType: string | undefined; }
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
      <div>
        <Dropdown options={options} value={values.familiyType} onChange={handleLocationChange} placeholder={placeHolder}></Dropdown>
        <ButtonToolbar>
          <Button onClick={Previous}>Tilbake</Button>
          <Button onClick={Continue} >Neste</Button>
        </ButtonToolbar>
      </div>
    )
  }
  return (
    <div>
      <Dropdown options={options} value={values.location} onChange={handleLocationChange} placeholder={placeHolder}></Dropdown>
      <ButtonToolbar>
        <Route render={({ history }) => (
          <Button onClick={() => { history.push('/') }}>tilbake</Button>)} />
        <Button onClick={Continue} >Neste</Button>
      </ButtonToolbar>
    </div>
  )

}
export default LocationGiver