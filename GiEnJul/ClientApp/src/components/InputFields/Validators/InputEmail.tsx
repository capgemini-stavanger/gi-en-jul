﻿import * as React from 'react';
import { FC } from 'react';
import InputValidator from './InputValidator';
import IValidator from './IValidator';
import ValidatorFlags from './ValidatorFlags';

const InputEmail: FC<IValidator> = (
    { setIsValid, value, onChange, type, name, placeholder, id, className, disabled },
) => {
    return (
        <InputValidator 
        validatorFlag={ValidatorFlags.Email} 
        setIsValid={setIsValid} 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        id={id} 
        className={className}
        disabled={disabled}/>
    )
}

export default InputEmail;
