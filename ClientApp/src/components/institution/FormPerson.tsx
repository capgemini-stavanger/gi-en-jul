import { capitalize, Link, Grid, SvgIcon, IconButton, Typography, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull, isInt } from "components/shared/input-fields/validators/Validators";
import IFormPerson from "components/institution/IFormPerson";
import MessageDialog from "components/institution/MessageDialog";
import FormWish, { getFormWish, IFormWish } from "./FormWish";

interface IPersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  updatePersonWish: (newWishData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  setAlert: (
    open?: boolean,
    message?: string,
    severity?: "error" | "info" | "success" | "warning"
  ) => void;
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

const InstitutionPerson: FC<IPersonProps> = ({
  updatePerson,
  updatePersonWish,
  deletePerson,
  setAlert,
  viewErrorTrigger,
  person,
}) => {
  const [state, setState] = useState({ ...initState });

  const setShowMessageDialog = (show: boolean) => {
    setState((prev) => ({
      ...prev,
      dialogOpen: show,
    }));
  };

  const setValidMessage = (message: string) => {
    setState((prev) => ({
      ...prev,
      comment: message,
    }));
    getSetter("comment")(message);
    updatePerson({ comment: message });
  };

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
    newList[index].cat = newWishData.wish + "";
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
    if (newList.length >= 5) return;
    newList.push(getFormWish());
    updatePersonWish({ wishes: newList });
  };

  return (
    <Grid container spacing={5} alignItems="center" direction="row">
      <Grid item>
        <IconButton color="secondary" onClick={deletePerson}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>

      <Grid item xs={1}>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isInt]}
          name="age"
          type="number"
          label="Alder"
          value={person.age || "0"}
          onChange={onAgeChange}
        />
      </Grid>
      {(parseInt(person.age) < 1 || !person.age) && (
        <Grid item xs={1}>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isInt]}
            name="months"
            type="number"
            label="Måneder"
            value={person.months || "0"}
            onChange={onMonthsChange}
          />
        </Grid>
      )}
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

      {person.wishes.map((wish: IFormWish, i: number) => {
        return (
          <FormWish
            key={wish.id}
            cat={wish.cat}
            viewErrorTrigger={state.viewErrorTrigger}
            updateWish={(wish) => {
              updateWish(wish, i);
            }}
            deleteWish={() => deleteWish(i)}
          />
        );
      })}

      <Grid item>
        <Button
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          }
          variant="contained"
          color="primary"
          onClick={addWish}
        >
          Legg til gaveønske for denne personen
        </Button>
      </Grid>

      <Grid item xs={2}>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowMessageDialog(true);
          }}
        >
          {(person.comment.length == 0 && (
            <Typography>Legg til en kommentar for denne personen</Typography>
          )) || <Typography>Se/endre kommentaren for denne personen</Typography>}
        </Link>
      </Grid>
      <Grid>
        <MessageDialog
          open={state.dialogOpen}
          onClose={() => setShowMessageDialog(false)}
          setMessage={setValidMessage}
          message={person.comment}
          setAlert={setAlert}
        />
      </Grid>
    </Grid>
  );
};

export default InstitutionPerson;
