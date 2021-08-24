import {
  capitalize,
  Checkbox,
  FormControlLabel,
  Grid,
  SvgIcon,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "../../common/constants/Genders";
import Gender from "../../common/enums/Gender";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull } from "../InputFields/Validators/Validators";
import IFormPerson from "./IFormPerson";

interface PersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  viewErrorTrigger: number;
  person: IFormPerson;
}

const initState: { [data: string]: any } = {
  ageWish: false,
  wishInput: "",
  validWishInput: false,
};

const InstitutionPerson: FC<PersonProps> = ({
  updatePerson,
  deletePerson,
  viewErrorTrigger,
  person,
}) => {
  const [state, setState] = useState({ ...initState });

  const getSetter =
    (target: keyof typeof state) => (value: typeof state[typeof target]) => {
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
    let intAge = parseInt(strAge);
    if (intAge !== NaN) {
      if (intAge > 130) {
        strAge = "130";
      } else if (intAge < 0) {
        strAge = "0";
      }
    } else {
      return;
    }
    updatePerson({ age: strAge, isValidAge: !!strAge });
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newGender = parseInt(e.target.value);
    if (newGender !== NaN && newGender !== Gender.Unspecified) {
      updatePerson({ gender: newGender, isValidGender: true });
    }
  };

  const onWishInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newInput = e.target.value;
    getSetter("wishInput")(newInput);
    updatePerson({ wish: newInput });
  };

  const onAgeWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newInput = e.target.checked;
    getSetter("ageWish")(newInput);
    updatePerson({ wish: undefined });
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <IconButton color="secondary" onClick={deletePerson}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>
      <Grid item xs={2}>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isNotNull]}
          name="age"
          type="number"
          label="Alder"
          value={person.age}
          onChange={onAgeChange}
        />
      </Grid>
      <Grid item xs={2}>
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
          fullWidth
        />
      </Grid>
      <Grid item xs>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[(isValid) => state.ageWish || isNotNull(isValid)]}
          setIsValids={getSetter("validWishInput")}
          name="wish"
          label="Gaveønske (husk størrelse)"
          disabled={state.ageWish}
          value={state.wishInput}
          onChange={onWishInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs>
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
      </Grid>
    </Grid>
  );
};

export default InstitutionPerson;
