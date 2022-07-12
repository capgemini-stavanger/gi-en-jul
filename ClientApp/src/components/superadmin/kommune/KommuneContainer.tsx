import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect, ChangeEvent } from "react";
import MunicipalityInformation from "../Municipality/MunicipalityInformation";
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
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const apiservice = new ApiService(accessToken);
  const fetchActiveLocations = () => {
    apiservice
      .get("Event/ActiveLocations", {})
      .then((resp) => {
        if (role == "Admin") {
          setActiveLocations([assignedLocation]);
          setSelectedLocation(assignedLocation);
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
    setSelectedLocation(event.target.value as string);
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
                value={selectedLocation}
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
            location={selectedLocation}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default KommuneContainer;
