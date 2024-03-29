import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useMemo } from "react";
import { isMobile } from "../../../common/functions/IsMobile";

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
  value,
  ...rest
}) => {
  const [isMob, setIsMob] = useState(false);

  const jsxOptions = useMemo(() => {
    if (isMob) {
      if (options && options.length !== 0) {
        return (
          <>
            {options.some((o) => !o.value) || value || (
              <option value="">-- Velg alternativ --</option>
            )}
            {options.map((o) => (
              <option key={`n_${name}_${o.text}`} value={o.value}>
                {o.text}
              </option>
            ))}
          </>
        );
      } else {
        return <option value="">Ingen alternativer</option>;
      }
    } else {
      return options?.map((o) => (
        <MenuItem key={`${name}_${o.text}`} value={o.value}>
          {o.text}
        </MenuItem>
      ));
    }
  }, [value, options, isMob]);

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
      focused={!disabled && isMob}
    >
      <InputLabel variant={variant} htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        native={isMob}
        id={id}
        inputProps={{
          name: name,
        }}
        label={label}
        value={value}
        {...rest}
      >
        {jsxOptions}
      </Select>
      {error && errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default SelectForm;
