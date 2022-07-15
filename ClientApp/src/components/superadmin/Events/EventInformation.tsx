import { Button, Grid } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "components/register-as-giver/Styles";
import EventErrors from "./CustomEventErrors";
import ConfirmationBox from "components/shared/confirmationBox";

export interface EventContent {
  eventName: string; // Jul{YY}
  municipality: string; // location
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  // deliveryGPS: string;
  deliveryTime: string;
  contactPerson: string;
  giverLimit: number;
  email: string;
  // facebook: string; //url
  // instagram: string; // url
  // image: string; // url to contact person image
  phoneNumber: string;
}

export const EventContentInit = (eventName: string): EventContent => {
  return {
    eventName: eventName, // Jul{YY}
    municipality: "", // location
    startDate: "", // YYYY-MM-DDThh:mm:ssZ
    endDate: "", // YYYY-MM-DDThh:mm:ssZ
    deliveryAddress: "",
    deliveryDate: "",
    // deliveryGPS: "",
    deliveryTime: "",
    contactPerson: "",
    giverLimit: 0,
    email: "",
    // facebook: "", //url
    // instagram: "", // url
    // image: "", // url to contact person image
    phoneNumber: "",
  };
};

interface Props {
  event: EventContent;
  handleEventChange: (updatedEvent: EventContent, id: number) => void;
  onDelete: (id: number) => void;
  id: number;
}

const EventInformation: React.FC<Props> = ({ event, handleEventChange, onDelete, id }) => {
  const classes = useStyles();
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<EventContent>(event);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const handleSaveConfirmation = (response: boolean) => {
    if (response) {
      handleEventChange(formValues, id);
    } else {
      // do nothing
    }
    setOpenConfirmation(false);
  };
  const phFunc = (s: string) => {
    return true;
  };
  const handleSaveClick = () => {
    setActiveEdit(false);
    setOpenConfirmation(true);
  };
  const saveButton = (
    <Button variant="contained" onClick={handleSaveClick}>
      Lagre
    </Button>
  );
  const handleCancelClick = () => {
    setFormValues(event); // reset values
    setActiveEdit(false);
  };
  const cancelButton = (
    <Button variant="contained" onClick={handleCancelClick}>
      Avbryt
    </Button>
  );
  const handleEditClick = () => {
    setActiveEdit(true);
  };
  const editButton = (
    <Button variant="contained" onClick={handleEditClick}>
      Rediger
    </Button>
  );
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const deleteButton = (
    <Button variant="contained" onClick={handleDeleteClick}>
      Slett
    </Button>
  );

  const form: JSX.Element[] = [
    // eventName
    <Grid key={0} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.keyCombinationExists]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.eventName = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.eventName}
        name="eventName"
        label="Eventnavn"
        disabled={true}
      />
    </Grid>,
    // municipality
    <Grid key={1} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.keyCombinationExists]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.municipality = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.municipality}
        name="Kommune"
        label="Kommune"
        disabled={!activeEdit}
      />
    </Grid>,
    // startDate
    <Grid key={2} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.wrongDateFormat]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.startDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.startDate}
        name="Start-tidspuntk"
        label="Start-dato"
        disabled={!activeEdit}
      />
    </Grid>,
    // endDate
    <Grid key={3} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.wrongDateFormat]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.endDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.endDate}
        name="Slutt-tidspunkt"
        label="Slutt-dato"
        disabled={!activeEdit}
      />
    </Grid>,
    // deliveryAddress
    <Grid key={4} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc]}
        errorMessages={[EventErrors.emptyString]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.deliveryAddress = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.deliveryAddress}
        name="Leverings Adresse"
        label="Leverings Adresse"
        disabled={!activeEdit}
      />
    </Grid>,
    // deliveryDate
    <Grid key={5} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.wrongDateFormat]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.deliveryDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.deliveryDate}
        name="Leverings-dato"
        label="Leverings-dato"
        disabled={!activeEdit}
      />
    </Grid>,
    // contactPerson
    <Grid key={6} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc]}
        errorMessages={[EventErrors.emptyString]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.contactPerson = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.contactPerson}
        name="Kontaktperson"
        label="Kontaktperson"
        disabled={!activeEdit}
      />
    </Grid>,
    //giverLimit
    <Grid key={7} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc]}
        errorMessages={[EventErrors.notANumber]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === "") {
            const copy = { ...formValues };
            copy.giverLimit = 0;
            setFormValues(copy);
            return;
          }
          try {
            const copy = { ...formValues };
            copy.giverLimit = Number.parseInt(e.target.value);
            setFormValues(copy);
          } catch {}
        }}
        value={formValues.giverLimit}
        name="Maks Antall Givere"
        label="Maks Antall Givere"
        disabled={!activeEdit}
      />
    </Grid>,
    //email
    <Grid key={8} item>
      <InputValidator
        viewErrorTrigger={0}
        validators={[phFunc, phFunc]}
        errorMessages={[EventErrors.emptyString, EventErrors.notAnEmail]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.email = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.email}
        name="Kontaktemail"
        label="Komtaktemail"
        disabled={!activeEdit}
      />
    </Grid>,
  ];

  return (
    <Grid container direction="row">
      {form}
      <Grid item>
        <ConfirmationBox
          open={openConfirmation}
          text={"Er du sikker på at du vil lagre endringene?"}
          handleClose={() => {
            setOpenConfirmation(false);
          }}
          handleResponse={handleSaveConfirmation}
        />
        {activeEdit ? (
          <>
            {cancelButton} {saveButton}
          </>
        ) : (
          editButton
        )}
        {deleteButton}
      </Grid>
    </Grid>
  );
};
export default EventInformation;
