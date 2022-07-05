import { Checkbox, FormControlLabel, Grid, IconButton, SvgIcon } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";

export interface IFormWish {
  cat: string;
  size?: string;
}

interface IWishProps {
  cat: string;
  viewErrorTrigger: number;
  updateWish: (newWishData: { [target: string]: unknown }) => void;
  deleteWish: () => void;
}

const initState: { [data: string]: any } = {
  wishInput: "",
  ageWish: false,
};

export const getFormWish: () => IFormWish = () => ({
  cat: "",
});

const InstitutionWish: React.FC<IWishProps> = ({ viewErrorTrigger, updateWish, deleteWish }) => {
  const [state, setState] = useState({ ...initState });

  const getSetter = (target: keyof typeof state) => (value: typeof state[typeof target]) => {
    setState((prev) => {
      prev[target] = value;
      return prev;
    });
  };

  const onWishInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    getSetter("wishInput")(newInput);
    updateWish({ wish: newInput });
  };

  const onAgeWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.checked;
    getSetter("ageWish")(newInput);
    updateWish({ wish: undefined });
  };

  return (
    <Grid container spacing={6} alignItems="center">
      <Grid item>
        <IconButton color="secondary" onClick={deleteWish}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>

      {!state.ageWish && (
        <Grid item xs={1}>
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isNotNull]}
            name="wish"
            type="select"
            label="gaveønske"
            options={Categories.map((o: ICategories) => {
              return { value: o.type, text: o.type };
            })}
            disabled={state.ageWish}
            value={state.wishInput}
            onChange={onWishInputChange}
            fullWidth
          ></InputValidator>
        </Grid>
      )}
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
