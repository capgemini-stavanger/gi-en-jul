import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useEffect, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { IFormWish, TotalWish, WishCategory } from "./RegistrationFormTypes";
import SuggestionPopover from "./SuggestionPopover";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: IFormWish) => void;
  deleteWish: () => void;
  wishObj: IFormWish;
  wishIndex: number;
}

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wishObj,
  wishIndex,
}) => {
  const classes = useStyles();

  const updateTotalWish = (totalWishIndex: number, newWish: string) => {
    const wishCopy = { ...wishObj };
    wishCopy.wish[totalWishIndex] = newWish;
    wishCopy.isValidWish = validateWish(wishCopy.wish);
    return wishCopy;
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.Category, updatedValue);
    const category = updatedWishList.wish[TotalWish.Category];
    if (category == "Gavekort") {
      updatedWishList.category = WishCategory.Location;
    } else if (category == "Sko" || category == "Klær") {
      updatedWishList.category = WishCategory.Size;
    } else {
      updatedWishList.category = WishCategory.Specifiction;
    }
    updateWish(updatedWishList);
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.LocationOrSpecification, updatedValue);
    updateWish(updatedWishList);
  };

  const onSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.LocationOrSpecification, updatedValue);
    updateWish(updatedWishList);
  };

  const onSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.Size, updatedValue);
    updateWish(updatedWishList);
  };

  const validateWish = (wish: string[]) => {
    const category = wish[TotalWish.Category];
    const specification = wish[TotalWish.LocationOrSpecification];
    const size = wish[TotalWish.Size];
    if (category == "Gavekort" || category == "Leker" || category == "Annet") {
      if (specification == "") {
        return false;
      }
      return true;
    } else if (category == "Sko" || category == "Klær") {
      if (specification == "" || size == "") {
        return false;
      }
      return true;
    } else {
      return false;
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
          value={wishObj.wish[TotalWish.Category]}
          onChange={onCategoryChange}
          fullWidth
        ></InputValidator>
      </Grid>

      {wishObj.category >= 0 ? (
        <React.Fragment>
          {wishObj.category == WishCategory.Location && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="clocation"
                id="lokasjon"
                label="Sted *"
                placeholder="HM eller Zara"
                value={wishObj.wish[TotalWish.LocationOrSpecification]}
                onChange={onLocationChange}
                fullWidth
              ></InputValidator>
            </Grid>
          )}
          {wishObj.category == WishCategory.Size && (
            <React.Fragment>
              <Grid item xs={5}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isNotNull]}
                  name="cspecification"
                  id="spesifikasjon"
                  label="Spesifikasjon *"
                  placeholder="Blå genser"
                  value={wishObj.wish[TotalWish.LocationOrSpecification]}
                  onChange={onSpecificationChange}
                  fullWidth
                ></InputValidator>
              </Grid>
              <Grid item xs={2}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isNotNull]}
                  name="csize"
                  id="størrelse"
                  label="Størrelse *"
                  placeholder="L / Large"
                  value={wishObj.wish[TotalWish.Size]}
                  onChange={onSizeChange}
                  fullWidth
                ></InputValidator>
              </Grid>
            </React.Fragment>
          )}
          {wishObj.category == WishCategory.Specifiction && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="cspecification"
                id="spesifikasjon"
                label="Spesifikasjon *"
                placeholder="Barbie eller Lego"
                value={wishObj.wish[TotalWish.LocationOrSpecification]}
                onChange={onSpecificationChange}
                fullWidth
              ></InputValidator>
            </Grid>
          )}
        </React.Fragment>
      ) : (
        <Grid item xs={2}>
          <SuggestionPopover
            wishObj={wishObj}
            updateWish={(wishObj) => {
              updateWish(wishObj);
            }}
          />
        </Grid>
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
