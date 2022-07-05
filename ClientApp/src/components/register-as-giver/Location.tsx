import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import IFormData from "./IFormData";
import Pager from "./Pager";
import useStyles from "./Styles";

interface Props {
  nextStep: (event: React.FormEvent) => void;
  prevStep: (event: React.FormEvent) => void;
  values: IFormData;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeHolder: string;
  locationOptions: string[];
  step: number;
}
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />;

const Location: React.FC<Props> = ({
  nextStep,
  prevStep,
  values,
  handleLocationChange,
  placeHolder,
  locationOptions,
  step,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [viewErrorTrigger, setViewErrorTrigger] = useState(0);

  const extendedNextStep = (e: React.FormEvent) => {
    if (!isValid) {
      return setViewErrorTrigger((prev) => prev + 1);
    }
    nextStep(e);
  };
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.subHeading}>Hvor vil du gi?</Typography>
      <Typography className={classes.infoText}>Velg hvor du ønsker å Gi en jul </Typography>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.form}
        >
          <Grid item>
            <form onSubmit={nextStep} onError={(errors) => console.error(errors)}>
              <InputValidator
                viewErrorTrigger={viewErrorTrigger}
                type="select"
                fullWidth
                placeholder={placeHolder}
                validators={[isNotNull]}
                label="Lokasjon*"
                name="location-input"
                value={values.location}
                id="location-input"
                onChange={handleLocationChange}
                errorMessages={["Hvor vil du spre glede?"]}
                setIsValids={[setIsValid]}
                options={
                  locationOptions.length !== 0
                    ? locationOptions.map((loc) => ({ value: loc, text: loc }))
                    : [{ value: "", text: "Ingen lokasjoner" }]
                }
              />
            </form>
          </Grid>
          <Grid item>
            <Pager
              onBack={prevStep}
              onContinue={extendedNextStep}
              continueText={"Neste Steg"}
              step={step}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Location;
