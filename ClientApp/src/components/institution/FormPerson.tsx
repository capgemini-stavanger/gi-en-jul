import {
  capitalize,
  Checkbox,
  Link,
  FormControlLabel,
  Grid,
  SvgIcon,
  IconButton,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { GENDERS } from "../../common/constants/Genders";
import Gender from "../../common/enums/Gender";
import InputValidator from "../InputFields/Validators/InputValidator";
import { isNotNull, isInt } from "../InputFields/Validators/Validators";
import IFormPerson from "./IFormPerson";
import MessageDialog from "./MessageDialog";


interface IPersonProps {
  updatePerson: (newPersonData: { [target: string]: unknown }) => void;
  deletePerson: () => void;
  setAlert: (open?: boolean, message?:string, severity?:"error" | "info" | "success" | "warning") => void;
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
};

const InstitutionPerson: FC<IPersonProps> = ({
  updatePerson,
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
    let intAge = Math.floor(parseInt(strAge));
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
    let intMonths = Math.floor(parseInt(strMonths));
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
    <Grid container spacing={5} alignItems="center">
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
      {(parseInt(person.age) < 1 || !person.age) &&
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
}
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
      { !state.ageWish &&
      <Grid item xs={2}>
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
}
      <Grid item xs={2}>
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
      <Grid item xs={2}>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setShowMessageDialog(true);
        }}
      >
        { person.comment.length == 0 &&
        <Typography>
          Legg til en kommentar for denne personen
        </Typography> ||
        <Typography>
          Se/endre kommentaren for denne personen
        </Typography>
        }
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