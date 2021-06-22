import * as React from 'react';
import { FC, useEffect } from 'react';
import isMobilePhone from 'validator/lib/isMobilePhone';
import Validator from './ValidatorFlags';


interface InputValidatorProps {
    validator: Validator,   // Flag. Can use multiple with bitwise or: Flag1 | Flag2
    setIsValid: (isValid: boolean) => void,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    name: string,
    placeholder: string, 
}

const InputValidator: FC<InputValidatorProps> = (
    { validator, setIsValid, value, onChange, type, name, placeholder },
) => {

    function isNotNull(inputValue: string) {
        return !!value;
    }

    function isPhoneNumber(inputValue: string) {
        // Returns true if norwegian number or foreign number starting with +{countryCode}
        return !!(isMobilePhone(value, ["nb-NO", "nn-NO"]) ||
            (inputValue && inputValue.startsWith("+") && isMobilePhone(value)));
    }

    function validate(inputValue: string) {
        setIsValid(
            (!(validator & Validator.NotNull) || isNotNull(inputValue)) &&
            (!(validator & Validator.PhoneNumber) || isPhoneNumber(inputValue))
        )
    }

    useEffect(() => {
        validate(value);
    })

    return (
        <div>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

export default InputValidator;
