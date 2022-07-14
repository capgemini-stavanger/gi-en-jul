import { capitalize, Grid, SvgIcon, IconButton, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isInt } from "components/shared/input-fields/validators/Validators";
import IFormPerson from "components/institution/IFormPerson";
import useStyles from "./Styles";
import FormWish, { getFormWish, IFormWish } from "./FormWish";

interface IPersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  updatePersonWish: (newWishData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  viewErrorTrigger: number;
  person: IFormPerson;
}

const initState: { [data: string]: any } = {
  ageWish: false,
  commentSelect: false,
  wishInput: "",
  validWishInput: false,
  dialogOpen: false,
  comment: "",
  wishes: [],
};

const FormPerson: FC<IPersonProps> = ({
  updatePerson,
  updatePersonWish,
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

  useEffect(() => {}, [person.wishes]);

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

  const updateWish = (newWishData: { [target: string]: unknown }, index: number) => {
    const newList = [...person.wishes];
    newList[index].wish = newWishData.wish + "";
    updatePersonWish({ wishes: newList });
  };

  const deleteWish = (index: number) => {
    const newList = [...person.wishes];
    const head = newList.slice(0, index);
    const tail = newList.slice(index + 1, newList.length);
    const newWishList = head.concat(tail);
    person.wishes = newWishList;
    updatePersonWish({ wishes: newWishList });
  };

  const addWish = () => {
    const newList = [...person.wishes];
    if (newList.length >= 5 && !state.ageWish) return;
    newList.push(getFormWish());
    updatePersonWish({ wishes: newList });
  };

  const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    getSetter("commentInput")(newInput);
    updatePerson({ comment: newInput });
  };

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={5}
          alignItems="center"
          justifyContent="space-around"
        >
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

          <Grid item>
            <Button className={classes.hollowButton} variant="outlined" onClick={addWish}>
              Legg til gaveønske (Maks 5)
            </Button>
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

        <Grid item>
          {person.wishes.map((wish: IFormWish, i: number) => {
            return (
              <FormWish
                key={wish.id}
                wish={wish.wish}
                viewErrorTrigger={state.viewErrorTrigger}
                updateWish={(wish) => {
                  updateWish(wish, i);
                }}
                deleteWish={() => deleteWish(i)}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormPerson;
