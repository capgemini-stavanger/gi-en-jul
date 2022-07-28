import { Box, FormControl, Grid } from "@material-ui/core";
import SelectForm from "components/shared/input-fields/SelectForm";
import { useState } from "react";
import { IMunicipality, initInterfaceMunicipality } from "../ManageMunicipalityContainer";
import MunicipalityInformation from "./MunicipalityInformation";

interface IMunicipalityInformationContainer {
  assignedLocation: string;
  role: string;
  municipalities: IMunicipality[];
  updateMunicipalityInformation: (municipality: IMunicipality) => void;
  deleteMunicipalityInformation: (municipality: IMunicipality) => void;
}

const MunicipalityInformationContainer: React.FC<IMunicipalityInformationContainer> = ({
  role,
  municipalities,
  updateMunicipalityInformation,
  deleteMunicipalityInformation,
}) => {
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<IMunicipality>(initInterfaceMunicipality);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Box width="250px">
            <FormControl fullWidth>
              <SelectForm
                name="Kommune"
                variant="outlined"
                label="Velg kommune"
                value={selectedMunicipality.name}
                options={municipalities.map((o) => {
                  return { value: o.name, text: o.name };
                })}
                onChange={(e) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  setSelectedMunicipality(municipalities.find((m) => m.name === e.target.value)!);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          <MunicipalityInformation
            role={role}
            municipality={selectedMunicipality}
            setSelectedMunicipality={setSelectedMunicipality}
            updateMunicipalityInformation={updateMunicipalityInformation}
            deleteMunicipalityInformation={deleteMunicipalityInformation}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MunicipalityInformationContainer;
