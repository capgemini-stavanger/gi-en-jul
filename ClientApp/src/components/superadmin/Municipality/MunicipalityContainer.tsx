import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useState, useEffect, ChangeEvent } from "react";
import MunicipalityInformation from "./MunicipalityInformation";

interface IMunicipalityContainer {
  accessToken: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const MunicipalityContainer: React.FC<IMunicipalityContainer> = ({ accessToken }) => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const apiservice = new ApiService(accessToken);
  const fetchActiveLocations = () => {
    apiservice
      .get("municipality/active", {})
      .then((resp) => {
        setActiveLocations(resp.data);
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
          <MunicipalityInformation accessToken={accessToken} location={selectedLocation} />
        </Grid>
      </Grid>
    </>
  );
};

export default MunicipalityContainer;
