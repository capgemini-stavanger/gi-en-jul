import * as React from 'react';
import { Button } from 'reactstrap';
import {Route} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ContactInfo from './ContactInfo';

type Props = {
    nextStep: () => void,
    handleLocationChange: (value: any) => (newLocation: React.SetStateAction<string>) => void,
    values: { location: string; name: string; email: string; tlf: number; familiyType: string; }
    }


const LocationGiver: React.FC<Props> = ({nextStep, handleLocationChange, values}) => {
    const options = [
    'Stavanger', 'Sola', 'Sandnes'
  ];
  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  }

    return(
        <div>
        <h2>Bli giver</h2>
        <h3>Hvor vil du gi?</h3>
        <Dropdown  options={options} value = {values.location} onChange={handleLocationChange} placeholder="Velg en by.."></Dropdown>
        <p><Route render={({ history}) => (
             <Button onClick={() => { history.push('/') }}>tilbake</Button>)}/>
        </p>
        <Button onClick = { Continue } >Neste</Button>
        </div>
    )

}
export default LocationGiver
// const options = [
//     'Stavanger', 'Sola', 'Sandnes'
//   ];

//   interface Props {
//     step: number
//     location: string,
//     name: string,
//     email: string,
//     tlf: string,
//     familiyType: string,
//     nextStep: () => {},
// }


// const LocationGiver = (_Props: any) => {
//     const handleChange = (newLocation: React.SetStateAction<string>) => {
//         this.props.
//         setLocation(newLocation)

//     return (
//         <div>
//         <h2>Bli giver</h2>
//         <h3>Hvor vil du gi?</h3>
//         <Dropdown  options={options} onChange={ (value) => handleChange(value.value)} placeholder="Velg en by.."></Dropdown>
//         <p><Route render={({ history}) => (
//              <Button onClick={() => { history.push('/') }}>tilbake</Button>)}/>
//         </p>
//         </div>
//         )
// }
// export default LocationGiver

// interface Props {
//     value

// }
//   class LocationGiver extends React.PureComponent< {Props}, {}>{
//     // const [location, setLocation] = React.useState<string>('');

//     handleChange = (newLocation: React.SetStateAction<string>) => {
//         setLocation(newLocation)
//     }
//     Continue = e => {
//         e.preventDefault();
//         nextStep();
//       }
//       render (){
//         return (
            // <div>
            // <h2>Bli giver</h2>
            // <h3>Hvor vil du gi?</h3>
            // <Dropdown  options={options} onChange={ (value) => handleChange(value.value)} placeholder="Velg en by.."></Dropdown>
            // <p><Route render={({ history}) => (
            //      <Button onClick={() => { history.push('/') }}>tilbake</Button>)}/>
            // </p>
            // </div>
//             )

//       }
// }


