import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { IFormWish, TotalWish, WishCategory } from "./RegistrationFormTypes";
import useIsMobile from "hooks/useIsMobile";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: IFormWish) => void;
  deleteWish: () => void;
  wishObj: IFormWish;
  wishIndex: number;
  personIndex: number;
}

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wishObj,
  wishIndex,
  personIndex,
}) => {
  const classes = useStyles();
  const isMobile = useIsMobile();

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

  const numberGridElement = isMobile ? (
    <Grid item xs={12}>
      <Typography color="primary">Ønske nr {wishIndex + 1}</Typography>
    </Grid>
  ) : (
    <Grid item xs={1}>
      <Box className={classes.wishNumberCircle}>
        <Typography className={classes.wishNumber}>{wishIndex + 1}</Typography>
      </Box>
    </Grid>
  );

  return (
    <Grid
      container
      direction="row"
      spacing={isMobile ? 1 : 2}
      alignItems="center"
      className={isMobile ? classes.wishSpacingMobile : classes.wishSpacing}
    >
      {numberGridElement}
      <Grid item xs={isMobile ? 8 : 3}>
        <InputValidator
          viewErrorTrigger={viewErrorTrigger}
          validators={[isNotNull]}
          id={`wish-category-number-${personIndex}-${wishIndex}`}
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
            <Grid item xs={isMobile ? 8 : 7}>
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
              <Grid item xs={isMobile ? 4 : 2}>
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
              <Grid item xs={isMobile ? 8 : 5}>
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
            </React.Fragment>
          )}
          {wishObj.category == WishCategory.Specifiction && (
            <Grid item xs={isMobile ? 8 : 7}>
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
        <IconButton size="small" onClick={deleteWish} aria-label="slett ønske">
          <SvgIcon className={classes.smallRedCross} component={ClearIcon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default InstitutionWish;
