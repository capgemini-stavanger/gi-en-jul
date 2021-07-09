import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import getLocations from '../../common/constants/Locations';

interface LocationProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    viewErrorTrigger?: number;
    setIsValidLocation?: (isValid: boolean) => void;
    include_header?: boolean;
}

const Location:FC<LocationProps> = ({
    value,
    onChange,
    viewErrorTrigger,
    setIsValidLocation,
    include_header,
}) => {
    const [isErr, setIsErr] = useState(false);
    const [viewError, setViewError] = useState(false);

    const extendedOnChange = (e: any) => {
        onChange(e);
        setViewError(false);
    }

    useEffect(() => {
        if (viewErrorTrigger) setViewError(true);
    }, [viewErrorTrigger])

    useEffect(() => {
        let isValid = !!value;
        if (setIsValidLocation) setIsValidLocation(isValid);
        setIsErr(viewError && !isValid);
    }, [value, setIsValidLocation, setIsErr, viewError])

    const [locationList, setLocationList] = useState<string[]>([]);

    useEffect(() => {
        getLocations().then((data) => {
            if (data.length > 0) setLocationList(data);
            else setLocationList([]);            
        });
    }, [])

    if (locationList.length > 0)
        return (
            <div>
                {include_header && <FormLabel error={isErr} component="legend">Hvor ønsker du å registrere familie (velg en)</FormLabel>}
                <RadioGroup row className="justify-content-around" name="locations" value={value} onChange={extendedOnChange}>
                    {locationList.map(l => <FormControlLabel key={`loc_${l}`} value={l} control={<Radio />} label={l} />)}
                </RadioGroup>
            </div>
        );
    else return <div>Ingen aktive lokasjoner, prøv igjen senere</div>;
};

export default Location;