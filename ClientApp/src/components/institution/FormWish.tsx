import { Grid, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import { useState } from "react";

interface IFormWish {
  cat: string;
  size?: string;
}

interface IWishProps {
  // wish: IFormWish;
  viewErrorTrigger: number;
  updateWish: (newWishData: { [target: string]: unknown }) => void;
}

const initState: { [data: string]: any } = {
  wishInput: "",
  ageWish: false,
};

const InstitutionWish: React.FC<IWishProps> = ({ viewErrorTrigger, updateWish }) => {
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

  return (
    <Grid>
      {!state.ageWish && (
        <Grid item>
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
    </Grid>
  );
};
export default InstitutionWish;
