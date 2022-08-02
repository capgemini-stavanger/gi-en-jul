import {
  capitalize,
  Grid,
  IconButton,
  Button,
  Box,
  Container,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { FC } from "react";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isInt } from "components/shared/input-fields/validators/Validators";
import useStyles from "./Styles";
import FormWish from "./FormWish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CancelIcon from "@material-ui/icons/Cancel";
import { IFormPerson, IFormWish, getFormWish } from "./RegistrationFormTypes";
import CustomTooltip from "./CustomTooltip";

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

  const onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let strAge = e.target.value;
    const intAge = Math.floor(parseInt(strAge));
    let isValidAge = false;
    strAge = intAge.toString();
    if (intAge !== NaN) {
      if (intAge > 130) {
        strAge = "130";
      } else if (intAge < 0) {
        strAge = "0";
      }
      isValidAge = true;
    } else {
      return;
    }
    if (intAge >= 1) {
      person.months = "1";
    }
    updatePerson({ age: strAge, isValidAge: isValidAge });
  };

  const onMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let strMonths = e.target.value;
    const intMonths = Math.floor(parseInt(strMonths));
    strMonths = intMonths.toString();
    if (intMonths !== NaN) {
      if (intMonths > 11) {
        strMonths = "11";
      } else if (intMonths < 1) {
        strMonths = "1";
      }
    } else {
      return;
    }
    updatePerson({ months: strMonths });
  };

  const handleAgeWishChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeWish(e.target.checked);
    setShowWishes(!e.target.checked);
    updatePerson({ noWish: e.target.checked });
  };

  const onGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = parseInt(e.target.value);
    if (newGender !== NaN && newGender !== Gender.Unspecified) {
      updatePerson({ gender: newGender, isValidGender: true });
    }
  };

  const updateWish = (newWishData: IFormWish, index: number) => {
    const newList = [...person.wishes];
    newList[index] = newWishData;
    updatePerson({ wishes: newList });
  };

  const deleteWish = (index: number) => {
    if (person.wishes.length > 1) {
      const newList = [...person.wishes];
      const head = newList.slice(0, index);
      const tail = newList.slice(index + 1, newList.length);
      const newWishList = head.concat(tail);
      person.wishes = newWishList;
      updatePerson({ wishes: newWishList });
    }
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
            <Grid item xs={2}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isInt]}
                name="age"
                type="number"
                label="Alder"
                value={person.age || "0"}
                onChange={onAgeChange}
                fullWidth
              />
            </Grid>
            {parseInt(person.age) == 0 && (
              <Grid item xs={2}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isInt]}
                  name="months"
                  type="number"
                  label="Måneder"
                  value={person.months || "0"}
                  onChange={onMonthsChange}
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="gender"
                type="select"
                label="Kjønn *"
                variant={"outlined"}
                value={person.gender ? person.gender : ""}
                onChange={onGenderChange}
                options={GENDERS.map((o) => {
                  return { value: o.value, text: capitalize(o.text) };
                })}
                fullWidth
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
              <CustomTooltip
                iconType={false}
                content="Om alderstilpasset gave er huket av, kan giveren selv finne gave til personen."
              />
            </Grid>

            {!ageWish && (
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
            )}
          </Grid>
        </Box>
        {showWishes && (
          <Box className={classes.formBoxWishes}>
            {person.wishes.map((wish: IFormWish, i: number) => {
              return (
                <FormWish
                  key={i}
                  viewErrorTrigger={viewErrorTrigger}
                  updateWish={(wishObj) => {
                    updateWish(wishObj, i);
                  }}
                  deleteWish={() => deleteWish(i)}
                  wishObj={wish}
                  wishIndex={i}
                />
              );
            })}
            <Button className={classes.hollowButton} variant="outlined" onClick={addWish}>
              Legg til gaveønske
            </Button>
          </Box>
        )}
      </Container>
      <Box className={classes.deleteBox}>
        <IconButton onClick={deletePerson}>
          <CancelIcon className={classes.redCross} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormPerson;
