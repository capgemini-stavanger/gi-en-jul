import { Container } from "@material-ui/core";
import { useState } from "react";
import useStyles from "./Styles";
import { EventContent, EventContentInit } from "./EventType";
import EventInformation from "./EventInformation";

interface Props {
  handleSaveEvent: (event: EventContent) => void;
  onClose: () => void;
  open: boolean;
  existingEventNames: string[];
  existingMunicipalities: string[];
}

const NewEventBox: React.FC<Props> = ({
  handleSaveEvent,
  onClose,
  open,
  existingEventNames,
  existingMunicipalities,
}) => {
  const classes = useStyles();
  const [newEvent, setNewEvent] = useState<EventContent>(EventContentInit());

  const handleClose = () => {
    onClose();
  };
  const handleSave = (updatedEvent: EventContent) => {
    handleSaveEvent(updatedEvent); // send new element to parent
    // setNewEvent(updatedEvent);
    setNewEvent(EventContentInit()); // reset boxes
  };

  return (
    <>
      {open ? (
        <Container className={classes.newBoxBackgorund}>
          <EventInformation
            event={newEvent}
            handleEventChange={handleSave}
            id={""}
            onDelete={handleClose}
            existingEventNames={existingEventNames}
            existingMunicipalities={existingMunicipalities}
            initEditable={true}
          />
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default NewEventBox;
