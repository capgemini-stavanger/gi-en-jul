import { TextField } from '@material-ui/core';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import SelectInput from '../SelectInput';


interface InputValidatorProps {
    // List of methods to use for validation. 
    // Ascending prioritation.
    validators: ((input: string) => boolean)[],

    // List of methods that updates any setValid value.
    // (undefined | set value function | list same length as validators prop with set value functions)
    setIsValids?: ((isValid: boolean) => void) | ((isValid: boolean) => void)[],

    // List of error that should occur, depending on which validator fails. 
    // Has no error message if undefined.
    // Ascending prioritation.
    // (undefined | list same length as validators prop)
    errorMessages?: string[],   

    // Increment to view any validation errors. 
    // Initialize to 0 if errors shouldn't start active.
    viewErrorTrigger?: number,
    
    value: any,
    onChange: ((e: any) => void), 
    label: string,
    name: string,
    type?: string,
    id?: string,
    className?: string,
    disabled?: boolean,
    margin?: any,
    variant?: any,
    autoComplete?: string,
    fullWidth?: boolean,
    autoFocus?: boolean,
    size?: any,
    multiline?: boolean,
    rowsMax?: number | string,
    placeholder?: string,

    options?: {value: any, text: string}[],  // Only for "type=select".
}

const InputValidator: FC<InputValidatorProps> = (
    {   setIsValids, 
        validators,
        errorMessages,
        viewErrorTrigger,
        value, 
        onChange, 
        type, 
        label,
        name, 
        id, 
        className, 
        disabled,
        margin,
        variant,
        autoComplete,
        fullWidth,
        autoFocus,
        size,
        multiline,
        rowsMax,
        placeholder,
        options,
     },
) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");
    const [viewError, setViewError] = useState(false);

    const checkArgs = () => {
        let validatorCount = validators.length;
        function isInvalidOptionalArg(arg?: Array<any> | Function) {
            return typeof arg === "object" && arg.length !== validatorCount;
        }
        if (isInvalidOptionalArg(setIsValids) || 
            isInvalidOptionalArg(errorMessages) ||
            (type === "select" && (!options || !name))) {
            throw Error("An argument in InputValidator is invalid.");
        }
    }

    const validate = () => {
        let errorMsg: string | undefined = undefined;
        let isAnyError = false;
        for (let i = 0; i < validators.length; i++) {
            let isValid = validators[i](value);
            switch (typeof setIsValids) {
                case "object":
                    setIsValids[i](isValid);
                    break;
                case "function":
                    setIsValids(isValid);
                    break;
            } 
            if (!isValid && viewError) {
                errorMsg = errorMessages !== undefined ? errorMessages[i] : undefined;
                isAnyError = true;
            }
        }
        setIsError(isAnyError);
        setErrorMessage(errorMsg);
    }

    const extendedOnChange = (e: any) => {
        onChange(e);
        setViewError(false);
    }

    useEffect(() => {
        if (viewErrorTrigger || viewErrorTrigger === undefined) setViewError(true);
    }, [viewErrorTrigger])

    useEffect(() => {
        checkArgs();
        validate();
    })

    switch (type) {
        case "select":
            if (!options) throw Error("Options must be defined in select input");
            return (
                <SelectInput
                    name={name}
                    options={options}
                    value={value}
                    onChange={onChange}
                    variant={variant}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    margin={margin}
                    id={id}
                    className={className}
                    label={label}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    errorMessage={errorMessage}
                    error={isError}
                    autoFocus={autoFocus}
                />
            )
        default:
            return (
                <TextField
                    error={isError}
                    helperText={errorMessage}
                    label={label}
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={extendedOnChange} 
                    id={id} 
                    className={className} 
                    disabled={disabled}
                    margin={margin}
                    variant={variant ? variant : "outlined"}
                    autoComplete={autoComplete}
                    fullWidth={fullWidth}
                    autoFocus={autoFocus}
                    size={size}
                    multiline={multiline}
                    rowsMax={rowsMax}
                    placeholder={placeholder}
                />
            )
    }
}

export default InputValidator;
