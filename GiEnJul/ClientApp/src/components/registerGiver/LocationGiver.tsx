import * as React from "react";
import { Route } from "react-router-dom";
import useStyles from "./Styles";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import { Button, Grid, MenuItem, Container } from "@material-ui/core";
import IGiverInputs from "./IGiverInputs";
import { FAMILY_SIZES } from "../../common/constants/FamilySizes";
import LOCATIONS from "../../common/constants/Locations";

interface Props {
  nextStep: () => void;
  prevStep?: () => void;
  values: IGiverInputs;
  handleLocationChange: (event: any) => void;
  placeHolder: string;
}

const LocationGiver: React.FC<Props> = ({
  nextStep,
  prevStep,
  handleLocationChange,
  values,
  placeHolder,
}) => {
  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  };
  const classes = useStyles();

  if (prevStep) {
    const Previous = (e: any) => {
      e.preventDefault();
      prevStep();
    };

    return (
      <Container>
        <ValidatorForm
          onSubmit={Continue}
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
            value={values.maxRecivers ? values.maxRecivers : ""}
            onChange={handleLocationChange}
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
            justify="center"
            className={classes.submit}
          >
            <Grid item>
              <Button variant="contained" onClick={Previous}>
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
  }
  return (
    <Container>
      <ValidatorForm
        onSubmit={Continue}
        onError={(errors) => console.log(errors)}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <SelectValidator
          variant="outlined"
          fullWidth
          autoFocus
          placeholder={placeHolder}
          validators={["required"]}
          label="Lokasjon*"
          name="location-input"
          value={values.location ? values.location : ""}
          id="location-input"
          onChange={handleLocationChange}
          errorMessages={["Hvor vil du spre glede?"]}
        >
          {LOCATIONS.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </SelectValidator>
        <Grid container spacing={2} justify="center" className={classes.submit}>
          <Grid item>
            <Route
              render={({ history }) => (
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Tilbake
                </Button>
              )}
            />
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
export default LocationGiver;
