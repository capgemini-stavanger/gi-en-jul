import { MenuItem } from '@material-ui/core';
import { FormControl, FormHelperText, InputLabel, Select, TextField } from '@material-ui/core';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';


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
    size?: any

    options?: {value: any, text: string}[],  // Only for "type=select".
    isMobile?: boolean,   // Only for "type=select". If true: select dropdown uses native dropdown, which is better for mobile.
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
        options,
        isMobile,
     },
) => {
    const [error, setError] = useState("");
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
        let errorMsg = "";
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
                errorMsg = errorMessages !== undefined ? errorMessages[i] : "dummy";
            }
        }
        setError(errorMsg);
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
            return (
                <FormControl 
                    variant={variant} 
                    error={!!error}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    margin={margin}
                >
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <Select 
                        native={isMobile}
                        error={!!error}
                        value={value}
                        onChange={extendedOnChange}
                        autoFocus={autoFocus}
                        label={label}
                        inputProps={{
                            name: name,
                            id: id
                        }}
                        autoComplete={autoComplete}
                    >
                    {options && options.map(o => 
                        {return isMobile ? 
                        <option key={`n_${name}_${o.text}`} value={o.value} className="text-capitalize">{o.text}</option> : 
                        <MenuItem key={`${name}_${o.text}`} value={o.value} className="text-capitalize">{o.text}</MenuItem>})}
                    </Select>
                    {errorMessages !== undefined && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
            )
        default:
            return (
                <TextField
                    error={!!error}
                    helperText={errorMessages === undefined ? undefined : error}
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
                />
            )
    }
}

export default InputValidator;
