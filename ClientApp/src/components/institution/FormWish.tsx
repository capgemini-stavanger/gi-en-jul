import { Box, Grid, IconButton, SvgIcon, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { Categories, ICategories } from "./mockDatabase";
import React, { useEffect, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "./Styles";
import { TotalWish } from "./RegistrationFormTypes";

interface IWishProps {
  viewErrorTrigger: number;
  updateWish: (newWishData: string[], isValid: boolean) => void;
  deleteWish: () => void;
  wish: string[];
  wishIndex: number;
}

const InstitutionWish: React.FC<IWishProps> = ({
  viewErrorTrigger,
  updateWish,
  deleteWish,
  wish,
  wishIndex,
}) => {
  const classes = useStyles();

  const [totalWish, setTotalWish] = useState(["", "", ""]);
  const [categorySelected, setCategorySelected] = useState(false);
  const [sizeDisabled, setSizeDisabled] = useState(true);
  const [locationDisabled, setLocationDisabled] = useState(true);

  useEffect(() => {
    setTotalWish(wish);
    if (wish[TotalWish.Category] != "") {
      handleCategoryChange(wish[TotalWish.Category]);
    }
  }, []);

  const updateTotalWish = (totalWishIndex: number, wish: string) => {
    const newTotalWish = [...totalWish];
    newTotalWish[totalWishIndex] = wish;
    setTotalWish(newTotalWish);
    return newTotalWish;
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.Category, updatedValue);
    const validWishList = validateWish(updatedWishList);
    updateWish(updatedWishList, validWishList);
    handleCategoryChange(updatedValue);
  };

  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.LocationOrSpecification, updatedValue);
    const validWishList = validateWish(updatedWishList);
    updateWish(updatedWishList, validWishList);
  };

  const onSpecificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.LocationOrSpecification, updatedValue);
    const validWishList = validateWish(updatedWishList);
    updateWish(updatedWishList, validWishList);
  };

  const onSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    const updatedWishList = updateTotalWish(TotalWish.Size, updatedValue);
    const validWishList = validateWish(updatedWishList);
    updateWish(updatedWishList, validWishList);
  };

  const handleCategoryChange = (category: string) => {
    setCategorySelected(true);
    if (category == "Klær" || category == "Sko") {
      setLocationDisabled(true);
      setSizeDisabled(false);
    } else if (category == "Gavekort") {
      setSizeDisabled(true);
      setLocationDisabled(false);
    } else {
      setSizeDisabled(true);
      setLocationDisabled(true);
    }
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
          value={totalWish[TotalWish.Category]}
          onChange={onCategoryChange}
          fullWidth
        ></InputValidator>
      </Grid>

      {categorySelected && (
        <React.Fragment>
          {!locationDisabled && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="clocation"
                id="lokasjon"
                label="Sted *"
                placeholder="HM eller Zara"
                value={totalWish[TotalWish.LocationOrSpecification]}
                onChange={onLocationChange}
                fullWidth
              ></InputValidator>
            </Grid>
          )}
          {!sizeDisabled && (
            <React.Fragment>
              <Grid item xs={5}>
                <InputValidator
                  viewErrorTrigger={viewErrorTrigger}
                  validators={[isNotNull]}
                  name="cspecification"
                  id="spesifikasjon"
                  label="Spesifikasjon *"
                  placeholder="Blå genser"
                  value={totalWish[TotalWish.LocationOrSpecification]}
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
                  value={totalWish[TotalWish.Size]}
                  onChange={onSizeChange}
                  fullWidth
                ></InputValidator>
              </Grid>
            </React.Fragment>
          )}
          {locationDisabled && sizeDisabled && (
            <Grid item xs={7}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                validators={[isNotNull]}
                name="cspecification"
                id="spesifikasjon"
                label="Spesifikasjon *"
                placeholder="Barbie eller Lego"
                value={totalWish[TotalWish.LocationOrSpecification]}
                onChange={onSpecificationChange}
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
