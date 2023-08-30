import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import {
  Dto2EventContent,
  EventContent,
  EventContent2Dto,
  EventContentInit,
  EventContentDto,
} from "components/superadmin/Events/EventType";
import EventDropdown from "./EventDropdown";
import NewEventBox from "./NewEventBox";
import InformationBox from "components/shared/InformationBox";
import useStyles from "../Styles";
import ConfirmationBox from "components/shared/ConfirmationBox";
import EventRow from "./EventRow";

interface Props {
  accessToken: string;
}

const EventsTable: React.FC<Props> = ({ accessToken }) => {
  const [events, setEvents] = useState(new Map<string, EventContent>());
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const [eventTable, setEventTable] = useState<JSX.Element[]>([]);
  const [openInformationBox, setOpenInformationBox] = useState<boolean>(false);
  const [openConfirmationBox, setOpenConfirmatitonBox] = useState<boolean>(false);
  const [openSaveConfirmationBox, setOpenSaveConfirmatitonBox] = useState<boolean>(false);
  const [informationBoxInfo, setInformationBoxInfo] = useState<string>("");
  const [uniqueEventNames, setUniqueEventNames] = useState<string[]>([]);
  const [selectedEventName, setSelectedEventName] = useState<string>("");
  const [newEventName, setNewEventName] = useState<string>("");
  const [openNewEventBox, setOpenNewEventBox] = useState<boolean>(false);
  const [validNewEventName, setValidNewEventName] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('Nytt eventnavn (feks "Jul22")');
  const [addState, setAddState] = useState<boolean>(false);
  const [tempEventName, setTempEventName] = useState<string>("");
  const [tempNewEvent, setTempNewEvent] = useState<EventContent>(EventContentInit());
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);

  const handleDropDownChange = (value: string) => {
    if (openNewEventBox) {
      setOpenConfirmatitonBox(true);
      setTempEventName(value);
      return;
    }
    setSelectedEventName(value);
  };

  const keyCombinationExists = (combination: string): boolean => {
    const existingCombinations: string[] = [];
    events.forEach((event, id) => {
      existingCombinations.push(id);
    });
    const exists: boolean = existingCombinations.includes(combination);
    return exists;
  };

  const municipalityExists = (municipality: string): boolean => {
    return municipalities.includes(municipality);
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

  const validateNewEvent = (newEvent: EventContent, newId: string) => {
    if (!municipalityExists(newEvent.municipality)) {
      setInformationBoxInfo(`Kommunen tastet inn er ikke registrert som en kommune. 
        Vennligst legg til denne før du lager et event for denne kommunen.`);
      setOpenInformationBox(true);
      return false;
    }
    if (!uniqueEventNames.includes(newEvent.eventName)) {
      setInformationBoxInfo(`Eventnavnet du har tastet inn er ikke lagt til i listen av eventer. 
      Vennligst legg til dette før du lager et event med dette eventnavnet.`);
      setOpenInformationBox(true);
      return false;
    }
    if (keyCombinationExists(newId)) {
      setInformationBoxInfo(`Eventnavn - Kommune kombinasjonen finnes allerede. 
      Du kan ikke lage to av samme event i en kommune.`);
      setOpenInformationBox(true);
      return false;
    }
    return true;
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

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      postEventUpdate(tempNewEvent);
      setOpenNewEventBox(false);
    }
  };

  const handleNewEvent = (newEvent: EventContent) => {
    const newId = newEvent.eventName + newEvent.municipality;
    const validNewEvent = validateNewEvent(newEvent, newId);
    if (validNewEvent) {
      setTempNewEvent(newEvent);
      setOpenSaveConfirmatitonBox(true);
    }
  };

  const handleEventUpdate = (updatedEvent: EventContent, id: string) => {
    const newId = updatedEvent.eventName + updatedEvent.municipality;
    // either municipality or eventname for the event is updated
    if (updatedEvent.id != newId) {
      const validUpdate = validateNewEvent(updatedEvent, newId);
      if (validUpdate) {
        updatedEvent.id = newId;
        postEventUpdate(updatedEvent); // send updated event to backend
        postEventDeletion(events.get(id)); // delete old version of the event
      }
    } else {
      // municipality and eventname stayed the same
      postEventUpdate(updatedEvent);
    }
  };

  const handleEventDeletion = (id: string) => {
    const eventToBeDeleted = events.get(id); // get event from map
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
          refreshData();
          fetchDistinctEventNames();
        }
      })
      .catch((errorstack) => {
        setInformationBoxInfo("Det skjedde en feil ved sletting av event");
        console.error(errorstack);
      });
    setOpenInformationBox(true);
  };

  const postEventUpdate = (event: EventContent): void => {
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
          refreshData();
          fetchDistinctEventNames();
        }
      })
      .catch((errorstack) => {
        setInformationBoxInfo("Det skjedde en feil ved laging av event");
        console.error(errorstack);
      });
    setOpenInformationBox(true);
  };

  const buildTable = () => {
    const eventsList: EventContent[] = [];
    // events.forEach((event) => eventsList.push(event));
    events.forEach((event) => eventsList.push(event));
    const table = eventsList
      .filter((e) => e.eventName === selectedEventName)
      .map((event) => {
        return (
          <EventRow
            key={event.eventName + event.municipality}
            event={event}
            handleEventChange={handleEventUpdate}
            onDelete={handleEventDeletion}
            id={event.id}
            existingEventNames={uniqueEventNames}
            existingMunicipalities={municipalities}
          />
        );
      });
    setEventTable(table);
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

  const refreshData = () => {
    fetchMunicipalities();
    fetchDistinctEventNames();
    fetchEvents();
  };

  useEffect(refreshData, []);
  useEffect(buildTable, [events, selectedEventName, uniqueEventNames, municipalities]);

  return (
    <>
      <Typography variant="h6">Administrer event</Typography>
      <List>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography>Her kan du legge til eller slette eventer</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography>
            Når du knytter en kommune opp mot et event, må det settes en start og sluttdato som
            bestemmer når eventet er aktivt, og i hvilken periode det går ann å melde seg opp som
            giver.
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography>
            Du kan velge om du ønsker å sette en påmeldingsfrist, dersom denne er satt vil valget
            forsvinne fra &#39;bli giver&#39;-siden etter oppgitt dato.
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>-</ListItemIcon>
          <Typography color="error">
            30 dager etter oppgitt slutt-dato vil data ryddes opp. Det er viktig at slutt dato for
            eventet settes med god nok margin til at dette ikke vil føre til tap av data.
          </Typography>
        </ListItem>
      </List>

      <Grid container direction="column" spacing={5}>
        <Grid item container direction="row">
          <Grid item>
            <EventDropdown
              choices={uniqueEventNames}
              labelNote={"Velg event"}
              updateValue={handleDropDownChange}
              selectedValue={selectedEventName}
            />
          </Grid>
          <Grid item>
            {addState ? (
              <>
                <TextField
                  style={{ marginLeft: "1em" }}
                  variant="outlined"
                  onChange={handleNewEventNameChange}
                  value={newEventName}
                  label="Navn på Eventet"
                  placeholder="Eventnavn"
                  error={!validNewEventName}
                  helperText={errorText}
                />
                <Button
                  onClick={handleSaveNewEventName}
                  variant="contained"
                  style={{ marginTop: "1em", marginLeft: "1em", marginRight: "1em" }}
                  className={classes.button}
                >
                  Lagre
                </Button>
                <Button
                  onClick={handleCancel}
                  style={{ marginTop: "1em" }}
                  className={classes.buttonError}
                >
                  Avbryt
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddClick}
                variant="contained"
                style={{ marginTop: "1em", marginLeft: "1em" }}
                className={classes.button}
              >
                Lag nytt event
              </Button>
            )}
          </Grid>
        </Grid>
        <Table>
          <TableBody className={classes.table}>
            <TableRow>
              <TableCell className={classes.tableHeaderText}>Eventnavn</TableCell>
              <TableCell className={classes.tableHeaderText}>Kommune</TableCell>
              <TableCell className={classes.tableHeaderText}>Start-dato (åååå-mm-dd)</TableCell>
              <TableCell className={classes.tableHeaderText}>Slutt-dato (åååå-mm-dd)</TableCell>
              <TableCell className={classes.tableHeaderText}>
                Påmeldingsfrist (åååå-mm-dd)
              </TableCell>
              <TableCell className={classes.tableHeaderText}>Leverings-adresse</TableCell>
              <TableCell className={classes.tableHeaderText}>Leverings-dato</TableCell>
              <TableCell className={classes.tableHeaderText}>Leverings-klokkeslett</TableCell>
              <TableCell className={classes.tableHeaderText}>Maks antall givere</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
          <TableBody className={classes.tableBody}>{eventTable}</TableBody>
        </Table>
        <ConfirmationBox
          open={openConfirmationBox}
          text={
            "Det nye eventet du holder på å legge til vil gå tapt dersom du bytter fane. Er du sikker på at du likevel ønsker å bytte fane?"
          }
          handleClose={function (): void {
            setOpenConfirmatitonBox(false);
          }}
          handleResponse={handleConfirmationResponse}
        />
        <ConfirmationBox
          open={openSaveConfirmationBox}
          text={"Er du sikker på at du ønsker å starte dette eventet?"}
          handleClose={function (): void {
            setOpenSaveConfirmatitonBox(false);
          }}
          handleResponse={handleSaveResponse}
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
            handleSaveEvent={handleNewEvent}
            onClose={() => {
              setOpenNewEventBox(false);
            }}
            existingEventNames={uniqueEventNames}
            existingMunicipalities={municipalities}
          />
          {selectedEventName === "" || openNewEventBox ? (
            ""
          ) : (
            <Button
              className={classes.button}
              onClick={() => {
                setOpenNewEventBox(true);
              }}
            >
              <Typography>Knytt ny kommune til event</Typography>
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default EventsTable;
