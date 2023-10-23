import {
  Box,
  capitalize,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import useStyles from "./Styles";

interface IFormDinner {
  foods: string[];
  foodLabels?: { [key: string]: string };
  inputLabel: string;
  name: string;
  header?: string;
  required?: boolean;
  shouldClear?: boolean;
  onStateChange: (state: string) => void;
  setIsValid?: (isValid: boolean) => void;
}

const FormDinners: FC<IFormDinner> = ({
  foods,
  foodLabels,
  inputLabel,
  name,
  header,
  required,
  shouldClear,
  onStateChange,
  setIsValid,
}) => {
  const { foodInput: foodInputClass, foodInputContainer: foodInputContainerClass } = useStyles();
  const [comment, setComment] = useState("");

  const initializeCheckboxStates = (foods: string[]) => {
    return foods.reduce((prev, current) => {
      prev[current] = false;
      return prev;
    }, {} as { [name: string]: boolean });
  };
  const [checkedState, setCheckedState] = useState(initializeCheckboxStates(foods));

  useEffect(() => {
    setCheckedState(initializeCheckboxStates(foods));
    setComment("");
  }, [shouldClear]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setCheckedState({
      ...checkedState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeComment = (event: React.ChangeEvent<any>) => {
    setComment(event.target.value);
  };

  const opts = Object.values(checkedState).filter((o) => o).length;
  const error = opts < 1 && !comment.length;

  useEffect(() => {
    const options = Object.entries(checkedState)
      .filter((e) => e[1])
      .map((e) => e[0]);
    const selectedOptions = options.join(", ");
    const selectedOptionsWithComment = comment.length
      ? [selectedOptions, comment].join(". ")
      : selectedOptions;
    onStateChange(selectedOptionsWithComment);
    const opts = Object.values(checkedState).filter((o) => o).length;
    const error = opts < 1 && !comment.length;
    setIsValid?.(!error);
  }, [checkedState, comment]);

  return (
    <Box sx={{ height: "100%" }}>
      <FormControl error={error} style={{ width: "100%" }}>
        {header && (
          <FormLabel required={required} error={error}>
            {header}
          </FormLabel>
        )}
        <FormGroup>
          {foods.map((f) => {
            const label = foodLabels?.[f] ?? f;
            return (
              <FormControlLabel
                key={`fd_${f}`}
                control={
                  <Checkbox
                    checked={checkedState[f]}
                    onChange={handleChange}
                    name={f}
                    color="primary"
                  />
                }
                label={capitalize(label)}
              />
            );
          })}
          <Box sx={{ width: "100%", marginTop: "16px", display: "flex" }}>
            <TextField
              className={foodInputContainerClass}
              onChange={handleChangeComment}
              InputProps={{ className: foodInputClass }}
              value={comment}
              name={`${name}_input`}
              label={inputLabel}
              multiline
              maxRows="8"
              minRows="2"
              variant="outlined"
            />
          </Box>
        </FormGroup>
        {error && (
          <FormHelperText>Velg minst ett valg eller skriv inn i boksen over</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default FormDinners;
