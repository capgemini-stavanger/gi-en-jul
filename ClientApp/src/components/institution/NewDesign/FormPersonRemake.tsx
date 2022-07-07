import {
  capitalize,
  Checkbox,
  FormControlLabel,
  Grid,
  SvgIcon,
  IconButton,
  Box,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isInt } from "components/shared/input-fields/validators/Validators";
import IFormPerson from "components/institution/IFormPerson";
import useStyles from "../Styles";

interface IPersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  viewErrorTrigger: number;
  person: IFormPerson;
}

const initState: { [data: string]: any } = {
  ageWish: false,
  wishInput: "",
  validWishInput: false,
  commentInput: "",
};

const FormPersonRemake: FC<IPersonProps> = ({
  updatePerson,
  deletePerson,
  viewErrorTrigger,
  person,
}) => {
  const classes = useStyles();

  const [state, setState] = useState({ ...initState });

  const getSetter = (target: keyof typeof state) => (value: typeof state[typeof target]) => {
    setState((prev) => {
      prev[target] = value;
      return prev;
    });
  };

  useEffect(() => {
    updatePerson({
      isValidWish: state.validWishInput || person.wish === undefined,
    });
  }, [state.validWishInput, person.wish]);

  const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let strAge = e.target.value;
    const intAge = Math.floor(parseInt(strAge));
    strAge = intAge.toString();
    if (intAge !== NaN) {
      if (intAge > 130) {
        strAge = "130";
      } else if (intAge < 0) {
        strAge = "0";
      }
    } else {
      return;
    }
    if (intAge >= 1) {
      person.months = "0";
    }
    updatePerson({ age: strAge, isValidAge: !!strAge });
  };

  const onMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let strMonths = e.target.value;
    const intMonths = Math.floor(parseInt(strMonths));
    strMonths = intMonths.toString();
    if (intMonths !== NaN) {
      if (intMonths > 11) {
        strMonths = "11";
      } else if (intMonths < 0) {
        strMonths = "0";
      }
    } else {
      return;
    }
    updatePerson({ months: strMonths, isValidMonths: !!strMonths });
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = parseInt(e.target.value);
    if (newGender !== NaN && newGender !== Gender.Unspecified) {
      updatePerson({ gender: newGender, isValidGender: true });
    }
  };

  const onWishInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    getSetter("wishInput")(newInput);
    updatePerson({ wish: newInput });
  };

  const onAgeWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.checked;
    getSetter("ageWish")(newInput);
    updatePerson({ wish: undefined });
  };

  const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    getSetter("commentInput")(newInput);
    updatePerson({ comment: newInput });
  };

  return (
    <Grid container direction="row" spacing={5} alignItems="center" justifyContent="space-around">
      <Grid item>
        <IconButton color="secondary" onClick={deletePerson}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isInt]}
          name="age"
          type="number"
          label="Alder"
          value={person.age || "0"}
          onChange={onAgeChange}
          className={classes.smallWidth}
        />
      </Grid>
      {(parseInt(person.age) < 1 || !person.age) && (
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isInt]}
            name="months"
            type="number"
            label="Måneder"
            value={person.months || "0"}
            onChange={onMonthsChange}
            className={classes.smallWidth}
          />
        </Grid>
      )}
      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isNotNull]}
          name="gender"
          type="select"
          label="Kjønn"
          variant={"outlined"}
          value={person.gender ? person.gender : ""}
          onChange={onGenderChange}
          options={GENDERS.map((o) => {
            return { value: o.value, text: capitalize(o.text) };
          })}
          className={classes.mediumWidth}
        />
      </Grid>
      {!state.ageWish && (
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[(isValid) => state.ageWish || isNotNull(isValid)]}
            setIsValids={getSetter("validWishInput")}
            name="wish"
            label="Gaveønske"
            disabled={state.ageWish}
            value={state.wishInput}
            onChange={onWishInputChange}
            className={classes.mediumWidth}
          />
        </Grid>
      )}
      <Grid item>
        <Box className={classes.mediumWidth}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.ageWish}
                onChange={onAgeWishChange}
                name="isAgeWish"
                color="primary"
              />
            }
            className="my-0"
            label="Giver kjøper alderstilpasset gave"
          />
        </Box>
      </Grid>
      <Grid item>
        <Grid item>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[]}
            name="comment"
            label="Kommentar"
            value={state.commentInput}
            onChange={onCommentInputChange}
            className={classes.mediumWidth}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormPersonRemake;
