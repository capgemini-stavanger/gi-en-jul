import { TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import SelectForm from "../SelectForm";

interface InputValidatorProps {
  // List of methods to use for validation.
  // Ascending prioritation.
  validators: ((input: string) => boolean)[];

  // List of methods that updates any setValid value.
  // (undefined | set value function | list same length as validators prop with set value functions)
  setIsValids?: ((isValid: boolean) => void) | ((isValid: boolean) => void)[];

  // List of error that should occur, depending on which validator fails.
  // Has no error message if undefined.
  // Ascending prioritation.
  // (undefined | list same length as validators prop)
  errorMessages?: string[];

  // Increment to view any validation errors.
  // Initialize to 0 if errors shouldn't start active.
  viewErrorTrigger?: number;

  value: any;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  label: string;
  name: string;
  type?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  margin?: any;
  variant?: "standard" | "outlined" | "filled";
  autoComplete?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  size?: any;
  multiline?: boolean;
  maxRows?: number | string;
  placeholder?: string;

  options?: { value: any; text: string }[]; // Only for "type=select".
}

const initErrorState: {
  isInvalid: boolean;
  errorMessage: string | undefined;
  viewError: boolean;
} = {
  isInvalid: false,
  errorMessage: "",
  viewError: false,
};

const InputValidator: FC<InputValidatorProps> = ({
  setIsValids,
  validators,
  errorMessages,
  viewErrorTrigger,
  value,
  onChange,
  onBlur = () => {},
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
  maxRows,
  placeholder,
  options,
}) => {
  const [errorState, setErrorState] = useState(initErrorState);

  const checkArgs = () => {
    const validatorCount = validators.length;
    function isInvalidOptionalArg(arg?: any[] | ((isValid: boolean) => void)) {
      return typeof arg === "object" && arg.length !== validatorCount;
    }
    if (
      isInvalidOptionalArg(setIsValids) ||
      isInvalidOptionalArg(errorMessages) ||
      (type === "select" && (!options || !name))
    ) {
      throw Error("An argument in InputValidator is invalid.");
    }
  };

  const validate = () => {
    let errorMsg: string | undefined;
    let isAnyInvalid = false;

    validators.forEach((item, i) => {
      const isValid = item(value);
      if (typeof setIsValids === "object") {
        setIsValids[i](isValid);
      }
      if (!isValid) {
        errorMsg = errorMessages !== undefined ? errorMessages[i] : undefined;
        isAnyInvalid = true;
      }
    });

    if (typeof setIsValids == "function") {
      setIsValids(!isAnyInvalid);
    }

    if (!errorState.viewError) {
      errorMsg = undefined;
      isAnyInvalid = false;
    }

    setErrorState((prev) => {
      return { ...prev, isInvalid: isAnyInvalid, errorMessage: errorMsg };
    });
  };

  const extendedOnChange = (e: any) => {
    onChange(e);
    setErrorState((prev) => {
      return { ...prev, viewError: false };
    });
  };

  useEffect(() => {
    setErrorState((prev) => {
      return { ...prev, viewError: !!viewErrorTrigger };
    });
  }, [viewErrorTrigger]);

  useEffect(() => {
    checkArgs();
    validate();
  }, [errorState.viewError, setIsValids, validators, errorMessages]);

  switch (type) {
    case "select":
      return (
        <SelectForm
          name={name}
          options={options ? options : [{ value: "", text: "Ingen alternativer tilgjengelige" }]}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          variant={variant}
          disabled={disabled}
          fullWidth={fullWidth}
          margin={margin}
          id={id}
          className={className}
          label={label}
          placeholder={placeholder}
          autoComplete={autoComplete}
          errorMessage={errorState.errorMessage}
          error={errorState.isInvalid}
          autoFocus={autoFocus}
        />
      );
    default:
      return (
        <TextField
          error={errorState.isInvalid}
          helperText={errorState.errorMessage}
          label={label}
          type={type}
          name={name}
          value={value}
          onChange={extendedOnChange}
          onBlur={onBlur}
          id={id}
          className={className}
          disabled={disabled}
          margin={margin}
          variant={variant ? variant : "outlined"}
          autoComplete={autoComplete}
          fullWidth={fullWidth}
          autoFocus={autoFocus}
          multiline={multiline}
          maxRows={maxRows}
          size={size}
          placeholder={placeholder}
        />
      );
  }
};

InputValidator.defaultProps = {
  variant: "outlined",
};

export default InputValidator;
