import {
  capitalize,
  Grid,
  SvgIcon,
  IconButton,
  Button,
  Box,
  Container,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { useState } from "react";
import { FC, useEffect } from "react";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isInt } from "components/shared/input-fields/validators/Validators";
import useStyles from "./Styles";
import FormWish, { getFormWish, IFormWish } from "./FormWish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IFormPerson } from "./RegistrationFormTypes";

interface IPersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  viewErrorTrigger: number;
  person: IFormPerson;
  personIndex: number;
}

const FormPerson: FC<IPersonProps> = ({
  updatePerson,
  deletePerson,
  viewErrorTrigger,
  person,
  personIndex,
}) => {
  const classes = useStyles();

  const [showWishes, setShowWishes] = useState(true);
  const [ageWish, setAgeWish] = useState(false);
  const [removeWishes, setRemoveWishes] = useState(true);

  const ageAppropriateString = "Alderstilpasset gave";

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

  const handleAgeWishChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeWish(e.target.checked);

    if (e.target.checked) {
      setRemoveWishes(false);
      setShowWishes(false);

      for (let i = 0; i < person.wishes.length; i++) {
        if (i == 0) {
          updateWish(ageAppropriateString, i);
        } else {
          deleteWish(i);
        }
      }
    } else {
      updatePerson({ wishes: [] });
      setShowWishes(true);
      setRemoveWishes(true);
    }
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = parseInt(e.target.value);
    if (newGender !== NaN && newGender !== Gender.Unspecified) {
      updatePerson({ gender: newGender, isValidGender: true });
    }
  };

  const updateWish = (newWishData: string, index: number) => {
    const newList = [...person.wishes];
    newList[index].wish = newWishData;
    updatePerson({ wishes: newList });
    console.log("wishes", person.wishes);
  };

  const deleteWish = (index: number) => {
    const newList = [...person.wishes];
    const head = newList.slice(0, index);
    const tail = newList.slice(index + 1, newList.length);
    const newWishList = head.concat(tail);
    person.wishes = newWishList;
    updatePerson({ wishes: newWishList });
  };

  const addWish = () => {
    const newList = [...person.wishes];
    if (newList.length >= 5) return;
    newList.push(getFormWish());
    updatePerson({ wishes: newList });
  };

  return (
    <Box className={classes.personBox}>
      <Box className={classes.numberBox}>{personIndex + 1}</Box>
      <Container className={classes.formBox}>
        <Box className={classes.formBoxHeader}>
          <Grid container direction="row" spacing={2} alignItems="center">
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
            {parseInt(person.age) == 0 && (
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ageWish}
                    onChange={(e) => handleAgeWishChecked(e)}
                    name="isAgeWish"
                    color="primary"
                  />
                }
                className="my-0"
                label="Alderstilpasset gave"
              />
            </Grid>

            <Grid item>
              {showWishes ? (
                <Button className={classes.hideButton} onClick={() => setShowWishes(false)}>
                  <ExpandLessIcon />
                </Button>
              ) : (
                <Button className={classes.hideButton} onClick={() => setShowWishes(true)}>
                  <ExpandMoreIcon />
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        {(showWishes || removeWishes) && (
          <Box className={classes.formBoxWishes}>
            {person.wishes.map((wish: IFormWish, i: number) => {
              return (
                <FormWish
                  key={wish.id}
                  viewErrorTrigger={viewErrorTrigger}
                  updateWish={(wish) => {
                    updateWish(wish, i);
                  }}
                  deleteWish={() => deleteWish(i)}
                  wishIndex={i}
                  input={person.wishes[i].wish}
                />
              );
            })}
          </Box>
        )}
        <Grid item>
          {!ageWish && (
            <Button className={classes.hollowButton} variant="outlined" onClick={addWish}>
              Legg til gaveønske
            </Button>
          )}
        </Grid>
      </Container>
      <Box className={classes.deleteBox}>
        <IconButton color="primary" onClick={deletePerson}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormPerson;
