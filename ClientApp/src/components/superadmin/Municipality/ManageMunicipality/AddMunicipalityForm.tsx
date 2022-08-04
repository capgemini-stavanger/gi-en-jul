import { Button, Dialog, Grid, Typography } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { isNotNull } from "components/shared/input-fields/validators/Validators";
import { useState } from "react";
import useStyles from "../../Styles";
import { IMunicipality, initInterfaceMunicipality } from "../ManageMunicipalityContainer";

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddMunicipality: (data: IMunicipality) => void;
}

const MunicipalityForm: React.FC<props> = ({ open, setOpen, handleAddMunicipality }) => {
  const [newMunicipality, setNewMunicipality] = useState<IMunicipality>(initInterfaceMunicipality);
  const classes = useStyles();

  return (
    <>
      <Dialog open={open} className={classes.dialogBox} fullWidth>
        <Typography
          style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "10px", fontWeight: "600" }}
        >
          Legg til ny kommune
        </Typography>

        <Grid
          style={{ marginLeft: "40px", width: "350px" }}
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          <Grid item>
            <InputValidator
              autoFocus
              label="Land*"
              margin="normal"
              fullWidth
              name="country"
              disabled={true}
              autoComplete="Country"
              value={newMunicipality.country}
              onChange={(e) => {
                setNewMunicipality((o) => ({ ...o, country: e.target.value }));
              }}
              validators={[isNotNull]}
              errorMessages={["Du må fylle inn landet kommunen ligger i"]}
            />
          </Grid>

          <Grid item>
            <InputValidator
              autoFocus
              label="Kommune navn*"
              margin="normal"
              fullWidth
              name="name"
              autoComplete="Name"
              value={newMunicipality.name}
              onChange={(e) => {
                setNewMunicipality((o) => ({ ...o, name: e.target.value }));
              }}
              validators={[isNotNull]}
              errorMessages={["Du må fylle inn navnet på kommunen"]}
            />
          </Grid>

          <Grid style={{ marginBottom: "10px" }} container direction="row">
            <Grid item>
              <Button
                className={classes.buttonError}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Avbryt
              </Button>
            </Grid>

            <Grid item>
              <Button
                className={classes.button}
                onClick={() => {
                  {
                    handleAddMunicipality({
                      ...newMunicipality,
                      information: "Det er ingen informasjon om kommunen enda",
                    });
                    setNewMunicipality(initInterfaceMunicipality);
                    setOpen(false);
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
