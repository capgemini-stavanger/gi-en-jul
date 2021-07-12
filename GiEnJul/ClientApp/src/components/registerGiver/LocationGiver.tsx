import * as React from "react";
import { Route } from "react-router-dom";
import useStyles from "./Styles";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import { Button, Grid, MenuItem, Container } from "@material-ui/core";
import IGiverFormData from "./IGiverFormData";
import LOCATIONS from "../../common/constants/Locations";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  values: IGiverFormData;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
}

const LocationGiver: React.FC<Props> = ({
  nextStep,
  values,
  handleLocationChange,
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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className={classes.submit}
        >
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
