import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";

export interface IFormWish {
  wish: string;
}

interface IWishProps {
  wish: string;
  viewErrorTrigger: number;
  updateWish: (newWishData: { [target: string]: unknown }) => void;
  deleteWish: () => void;
  wishIndex: number;
}

const initState: { [data: string]: any } = {
  wishInput: "",
  ageWish: false,
  wishList: [],
};

export const getFormWish: () => IFormWish = () => ({
  wish: "",
});

const ageAppropriateString = "Giver kjøper alderstilpasset gave";

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wishIndex,
}) => {
  const [state, setState] = useState({ ...initState });

  const classes = useStyles();

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
    const newInput = e.target.checked ? ageAppropriateString : state.wishInput;
    getSetter("ageWish")(e.target.checked);
    updateWish({ wish: newInput });
  };

  return (
    <Grid container direction="row" spacing={2} alignItems="center" className={classes.wishSpacing}>
      <Grid item>
        <Box className={classes.wishNumberCircle}>
          <Typography className={classes.wishNumber}>{wishIndex + 1}</Typography>
        </Box>
      </Grid>
      <Grid item>
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
      <Grid item>
        {!state.ageWish && (
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isNotNull]}
            name="wish"
            type="select"
            label="Gaveønske"
            options={Categories.map((o: ICategories) => {
              return { value: o.type, text: o.type };
            })}
            disabled={state.ageWish}
            value={state.wishInput}
            onChange={(e) => onWishInputChange(e)}
            className={classes.mediumWidth}
          ></InputValidator>
        )}
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={deleteWish}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default InstitutionWish;
