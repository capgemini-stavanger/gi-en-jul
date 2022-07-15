import { Button, Grid, TextField } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import EventInformation, {
  EventContent,
  EventContentInit,
} from "components/superadmin/Events/EventInformation";
import EventDropdown from "./EventDropdown";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "components/register-as-giver/Styles";
import NewEventBox from "./NewEventBox";
import { ContactSupportOutlined } from "@material-ui/icons";
import InformationBox from "components/shared/InformationBox";

interface Props {
  accessToken: string;
}

const EventsContainer: React.FC<Props> = ({ accessToken }) => {
  const classes = useStyles();
  const [events, setEvents] = useState<EventContent[]>([]);
  const [eventBody, setEventBody] = useState<JSX.Element[]>([]);
  const [openInformationBox, setOpenInformationBox] = useState<boolean>(false);
  const [informationBoxInfo, setInformationBoxInfo] = useState<string>("");
  const [uniqueEventNames, setUniqueEventNames] = useState<string[]>([]);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [newEventName, setNewEventName] = useState<string>("");
  const [validNewEventName, setValidNewEventName] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('Nytt eventnavn (feks "Jul22")');
  const [addState, setAddState] = useState<boolean>(false);
  const apiservice = new ApiService(accessToken);
  const handleDropDownChange = (value: string) => {
    setSelectedEventName(value);
  };
  const handleNewEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateNewEventName(e.target.value);
    setNewEventName(e.target.value);
  };
  const resetNewEventNameBox = () => {
    setErrorText("Nytt eventnavn (feks 'Jul22')");
    setNewEventName("");
    setValidNewEventName(false);
  };
  const handleCancel = () => {
    resetNewEventNameBox();
    setAddState(false);
  };
  const validateNewEventName = (newName: string) => {
    if (newName == "") {
      setValidNewEventName(false);
      setErrorText("Nytt eventnavn (feks 'Jul22')");
    } else if (uniqueEventNames.includes(newName)) {
      setValidNewEventName(false);
      setErrorText("Eventnavnet finnes fra før");
    } else {
      setValidNewEventName(true);
      setErrorText("");
    }
  };
  const handleSaveNewEventName = () => {
    if (!validNewEventName) return;
    setUniqueEventNames([...uniqueEventNames, newEventName]);
    setAddState(false);
    setSelectedEventName(newEventName);
    resetNewEventNameBox();
  };
  const handleAddClick = () => {
    setAddState(true);
  };
  const createNewEvent = (newEvent: EventContent) => {
    postNewEvent(newEvent);
    setEvents([...events, newEvent]);
  };
  const handleEventChange = (updatedEvent: EventContent, id: any) => {
    console.log("Update happened from event with index: " + id);
  };
  const handleEventDeletion = (index: number) => {
    events.splice(index, 1);
    setEvents(events);

    buildBody();
  };
  const postNewEvent = (event: EventContent) => {
    apiservice
      .post(
        "Event/create",
        JSON.stringify({
          ...event,
        })
      )
      .then((resp) => {
        if (resp.status == 200) {
          setInformationBoxInfo("Nytt event ble laget");
        } else {
          setInformationBoxInfo("Det skjedde en feil ved laging av event");
        }
        setOpenInformationBox(true);
      });
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
    const body = events
      .filter((e) => e.eventName === selectedEventName)
      .map((event, i) => {
        return (
          <Grid item container direction="row" key={event.eventName + event.municipality}>
            <EventInformation
              event={event}
              handleEventChange={handleEventChange}
              id={i}
              onDelete={handleEventDeletion}
            />
          </Grid>
        );
      });
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
      <Grid item container direction="row">
        <Grid item>
          <EventDropdown
            choices={uniqueEventNames}
            labelNote={"Velg Eventnavn"}
            updateValue={handleDropDownChange}
            selectedValue={selectedEventName}
          />
        </Grid>
        <Grid item>
          {addState ? (
            <>
              <Button onClick={handleSaveNewEventName} variant="contained">
                Lagre
              </Button>
              <TextField
                variant="outlined"
                onChange={handleNewEventNameChange}
                value={newEventName}
                label="Navn på Eventet"
                placeholder="Eventnavn"
                error={!validNewEventName}
                helperText={errorText}
              />
              <Button onClick={handleCancel}>
                <ClearIcon></ClearIcon>
              </Button>
            </>
          ) : (
            <Button onClick={handleAddClick} variant="outlined">
              Nytt Eventnavn
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container direction="column">
        {eventBody}
      </Grid>

      <InformationBox
        open={openInformationBox}
        text={informationBoxInfo}
        handleClose={() => {
          setOpenInformationBox(false);
        }}
      />
      <Grid item>
        {selectedEventName === "" ? (
          ""
        ) : (
          <NewEventBox
            handleSaveEvent={createNewEvent}
            eventId={events.length}
            eventName={selectedEventName}
          />
        )}
      </Grid>
    </Grid>
  );
};
export default EventsContainer;
