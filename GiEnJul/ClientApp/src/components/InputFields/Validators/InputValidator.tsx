import * as React from 'react';
import { FC, useEffect } from 'react';
import validator from 'validator';
import ValidatorFlags from './ValidatorFlags';


interface InputValidatorProps {
    validatorFlag: ValidatorFlags,   // Flag. Can use multiple with bitwise or: Flag1 | Flag2
    setIsValid: (isValid: boolean) => void,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    name?: string,
    placeholder?: string, 
    id?: string,
    className?: string,
}

const InputValidator: FC<InputValidatorProps> = (
    { validatorFlag, setIsValid, value, onChange, type, name, placeholder, id, className },
) => {

    function isNotNull(inputValue: string) {
        return !!value;
    }

    function isPhoneNumber(inputValue: string) {
        // Returns true if norwegian number or foreign number starting with +{countryCode}
        return !!(validator.isMobilePhone(value, ["nb-NO", "nn-NO"]) ||
            (inputValue && inputValue.startsWith("+") && validator.isMobilePhone(value)));
    }

    function isEmail(inputValue: string) {
        return validator.isEmail(inputValue);
    }

    function validate(inputValue: string) {
        setIsValid(
            (!(validatorFlag & ValidatorFlags.NotNull) || isNotNull(inputValue)) &&
            (!(validatorFlag & ValidatorFlags.PhoneNumber) || isPhoneNumber(inputValue)) && 
            (!(validatorFlag & ValidatorFlags.Email) || isEmail(inputValue))
        )
    }

    useEffect(() => {
        validate(value);
    })

    return (
        <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        id={id} 
        className={className} />
    )
}

export default InputValidator;
