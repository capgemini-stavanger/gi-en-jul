import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: string) => void;
  deleteWish: () => void;
  wishIndex: number;
  updateSize: (newSizeData: string) => void;
  updateComment: (newCommentData: string) => void;
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
  comment: "",
  sizeDisabled: true,
  locationDisabled: true,
  totalWish: [],
};

//const ageAppropriateString = "Giver kjøper alderstilpasset gave";

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wishIndex,
  updateSize,
  updateComment,
}) => {
  const [state, setState] = useState({ ...initState });

  const classes = useStyles();

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
    getSetter("comment")(state.totalWish[2]);
    updateWish(state.totalWish.toString());
  };
  /*
  const onAgeWishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.checked ? ageAppropriateString : state.wishInput;
    updateWish(newInput);
    getSetter("ageWish")(e.target.checked);
  };
  */

  const onSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    updateSize(newInput);
    getSetter("size")(newInput);
  };

  const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    updateComment(newInput);
    getSetter("comment")(newInput);
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
            validators={[isNotNull]}
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
            label="Lokasjon"
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
            label="Størrelse"
            className={classes.mediumWidth}
          ></InputValidator>
        )}
      </Grid>

      <Grid item>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[]}
          onChange={(e) => getOnCommentInputChange(e)}
          value={state.comment}
          name="ccomment"
          id="kommentar"
          label="Kommentar"
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
