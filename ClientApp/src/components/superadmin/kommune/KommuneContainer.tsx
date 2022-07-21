import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect, ChangeEvent } from "react";
import KommuneInformation from "./KommuneInformation";

interface IKommuneContainer {
  accessToken: string;
  assignedLocation: string;
  role: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const KommuneContainer: React.FC<IKommuneContainer> = ({ accessToken, assignedLocation, role }) => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const apiservice = new ApiService(accessToken);
  const fetchActiveLocations = () => {
    apiservice
      .get("municipality/active", {})
      .then((resp) => {
        if (role == "Admin") {
          setActiveLocations([assignedLocation]);
          setSelectedMunicipality(assignedLocation);
        } else {
          setActiveLocations(resp.data);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchActiveLocations, []);

  const handleChange = (event: ChangeEvent<IChangeEvent>) => {
    setSelectedMunicipality(event.target.value as string);
  };

  const menuItems = activeLocations.map((location, index) => {
    return (
      <MenuItem key={index} value={location}>
        {location}
      </MenuItem>
    );
  });

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Box width="250px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lokasjon</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedMunicipality}
                label="Location"
                onChange={handleChange}
                fullWidth
              >
                {menuItems}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          <KommuneInformation
            accessToken={accessToken}
            role={role}
            assignedLocation={assignedLocation}
            municipalityName={selectedMunicipality}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default KommuneContainer;
