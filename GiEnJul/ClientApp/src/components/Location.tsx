import * as React from 'react';
import {useState} from 'react';
import { FC } from 'react';


interface LocationProps {
    name:string
    check: boolean
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Location:FC<LocationProps> = ({
    name,
    check,
    onchange,
}) => {
    // const [Check, setCheck] = useState(false);

    // function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    //     setCheck(event.target.checked);
    // }



    return(
        <div >
            <input
            name="Lokasjon"
            type="checkbox"
            id={name}
            checked={check}
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => onchange(e)} />
            {name}
        </div>
    );
};

export default Location;