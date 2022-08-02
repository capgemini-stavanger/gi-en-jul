import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { IFormWish, TotalWish, WishCategory } from "./RegistrationFormTypes";

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

      {wishObj.category >= 0 && (
        <React.Fragment>
          {wishObj.category == WishCategory.Location && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="clocation"
                id="lokasjon"
                label="Sted *"
                placeholder="F.eks: et kjøpesenter eller en butikk"
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
                  placeholder={
                    wishObj.wish[TotalWish.Category] == "Sko"
                      ? "F.eks: vintersko eller fotballsko"
                      : "F.eks: blå genser eller vinterjakke"
                  }
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
                  placeholder={
                    wishObj.wish[TotalWish.Category] == "Sko" ? "F.eks: 42" : "F.eks: large"
                  }
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
                placeholder={
                  wishObj.wish[TotalWish.Category] == "Annet"
                    ? "F.eks: en feiekost"
                    : "F.eks: barbie eller lego"
                }
                value={wishObj.wish[TotalWish.LocationOrSpecification]}
                onChange={onSpecificationChange}
                fullWidth
              ></InputValidator>
            </Grid>
          )}
        </React.Fragment>
      )}
      <Grid item xs={1}>
        <IconButton size="small" onClick={deleteWish}>
          <SvgIcon className={classes.smallRedCross} component={ClearIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default InstitutionWish;
