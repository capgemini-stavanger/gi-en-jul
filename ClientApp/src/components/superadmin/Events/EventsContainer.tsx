import { Button, Grid } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import EventInformation, {
  EventContent,
  EventContentInit,
} from "components/superadmin/Events/EventInformation";
import useStyles from "components/register-as-giver/Styles";
import EventDropdown from "./EventDropdown";
import NewEventBox from "./NewEventBox";

interface Props {
  accessToken: string;
}

const EventsContainer: React.FC<Props> = ({ accessToken }) => {
  const classes = useStyles();
  const [events, setEvents] = useState<EventContent[]>([]);
  const [eventBody, setEventBody] = useState<JSX.Element[]>([]);
  const [uniqueEventNames, setUniqueEventNames] = useState<string[]>([]);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [newEvent, setNewEvent] = useState<EventContent>(EventContentInit);
  const [addState, setAddState] = useState<boolean>(false);
  const apiservice = new ApiService(accessToken);
  const handleDropDownChange = (value: string) => {
    setSelectedEventName(value);
  };
  const handleAddClick = () => {
    setAddState(true);
  };
  const handleSaveNewEvent = () => {
    setEvents([...events, EventContentInit]);
    // todo: push new event to backend
  };
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
<<<<<<< HEAD
    const body = events.map((event, i) => {
      return (
        <Grid item container direction="row" key={i}>
          <Grid item>{event.municipality}</Grid>
          <Grid item>{event.startDate}</Grid>
          <Grid item>{event.endDate}</Grid>
        </Grid>
      );
    });
=======
    const body = events
      .filter((e) => e.eventName === selectedEventName)
      .map((event, i) => {
        return (
          <Grid item container direction="row" key={i}>
            <EventInformation accessToken={accessToken} event={event} />
          </Grid>
        );
      });
>>>>>>> 8c9a88e (started on editing and adding of events)
    setEventBody(body);
  };

  const fetchDistinctEventNames = () => {
    apiservice
      .get("Event/DistinctEventNames", {})
      .then((resp) => {
        setUniqueEventNames(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  useEffect(fetchEvents, []);
  useEffect(fetchDistinctEventNames, []);
  useEffect(buildBody, [events, selectedEventName]);

  return (
    <Grid container direction="column">
      <Grid item>
        <EventDropdown
          choices={uniqueEventNames}
          labelNote={"Velg Event"}
          passSelectedValue={handleDropDownChange}
        />
      </Grid>
      <Grid item container direction="column">
        {eventBody}
      </Grid>
      <Grid item>
        {addState ? (
          <>
            <Button onClick={handleSaveNewEvent} variant="contained">
              Lagre nytt event
            </Button>
            <EventInformation event={newEvent} accessToken={accessToken} />
          </>
        ) : (
          <Button onClick={handleAddClick} variant="contained">
            Legg til event
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default EventsContainer;
