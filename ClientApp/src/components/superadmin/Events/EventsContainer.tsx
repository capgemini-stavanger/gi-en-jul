import { Grid } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import { EventContent } from "components/superadmin/Events/EventInformation";

interface Props {
  accessToken: string;
}

const EventsContainer: React.FC<Props> = ({ accessToken }) => {
  const [events, setEvents] = useState<EventContent[]>([]);
  const [eventBody, setEventBody] = useState<JSX.Element[]>([]);
  const apiservice = new ApiService(accessToken);
  const fetchEvents = () => {
    apiservice
      .get("Event/GetAll", {})
      .then((resp) => {
        setEvents(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  const buildBody = () => {
    const body = events.map((event, i) => {
      return (
        <Grid item container direction="row" key={i}>
          <Grid item>{event.municipality}</Grid>
          <Grid item>{event.startDate}</Grid>
          <Grid item>{event.endDate}</Grid>
        </Grid>
      );
    });
    setEventBody(body);
  };

  useEffect(fetchEvents, []);
  useEffect(buildBody, [events]);

  return (
    <Grid container direction="column">
      Event body:
      {eventBody}
    </Grid>
  );
};
export default EventsContainer;
