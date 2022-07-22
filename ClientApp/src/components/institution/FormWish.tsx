import { Box, Button, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useEffect, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { IFormWish } from "./RegistrationFormTypes";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: string) => void;
  deleteWish: () => void;
  wish: IFormWish;
  wishIndex: number;
}

const initState: { [data: string]: any } = {
  wishInput: "",
  size: "",
  location: "",
  specification: "",
  categorySelected: false,
  sizeDisabled: true,
  locationDisabled: true,
  totalWish: [],
};

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wish,
  wishIndex,
}) => {
  const [state, setState] = useState({ ...initState });
  const classes = useStyles();

  useEffect(() => {
    const wishSplit = wish.wish.split(",");
    wishSplit.map((field, index) => (state.totalWish[index] = field));
    console.log(wishSplit);
  }, []);

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
    console.log(state);
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
    getSetter("categorySelected")(true);
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

  return (
    <Grid container direction="row" spacing={2} alignItems="center" className={classes.wishSpacing}>
      <Grid item xs={1}>
        <Box className={classes.wishNumberCircle}>
          <Typography className={classes.wishNumber}>{wishIndex + 1}</Typography>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isNotNull]}
          name="wish"
          type="select"
          label="Kategori *"
          options={Categories.map((o: ICategories) => {
            return { value: o.type, text: o.type };
          })}
          disabled={state.ageWish}
          value={state.wishInput}
          onChange={(e) => onWishInputChange(e)}
          fullWidth
        ></InputValidator>
      </Grid>

      {state.categorySelected && (
        <React.Fragment>
          {!state.locationDisabled && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                onChange={(e) => getOnLocationInputChange(e)}
                disabled={state.locationDisabled}
                value={state.location}
                name="clocation"
                id="lokasjon"
                label="Sted *"
                placeholder="HM eller Zara"
                fullWidth
              ></InputValidator>
            </Grid>
          )}
          {!state.sizeDisabled && (
            <React.Fragment>
              <Grid item xs={5}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isNotNull]}
                  onChange={(e) => getOnCommentInputChange(e)}
                  value={state.specification}
                  name="cspecification"
                  id="spesifikasjon"
                  label="Spesifikasjon *"
                  placeholder="Blå genser"
                  fullWidth
                ></InputValidator>
              </Grid>
              <Grid item xs={2}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isNotNull]}
                  onChange={(e) => getOnSizeInputChange(e)}
                  disabled={state.sizeDisabled}
                  value={state.size}
                  name="csize"
                  id="størrelse"
                  label="Størrelse *"
                  placeholder="L / Large"
                  fullWidth
                ></InputValidator>
              </Grid>
            </React.Fragment>
          )}
          {state.locationDisabled && state.sizeDisabled && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                onChange={(e) => getOnCommentInputChange(e)}
                value={state.specification}
                name="cspecification"
                id="spesifikasjon"
                label="Spesifikasjon *"
                placeholder="Barbie eller Lego"
                fullWidth
              ></InputValidator>
            </Grid>
          )}
        </React.Fragment>
      )}

      <Grid item xs={1}>
        <IconButton color="primary" onClick={deleteWish}>
          <SvgIcon component={ClearIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default InstitutionWish;
