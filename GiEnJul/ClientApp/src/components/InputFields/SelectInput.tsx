import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { FC } from "react";
import { isMobile } from "../../common/functions/IsMobile";

interface ISelect {
    name: string,
    options: {value: any, text: string}[],
    value: any,
    onChange: (e: any) => void,

    variant?: any,
    disabled?: boolean,
    fullWidth?: boolean,
    margin?: any,
    id?: string,
    className?: string,
    label?: string,
    placeholder?: string,
    autoComplete?: any,
    errorMessage?: string,
    error?: boolean,
    autoFocus?: boolean
}

const SelectInput: FC<ISelect> = (
    {   
        name,
        options,
        value,
        onChange,

        variant,
        disabled,
        fullWidth,
        margin,
        id,
        className,
        label,
        placeholder,
        autoComplete,
        errorMessage,
        error,
        autoFocus,
    },
) => {
    return (
        <FormControl 
            variant={variant} 
            error={!!errorMessage}
            disabled={disabled}
            fullWidth={fullWidth}
            margin={margin}
        >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select 
                native={isMobile()}
                error={!!error}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                label={label}
                inputProps={{
                    name: name,
                    id: id
                }}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={className}
            >
            {options && options.map(o => 
                {return isMobile() ? 
                <option key={`n_${name}_${o.text}`} value={o.value} className="text-capitalize">{o.text}</option> : 
                <MenuItem key={`${name}_${o.text}`} value={o.value} className="text-capitalize">{o.text}</MenuItem>})}
            </Select>
            {error && errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    )
}

export default SelectInput;
