import { Button, Container, Grid } from "@material-ui/core";
import ConfirmationBox from "components/shared/confirmationBox";
import { useState } from "react";
import EventInformation, { EventContent, EventContentInit } from "./EventInformation";

interface Props {
  handleSaveEvent: (event: EventContent) => void;
  eventName: string;
  eventId: any;
}

const NewEventBox: React.FC<Props> = ({ handleSaveEvent, eventName }) => {
  const [newEvent, setNewEvent] = useState<EventContent>(EventContentInit(eventName));
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirmationBox, setOpenConfirmationBox] = useState<boolean>(false);
  const handleAddClick = () => {
    setOpen(true);
  };
  const handleSaveClick = () => {
    setOpenConfirmationBox(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveResponse = (response: boolean) => {
    if (response) {
      handleSaveEvent(newEvent); // send new element to parent
      setOpen(false); // close container
      setOpenConfirmationBox(false); // close confirmation box
    } else {
      setOpenConfirmationBox(false);
    }
  };
  const handleEventChange = (event: EventContent) => {
    setNewEvent(event);
  };
  return (
    <>
      {open ? (
        <Container>
          <EventInformation
            event={newEvent}
            handleEventChange={handleEventChange}
            id={0}
            onDelete={() => {}}
          />
          <Button onClick={handleSaveClick}>Lagre event</Button>
          <Button onClick={handleClose}>Avbryt</Button>
          <ConfirmationBox
            open={openConfirmationBox}
            text={"Er du sikker på at du vil legge til et nytt event?"}
            handleClose={() => {
              setOpenConfirmationBox(false);
            }}
            handleResponse={handleSaveResponse}
          />
        </Container>
      ) : (
        <Container>
          <Button onClick={handleAddClick}>Nytt event</Button>
        </Container>
      )}
    </>
  );
};

export default NewEventBox;
