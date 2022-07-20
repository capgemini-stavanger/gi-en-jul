import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { useEffect } from "react";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: string) => void;
  deleteWish: () => void;
  wishIndex: number;
  required?: boolean;
  setIsValid?: (isValid: boolean) => void;
  input: string;
}

export interface IFormWish {
  id: string;
  wish: string;
}

export const getFormWish: () => IFormWish = () => ({
  id: Math.random().toString(),
  wish: "",
});

const initState: { [data: string]: any } = {
  wishInput: "",
  ageWish: false, //denne skal være i formPerson og hele formWish objektet skal ikke vises dersom den er true :P herlig
  size: "",
  location: "",
  specification: "",
  sizeDisabled: true,
  locationDisabled: true,
  totalWish: [],
};

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wishIndex,
  required,
  input,
  setIsValid,
}) => {
  const [state, setState] = useState({ ...initState });
  const [isValidInput, setIsValidInput] = useState(false);
  const classes = useStyles();
  const [isErr, setIsErr] = useState(false);
  const [viewError, setViewError] = useState(false);

  const getSetter = (target: keyof typeof state) => (value: typeof state[typeof target]) => {
    setState((prev) => {
      prev[target] = value;
      return prev;
    });
  };

  const getOnSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.totalWish[1] = e.target.value;
    getSetter("size")(state.totalWish[1]);
    updateWish(state.totalWish.toString());
  };

  const getOnLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.totalWish[1] = e.target.value;
    getSetter("location")(state.totalWish[1]);
    updateWish(state.totalWish.toString());
  };

  const getOnCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.totalWish[2] = e.target.value;
    getSetter("specification")(state.totalWish[2]);
    updateWish(state.totalWish.toString());
  };

  const onWishInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    state.totalWish[0] = newInput;
    updateWish(newInput);
    getSetter("wishInput")(newInput);
    handleCategoryChange(e);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "Klær" || e.target.value == "Sko") {
      getSetter("locationDisabled")(true);
      getSetter("sizeDisabled")(false);
    } else if (e.target.value == "Gavekort") {
      getSetter("sizeDisabled")(true);
      getSetter("locationDisabled")(false);
    } else {
      getSetter("sizeDisabled")(true);
      getSetter("locationDisabled")(true);
      state.totalWish[1] = "";
    }
  };

  useEffect(() => {
    setViewError(!!viewErrorTrigger);
  }, [viewErrorTrigger]);

  useEffect(() => {
    const isInvalid = !isValidInput;
    if (setIsValid) setIsValid(!isInvalid);
    setIsErr(!!required && viewError && isInvalid);
  }, [setIsValid, required, state.wishInput, isValidInput]);

  return (
    <Grid container direction="row" spacing={2} alignItems="center" className={classes.wishSpacing}>
      <Grid item>
        <Box className={classes.wishNumberCircle}>
          <Typography className={classes.wishNumber}>{wishIndex + 1}</Typography>
        </Box>
      </Grid>

      <Grid item>
        {!state.ageWish && (
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[
              (input) => {
                return !required || isNotNull(input);
              },
            ]}
            name="wish"
            type="select"
            label="Kategori"
            options={Categories.map((o: ICategories) => {
              return { value: o.type, text: o.type };
            })}
            disabled={state.ageWish}
            value={state.wishInput}
            onChange={(e) => onWishInputChange(e)}
            className={classes.mediumWidth}
            setIsValids={setIsValidInput}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        {!state.locationDisabled && (
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isNotNull]}
            onChange={(e) => getOnLocationInputChange(e)}
            disabled={state.locationDisabled}
            value={state.location}
            name="clocation"
            id="lokasjon"
            label="Lokasjon*"
            className={classes.mediumWidth}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        {!state.sizeDisabled && (
          <InputValidator
            viewErrorTrigger={viewErrorTrigger}
            validators={[isNotNull]}
            onChange={(e) => getOnSizeInputChange(e)}
            disabled={state.sizeDisabled}
            value={state.size}
            name="csize"
            id="størrelse"
            label="Størrelse*"
            className={classes.mediumWidth}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[]}
          onChange={(e) => getOnCommentInputChange(e)}
          value={state.specification}
          name="cspecification"
          id="spesifikasjon"
          label="Spesifikasjon"
          className={classes.mediumWidth}
        ></InputValidator>
      </Grid>

      <IconButton color="primary" onClick={deleteWish}>
        <SvgIcon component={ClearIcon} />
      </IconButton>
    </Grid>
  );
};
export default InstitutionWish;
