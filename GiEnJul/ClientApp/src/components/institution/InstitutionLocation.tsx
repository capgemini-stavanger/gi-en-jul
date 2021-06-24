import * as React from 'react';
import { FC } from 'react';

interface LocationProps {
    value:string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Location:FC<LocationProps> = ({
    value,
    onChange,
}) => {

    return(
        <div >
            <input
            name="Lokasjon"
            type="radio"
            value={value}
            onChange={onChange} />
            {value}
        </div>
    );
};

export default Location;