import { Divider, Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import EventsContainer from "../Events/EventsContainer";
import { Dto2EventContent, EventContent, EventContentDto } from "../Events/EventType";
import MunicipalityManageTable from "../Municipality/MunicipalityManageTable";

interface Props {
  accessToken: string;
}

const AdminMunicipalityUserEvent: React.FC<Props> = ({ accessToken }) => {
  const apiservice = new ApiService(accessToken);
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const [events, setEvents] = useState(new Map<string, EventContent>());
  const fetchMunicipalities = () => {
    apiservice
      .get("Municipality/names", {})
      .then((resp) => {
        setMunicipalities(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  const fetchEvents = () => {
    apiservice
      .get("Event/GetAll", {})
      .then((resp) => {
        const fetchedEvents = new Map<string, EventContent>();
        const eventContents = resp.data.map((event: EventContentDto) => Dto2EventContent(event));
        eventContents.forEach((event: EventContent) => {
          fetchedEvents.set(event.id, event);
        });
        setEvents(fetchedEvents);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  const fetchData = () => {
    fetchMunicipalities();
    fetchEvents();
  };
  useEffect(fetchData, []);
  return (
    <Grid container direction="column" spacing={10}>
      <Grid item>
        <Typography>Liste over kommuner</Typography>
        <MunicipalityManageTable accessToken={accessToken} refreshData={fetchData} />
      </Grid>
      <Divider />
      <Grid item>
        <EventsContainer
          accessToken={accessToken}
          refreshData={fetchData}
          existingMunicipalities={municipalities}
          pEvents={events}
        />
      </Grid>
    </Grid>
  );
};

export default AdminMunicipalityUserEvent;
