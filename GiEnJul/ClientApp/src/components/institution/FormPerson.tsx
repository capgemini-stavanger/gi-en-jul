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
  updatePerson: (newPerson: IFormPerson) => void;
  deletePerson: () => void;
  viewErrorTrigger: number;
  person: IFormPerson;
}

const initFormDataState: { [data: string]: any } = {
  age: "",
  gender: Gender.Unspecified,
  wish: "",
  ageWish: false,
};

const initValidFormState: { [valid: string]: boolean } = {
  age: false,
  gender: false,
  wishInput: false,
  wish: false,
};

const InstitutionPerson: FC<PersonProps> = ({
  updatePerson,
  deletePerson,
  viewErrorTrigger,
  person,
}) => {
  const [formDataState, setFormDataState] = useState(initFormDataState);
  const [validFormState, setValidFormState] = useState(initValidFormState);

  const getFormDataSetter = (target: keyof typeof formDataState) => {
    return (value: unknown) => {
      setFormDataState((prev) => {
        prev[target] = value;
        return { ...prev };
      });
    };
  };

  const getValiditySetter = (target: keyof typeof validFormState) => {
    return (isValid: boolean) => {
      setValidFormState((prev) => {
        prev[target] = isValid;
        return prev;
      });
    };
  };

  useEffect(() => {
    getValiditySetter("wish")(
      validFormState.wishInput || formDataState.ageWish
    );
  }, [validFormState.wishInput, formDataState.ageWish]);

  useEffect(() => {
    let tmpPerson = person as IFormPerson;
    tmpPerson.age = formDataState.age;
    tmpPerson.gender = formDataState.gender;
    tmpPerson.wish = formDataState.ageWish ? undefined : formDataState.wish;
    tmpPerson.isValidAge = validFormState.age;
    tmpPerson.isValidGender = validFormState.gender;
    tmpPerson.isValidWish = validFormState.wish;
    updatePerson(tmpPerson);
  });

  const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let strAge = e.target.value;
    let intAge = parseInt(strAge);
    if (intAge) {
      if (intAge > 130) {
        strAge = "130";
      } else if (intAge < 0) {
        strAge = "0";
      }
    }
    getFormDataSetter("age")(strAge);
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newGender = parseInt(e.target.value);
    if (newGender !== Gender.Unspecified) {
      getFormDataSetter("gender")(newGender);
      getValiditySetter("gender")(true);
    }
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
          setIsValids={getValiditySetter("age")}
          name="age"
          type="number"
          label="Alder"
          value={formDataState.age}
          onChange={onAgeChange}
        />
      </Grid>
      <Grid item xs={2}>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isNotNull]}
          setIsValids={getValiditySetter("age")}
          name="gender"
          type="select"
          label="Kjønn"
          variant={"outlined"}
          value={formDataState.gender ? formDataState.gender : ""}
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
          validators={[
            (input) => {
              return formDataState.ageWish || isNotNull(input);
            },
          ]}
          setIsValids={getValiditySetter("wishInput")}
          name="wish"
          label="Gaveønske (husk størrelse)"
          disabled={formDataState.ageWish}
          value={formDataState.wish}
          onChange={(e) => getFormDataSetter("wish")(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs>
        <FormControlLabel
          control={
            <Checkbox
              checked={formDataState.ageWish}
              onChange={(e) => getFormDataSetter("ageWish")(e.target.checked)}
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
