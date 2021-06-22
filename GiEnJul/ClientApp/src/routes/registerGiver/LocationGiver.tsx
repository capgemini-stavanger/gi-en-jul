import * as React from 'react';
import { Button } from 'reactstrap';
import {Route} from 'react-router-dom'
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


const LocationGiver: React.FC<Props> = ({nextStep, prevStep, handleLocationChange, values, options, placeHolder}) => {

  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  }

    return(
        <div>
        <Dropdown  options={options}  onChange={handleLocationChange} placeholder={placeHolder}></Dropdown>
        <p><Route render={({ history}) => (
             <Button onClick={() => { history.push('/') }}>tilbake</Button>)}/>
        </p>
        <Button onClick = { Continue } >Neste</Button>
        </div>
    )

}
export default LocationGiver