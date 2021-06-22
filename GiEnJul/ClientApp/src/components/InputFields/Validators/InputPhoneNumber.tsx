import * as React from 'react';
import { FC } from 'react';
import InputValidator from './InputValidator';
import IValidator from './IValidator';
import Validator from './ValidatorFlags';

const InputPhoneNumber: FC<IValidator> = (
    { setIsValid, value, onChange, type, name, placeholder },
) => {
    return (
        <InputValidator validator={Validator.PhoneNumber} setIsValid={setIsValid} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    )
}

export default InputPhoneNumber;
