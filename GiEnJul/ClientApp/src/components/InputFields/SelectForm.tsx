import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { isMobile } from "../../common/functions/IsMobile";

interface ISelect extends SelectProps {
  name: string;
  options: {
    value: string | number | readonly string[] | undefined;
    text: string;
  }[];
  errorMessage?: string;
}

const SelectForm: FC<ISelect> = ({
  name,
  options,

  errorMessage,
  id,
  label,
  error,
  variant,
  disabled,
  fullWidth,
  margin,
  ...rest
}) => {
  const [isMob, setIsMob] = useState(false);

  useEffect(() => {
    setIsMob(isMobile());
  }, []);

  return (
    <FormControl
      variant={variant}
      error={error}
      disabled={disabled}
      fullWidth={fullWidth}
      margin={margin}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native={isMob}
        inputProps={{
          name: name,
          id: id,
        }}
        label={label}
        {...rest}
      >
        {options &&
          options.map((o) =>
            isMob ? (
              <option
                key={`n_${name}_${o.text}`}
                value={o.value}
                className="text-capitalize"
              >
                {o.text}
              </option>
            ) : (
              <MenuItem
                key={`${name}_${o.text}`}
                value={o.value}
                className="text-capitalize"
              >
                {o.text}
              </MenuItem>
            )
          )}
      </Select>
      {error && errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default SelectForm;
