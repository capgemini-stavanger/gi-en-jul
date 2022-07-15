import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import CustomTooltip from "components/institution/CustomTooltip";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "reactstrap";
import AddMunicipalityForm, {
  getFormAddMunicipality,
  IMunicipalityFormData,
} from "./AddMunicipalityForm";
import ConfirmationBox from "components/shared/confirmationBox";
import InformationBox from "components/shared/InformationBox";

interface props {
  accessToken: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const initFormDataState: () => IMunicipalityFormData = () => ({
  ...getFormAddMunicipality(),
});

const MunicipalityContainer: React.FC<props> = ({ accessToken }) => {
  const [activeLocations, setActiveLocations] = useState<string[]>([]);
  const [allLocations, setLocations] = useState<string[]>([]);
  const [selectedLocationActive, setSelectedLocationActive] = useState<string>("");
  const [selectedLocationAll, setSelectedLocationAll] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [formDataState] = useState(initFormDataState());
  const [Country] = useState<string>("Norge");
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

  const addMunicipality = (data: IMunicipalityFormData) => {
    apiservice
      .post("municipality", {
        Country: data.country,
        Name: data.name,
        IsActive: "false",
      })
      .then(() => {
        fetchActiveLocations();
        fetchAllLocations();
        setOpenAdd(true);
      });

    setOpen(false);
  };

  const deleteMunicipality = () => {
    apiservice.delete("municipality", { Country: Country, Name: selectedLocationAll }).then(() => {
      fetchActiveLocations();
      fetchAllLocations();
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

  const handleResponseConfirm = (response: boolean) => {
    if (response) {
      deleteMunicipality();
    }
    handleCloseConfirm(true);
  };

  const handleCloseConfirm = (response: boolean) => {
    if (response) {
      setOpenConfirm(false);
    }
  };

  const handleCloseAdd = (response: boolean) => {
    if (response) {
      setOpenAdd(false);
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={5}>
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
          <Box width="250px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Velg kommune du vil slette</InputLabel>
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
          <Button
            onClick={() => {
              deleteMunicipality;
              setOpenConfirm(true);
            }}
          >
            Slett
          </Button>
        </Grid>
        <ConfirmationBox
          open={openConfirm}
          text={"Er du sikker på at du vil slette denne kommunen?"}
          handleClose={() => {
            handleCloseConfirm(false);
          }}
          handleResponse={handleResponseConfirm}
        />

        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Legg til ny kommune
          </Button>

          <InformationBox
            open={openAdd}
            text={"Kommunen har blitt lagt til"}
            handleClose={() => handleCloseAdd(true)}
          />

          <AddMunicipalityForm
            key={formDataState.name}
            values={formDataState}
            open={open}
            handleClose={() => setOpen(false)}
            handleAddMunicipality={(data: IMunicipalityFormData) => addMunicipality(data)}
            openAdd={openAdd}
            handleOpenAdd={() => setOpenAdd(openAdd)}
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
