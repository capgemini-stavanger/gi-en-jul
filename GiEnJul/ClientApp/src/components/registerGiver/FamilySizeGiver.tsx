import { Button, Container, Grid, MenuItem } from "@material-ui/core";
import * as React from "react";
import {
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";
import IGiverFormData from "./IGiverFormData";
import useStyles from "./Styles";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  values: IGiverFormData;
  handleFamilyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
}

const FamilySizeGiver: React.FC<Props> = ({
  nextStep,
  prevStep,
  values,
  handleFamilyChange,
  placeHolder,
}) => {
  const classes = useStyles();
  return (
    <Container>
      <ValidatorForm
        onSubmit={nextStep}
        onError={(errors) => console.log(errors)}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <SelectValidator
          variant="outlined"
          fullWidth
          autoFocus
          placeholder={placeHolder}
          validators={["required"]}
          name="familyType-input"
          value={values.maxReceivers ? values.maxReceivers : ""}
          onChange={handleFamilyChange}
          label="Familiesammensetning*"
          errorMessages={["Hvilken familie venter på din gave?"]}
        >
          {FAMILY_SIZES.map((familySize) => (
            <MenuItem key={familySize.text} value={familySize.value}>
              {familySize.text}
            </MenuItem>
          ))}
        </SelectValidator>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className={classes.submit}
        >
          <Grid item>
            <Button variant="contained" onClick={prevStep}>
              Tilbake
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Neste
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Container>
  );
};
export default FamilySizeGiver;
