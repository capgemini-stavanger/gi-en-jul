import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { PersonalVideo } from "@material-ui/icons";
import ApiService from "common/functions/apiServiceClass";
import CustomTooltip from "components/institution/CustomTooltip";
import { initValidFormState } from "components/institution/NewDesign/RegistrationFormTypes";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "reactstrap";
import AddMunicipalityForm, {
  getFormAddMunicipality,
  IMunicipalityFormData,
} from "./AddMunicipalityForm";

interface props {
  accessToken: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const initState = {
  viewErrorTrigger: 0,
};

interface IAddMunicipalityState {
  values: IMunicipalityFormData;
}

const initFormDataState: () => IAddMunicipalityState = () => ({
  values: getFormAddMunicipality(),
});

const MunicipalityContainer: React.FC<props> = ({ accessToken }) => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [allLocations, setLocations] = useState<string[]>([]);
  const [selectedLocationActive, setSelectedLocationActive] = useState<string>("");
  const [selectedLocationAll, setSelectedLocationAll] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [formDataState] = useState(initFormDataState());
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

  const fetchAllLocations = () => {
    apiservice
      .get("municipality/names", {})
      .then((resp) => {
        setLocations(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  useEffect(fetchAllLocations, []);

  const addMunicipality = (data: any) => {
    apiservice.put("municipality", {
      Country: data.country,
      Name: data.name,
      IsActive: "true",
    });
    setOpen(false);
  };

  const handleChangeActive = (event: ChangeEvent<IChangeEvent>) => {
    setSelectedLocationActive(event.target.value as string);
  };

  const handleChangeAll = (event: ChangeEvent<IChangeEvent>) => {
    setSelectedLocationAll(event.target.value as string);
  };

  const itemsActive = activeLocations.map((location, index) => {
    return (
      <MenuItem key={index} value={location}>
        {location}
      </MenuItem>
    );
  });

  const itemsAll = allLocations.map((location, index) => {
    return (
      <MenuItem key={index} value={location}>
        {location}
      </MenuItem>
    );
  });

  return (
    <>
      <Grid container direction="row">
        <Grid item>
          <Box width="250px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Alle Kommuner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedLocationAll}
                label="Location"
                onChange={handleChangeAll}
                fullWidth
              >
                {itemsAll}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item>
          <Box width="250px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Aktive kommuner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedLocationActive}
                label="Location"
                onChange={handleChangeActive}
                fullWidth
              >
                {itemsActive}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Legg til ny kommune
          </Button>

          <AddMunicipalityForm
            key={formDataState.values.name}
            values={formDataState.values}
            open={open}
            handleClose={() => setOpen(false)}
            handleAddMunicipality={(data: any) => addMunicipality(data)}
          />

          <CustomTooltip
            iconType={true}
            content={
              "Den nye kommunen blir ikke aktiv før du legger til ett arrangement på kommunen."
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MunicipalityContainer;

//TO-DO:
/*
- knapp for slett valgt kommune + api delete metode frontend 
- rediger kommune: info gjøres i informasjonskomponenten. Skal noe annet endres er det isåfall: isActive, Image, email, country? 
- legg til email i table 
- flytt rediger informasjon med teksteditor til denne tab/pagen. 


*/
