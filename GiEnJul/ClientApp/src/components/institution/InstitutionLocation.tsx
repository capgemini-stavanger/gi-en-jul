import * as React from 'react';
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