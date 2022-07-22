import { Button, Grid, TextField } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import EventInformation from "components/superadmin/Events/EventInformation";
import {
  EventContent,
  EventContentDto,
  EventContent2Dto,
  Dto2EventContent,
} from "components/superadmin/Events/EventType";
import EventDropdown from "./EventDropdown";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import NewEventBox from "./NewEventBox";
import InformationBox from "components/shared/InformationBox";
import ConfirmationBox from "components/shared/ConfirmationBox";

interface Props {
  accessToken: string;
}

const EventsContainer: React.FC<Props> = ({ accessToken }) => {
  const [events, setEvents] = useState(new Map<string, EventContent>());
  const [eventBody, setEventBody] = useState<JSX.Element[]>([]);
  const [openInformationBox, setOpenInformationBox] = useState<boolean>(false);
  const [openConfirmationBox, setOpenConfirmaitonBox] = useState<boolean>(false);
  const [informationBoxInfo, setInformationBoxInfo] = useState<string>("");
  const [uniqueEventNames, setUniqueEventNames] = useState<string[]>([]);
  const [municipalityNames, setMunicipalityNames] = useState<string[]>([]);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [newEventName, setNewEventName] = useState<string>("");
  const [openNewEventBox, setOpenNewEventBox] = useState<boolean>(false);
  const [validNewEventName, setValidNewEventName] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('Nytt eventnavn (feks "Jul22")');
  const [addState, setAddState] = useState<boolean>(false);
  const [tempEventName, setTempEventName] = useState<string>("");
  const apiservice = new ApiService(accessToken);

  const handleDropDownChange = (value: string) => {
    if (openNewEventBox) {
      setOpenConfirmaitonBox(true);
      setTempEventName(value);
      return;
    }
    setSelectedEventName(value);
  };
  const keyCombinationExists = (combination: string) => {
    const existingCombinations: string[] = [];
    events.forEach((event, id) => {
      existingCombinations.push(id);
    });
    const exists: boolean = existingCombinations.includes(combination);
    return exists;
  };
  const handleConfirmationResponse = (response: boolean) => {
    if (response) {
      setOpenNewEventBox(false);
      setSelectedEventName(tempEventName);
    }
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
    if (newEvent.id == "") {
      newEvent.id = newEvent.eventName + newEvent.municipality;
    }
    if (keyCombinationExists(newEvent.id)) {
      setInformationBoxInfo(`Eventnavn - Kommune kombinasjonen finnes allerede. \n
      Du kan ikke lage to av samme event i en kommune`);
      setOpenInformationBox(true);
      return;
    }
    // todo: check if eventname-municipality combination already exists
    setOpenNewEventBox(false); // only close the new-box if the event has a valid id
    const eventsCopy = new Map(events);
    eventsCopy.set(newEvent.id, newEvent);
    setEvents(eventsCopy);
    postEventUpdate(newEvent);
  };
  const handleEventUpdate = (updatedEvent: EventContent, id: string) => {
    const eventsCopy = new Map(events);
    eventsCopy.set(id, updatedEvent);
    setEvents(eventsCopy);
    postEventUpdate(updatedEvent); // send updated event to backend
  };
  const handleEventDeletion = (id: string) => {
    const eventToBeDeleted = events.get(id); // get event from map
    const eventsCopy = new Map(events);
    eventsCopy.delete(id);
    setEvents(eventsCopy);
    postEventDeletion(eventToBeDeleted);
  };
  const postEventDeletion = (event: EventContent | undefined) => {
    if (event == undefined) {
      setInformationBoxInfo("Finner ikke eventet du prøver å slette");
      setOpenInformationBox(true);
      return;
    }
    apiservice
      .post(
        "Event/Delete",
        JSON.stringify({
          ...EventContent2Dto(event),
        })
      )
      .then((resp) => {
        if (resp.status == 200) {
          setInformationBoxInfo(`Eventet (${event.eventName}-${event.municipality}) ble slettet`);
        }
      })
      .catch((errorstack) => {
        setInformationBoxInfo("Det skjedde en feil ved sletting av event");
        console.error(errorstack);
      });
    setOpenInformationBox(true);
  };
  const postEventUpdate = (event: EventContent) => {
    apiservice
      .post(
        "Event/CreateOrReplace",
        JSON.stringify({
          ...EventContent2Dto(event),
        })
      )
      .then((resp) => {
        if (resp.status == 200) {
          setInformationBoxInfo("Ett event ble oppdatert");
        }
      })
      .catch((errorstack) => {
        setInformationBoxInfo("Det skjedde en feil ved laging av event");
        console.error(errorstack);
      });
    setOpenInformationBox(true);
  };
  const fetchMunicipalityNames = () => {
    apiservice
      .get("Municipality/names", {})
      .then((resp) => {
        console.log("got the different municipality names:");
        console.log(resp.data);
        setMunicipalityNames(resp.data);
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
  const buildBody = () => {
    const eventsList: EventContent[] = [];
    events.forEach((event) => eventsList.push(event));
    const body = eventsList
      .filter((e) => e.eventName === selectedEventName)
      .map((event) => {
        return (
          <Grid item container direction="row" key={event.eventName + event.municipality}>
            <EventInformation
              event={event}
              handleEventChange={handleEventUpdate}
              onDelete={handleEventDeletion}
              id={event.id}
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
  useEffect(fetchMunicipalityNames, []);
  useEffect(fetchDistinctEventNames, []);
  useEffect(buildBody, [events, selectedEventName]);

  return (
    <Grid container direction="column" spacing={5}>
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
      <ConfirmationBox
        open={openConfirmationBox}
        text={
          "Det nye eventet du holder på å legge til vil gå tapt dersom du bytter fane. Er du sikker på at du likevel ønsker å bytte fane?"
        }
        handleClose={function (): void {
          setOpenConfirmaitonBox(false);
        }}
        handleResponse={handleConfirmationResponse}
      />
      <InformationBox
        open={openInformationBox}
        text={informationBoxInfo}
        handleClose={() => {
          setOpenInformationBox(false);
        }}
      />
      <Grid item>
        <NewEventBox
          open={openNewEventBox}
          handleSaveEvent={createNewEvent}
          onClose={() => {
            setOpenNewEventBox(false);
          }}
        />
        {selectedEventName === "" || openNewEventBox ? (
          ""
        ) : (
          <Button
            onClick={() => {
              setOpenNewEventBox(true);
            }}
          >
            <AddIcon />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default EventsContainer;
