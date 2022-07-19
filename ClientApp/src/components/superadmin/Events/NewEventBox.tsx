import { Button, Container } from "@material-ui/core";
import ConfirmationBox from "components/shared/confirmationBox";
import { useState } from "react";
import useStyles from "./Styles";
import { EventContent, EventContentInit } from "./EventType";
import EventInformation from "./EventInformation";

interface Props {
  handleSaveEvent: (event: EventContent) => void;
  onClose: () => void;
  open: boolean;
}

const NewEventBox: React.FC<Props> = ({ handleSaveEvent, onClose, open }) => {
  const classes = useStyles();
  const [newEvent, setNewEvent] = useState<EventContent>(EventContentInit());
  const [openConfirmationBox, setOpenConfirmationBox] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const handleSaveClick = () => {
    setOpenConfirmationBox(true);
  };
  const handleClose = () => {
    onClose();
  };
  const handleSaveResponse = (response: boolean) => {
    if (response) {
      handleSaveEvent(newEvent); // send new element to parent
      setOpenConfirmationBox(false); // close confirmation box
      setNewEvent(EventContentInit()); // reset boxes
    } else {
      setOpenConfirmationBox(false);
    }
  };
  const handleEventChange = (event: EventContent) => {
    setIsUpdated(true);
    setNewEvent(event);
  };
  return (
    <>
      {open ? (
        <Container className={classes.newBoxBackgorund}>
          <EventInformation
            event={newEvent}
            handleEventChange={handleEventChange}
            id={""}
            onDelete={handleClose}
          />
          {isUpdated ? <Button onClick={handleSaveClick}>Lagre event</Button> : ""}
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
        ""
      )}
    </>
  );
};

export default NewEventBox;
