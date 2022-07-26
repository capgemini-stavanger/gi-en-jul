import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import EventsContainer from "../Events/EventsContainer";
import MunicipalityContainer from "../Municipality/MunicipalityContainer";

interface Props {
  accessToken: string;
}

const AdminMunicipalityUserEvent: React.FC<Props> = ({ accessToken }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [events, setEvents] = useState([]);
  const fetchMunicipalities = () => {
    // get Municipalities
  };
  const fetchEvents = () => {
    // get Events
  };
  const fetchData = () => {
    fetchMunicipalities();
    fetchEvents();
  };
  useEffect(fetchData, []);
  return (
    <Grid container direction="column" spacing={10}>
      <Grid item>
        <MunicipalityContainer accessToken={accessToken} />
      </Grid>
      <Grid item>
        <Typography>Add-Users Placeholder</Typography>
      </Grid>
      <Grid item>
        <EventsContainer accessToken={accessToken} />
      </Grid>
    </Grid>
  );
};

export default AdminMunicipalityUserEvent;
