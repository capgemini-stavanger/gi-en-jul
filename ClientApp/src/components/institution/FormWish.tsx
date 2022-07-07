import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  SvgIcon,
  withStyles,
} from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { v4 as uuidv4 } from "uuid";
import IFormPerson from "./IFormPerson";

export interface IFormWish {
  //  uuid?: string;
  cat: string;
  size?: string;
}

interface IWishProps {
  cat: string;
  viewErrorTrigger: number;
  updateWish: (newWishData: { [target: string]: unknown }) => void;
  deleteWish: () => void;
  person: IFormPerson;
  // wishes: IFormWish[];
}

const initState: { [data: string]: any } = {
  wishInput: "",
  ageWish: false,
  wishList: [],
};

export const getFormWish: () => IFormWish = () => ({
  cat: "",
});

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  person,
}) => {
  const [state, setState] = useState({ ...initState });

  const getSetter = (target: keyof typeof state) => (value: typeof state[typeof target]) => {
    setState((prev) => {
      prev[target] = value;
      return prev;
    });
  };

  const onWishInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    getSetter("wish")(newInput);
    updateWish({ wish: newInput });
    console.log(person.wishes);
    addToWishArray({ cat: newInput });
    console.log(person.wishes);
    console.log(newInput);
  };

  const onAgeWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.checked;
    getSetter("ageWish")(newInput);
    updateWish({ wish: newInput });
  };

  const addToWishArray = (wish: IFormWish) => {
    const newWishList = state.wishList.push(wish); //wishList inneholder tallet 2?
    person.wishes = newWishList;
    console.log("wishList:", newWishList.toString());
    return { newWishList };
  };

  return (
    <Grid container spacing={6} alignItems="center" direction="row">
      <Grid item>
        {person.wishes.map((wish, i) => {
          return (
            <IconButton color="secondary" onClick={deleteWish} key={i}>
              <SvgIcon component={ClearIcon} />
            </IconButton>
          );
        })}
      </Grid>
      <Grid item xs={1}>
        {!state.ageWish &&
          person.wishes.map((wish, i) => {
            //må legge ønsket til i wishes og sende hele arrayet til parent update person
            return (
              //     <Grid item xs={1}>
              <InputValidator
                key={i}
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="wish"
                type="select"
                label="gaveønske"
                options={Categories.map((o: ICategories) => {
                  return { value: o.type, text: o.type };
                })}
                disabled={state.ageWish}
                //   value={state.wishInput}
                value={state.wishInput}
                onChange={onWishInputChange}
                fullWidth
              ></InputValidator>
              //      </Grid>
            );
          })}
      </Grid>
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
    </Grid>
  );
};
export default InstitutionWish;
