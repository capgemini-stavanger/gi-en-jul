import { Button, Dialog, Grid, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { useState } from "react";
import useStyles from "../Styles";

export interface IMunicipalityFormData {
  country: string;
  name: string;
  image?: string;
  info?: string;
  email?: string;
  isActive: boolean;
}

export const getFormAddMunicipality: () => IMunicipalityFormData = () => ({
  country: "",
  name: "",
  image: "",
  info: "",
  email: "",
  isActive: false,
});

interface props {
  values: IMunicipalityFormData;
  open: boolean;
  openAdd: boolean;

  handleClose: () => void;
  handleAddMunicipality: (data: IMunicipalityFormData) => void;
  handleOpenAdd: (response: boolean) => void;
}

const initState: IMunicipalityFormData = {
  country: "Norge",
  name: "",
  image: undefined,
  info: undefined,
  email: undefined,
  isActive: false,
};

const MunicipalityForm: React.FC<props> = ({
  open,
  openAdd,
  handleOpenAdd,
  handleClose,
  handleAddMunicipality,
}) => {
  const [state, setState] = useState(initState);

  const classes = useStyles();

  return (
    <>
      <Dialog open={open} className={classes.dialogBox} fullWidth>
        <Typography>Legg til ny kommune</Typography>

        <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
          <Grid item>
            <InputValidator
              autoFocus
              label="Land*"
              margin="normal"
              fullWidth
              name="country"
              autoComplete="Country"
              value={state.country}
              onChange={(e) => {
                setState((prev) => ({ ...prev, country: e.target.value }));
              }}
              validators={[isNotNull]}
              errorMessages={["Du må fylle inn landet kommunen ligger i"]}
            />
          </Grid>

          <Grid item>
            <InputValidator
              autoFocus
              label="Navn*"
              margin="normal"
              fullWidth
              name="name"
              autoComplete="Name"
              value={state.name}
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }));
              }}
              validators={[isNotNull]}
              errorMessages={["Du må fylle inn navnet på kommunen"]}
            />
          </Grid>

          <Grid container direction="row">
            <Grid item>
              <Button onClick={handleClose}>Avbryt</Button>
            </Grid>

            <Grid item>
              <Button
                onClick={() => {
                  {
                    handleAddMunicipality(state);
                    setState(initState);
                    handleOpenAdd(openAdd);
                  }
                }}
              >
                Lagre
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default MunicipalityForm;
