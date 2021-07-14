import {
  capitalize,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";

interface IFormDinner {
  viewErrorTrigger: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  radio: any;
  onRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  foods: string[];
  inputLabel: string;
  name: string;
  setIsValid?: (isValid: boolean) => void;
  header?: string;
  required?: boolean;
}

const FormDinner: FC<IFormDinner> = ({
  viewErrorTrigger,
  onInputChange,
  input,
  radio,
  onRadioChange,
  foods,
  inputLabel,
  name,
  setIsValid,
  header,
  required,
}) => {
  const [isErr, setIsErr] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [viewError, setViewError] = useState(false);

  const extendedOnRadioChange = (e: any) => {
    onRadioChange(e);
    setViewError(false);
  };

  useEffect(() => {
    if (viewErrorTrigger) setViewError(true);
  }, [viewErrorTrigger]);

  useEffect(() => {
    let isInvalid = !radio || (radio === "annet" && !isValidInput);
    if (setIsValid) setIsValid(!isInvalid);
    setIsErr(!!required && viewError && isInvalid);
  }, [setIsValid, required, viewError, radio, isValidInput]);

  return (
    <div>
      {header && (
        <FormLabel required={required} error={isErr}>
          {header}
        </FormLabel>
      )}
      <RadioGroup name={name} value={radio} onChange={extendedOnRadioChange}>
        {foods.map((f) => {
          return (
            <FormControlLabel
              key={`fd_${f}`}
              value={f}
              control={<Radio />}
              label={capitalize(f)}
            />
          );
        })}
        <FormControlLabel
          value={"annet"}
          control={<Radio />}
          label={
            <Grid container spacing={1} alignItems={"center"}>
              <Grid item>Annet</Grid>
              <Grid item>
                <InputValidator
                  size={"small"}
                  viewErrorTrigger={viewErrorTrigger}
                  setIsValids={setIsValidInput}
                  validators={[
                    (input) => {
                      return !required || radio !== "annet" || isNotNull(input);
                    },
                  ]}
                  onChange={onInputChange}
                  value={input}
                  name={`${name}_input`}
                  disabled={radio !== "annet"}
                  label={inputLabel}
                  multiline
                  maxRows="8"
                />
              </Grid>
            </Grid>
          }
        />
      </RadioGroup>
    </div>
  );
};

export default FormDinner;
