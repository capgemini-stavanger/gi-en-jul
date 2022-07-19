import { Button, Grid } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { useEffect, useState } from "react";
import useStyles from "components/superadmin/Events/Styles";
import { EventErrors as EE, EventInputValidators as EV } from "./EventValidation";
import ConfirmationBox from "components/shared/confirmationBox";
import InformationBox from "components/shared/InformationBox";
import { EventContent } from "./EventType";

type ValidEventEntry = {
  [valid: string]: boolean;
};

const initValidEventState: ValidEventEntry = {
  eventName: false,
  municipality: false,
  startDate: false,
  endDate: false,
  deliveryAddress: false,
  deliveryDate: false,
  deliveryTime: false,
  contactPerson: false,
  giverLimit: false,
  email: false,
  phoneNumber: false,
};

const getValidators = (field: string) => {
  switch (field) {
    case "eventName":
      return [EV.emptyString];
    case "municipality":
      return [EV.emptyString];
    case "startDate":
      return [EV.emptyString, EV.notADate];
    case "endDate":
      return [EV.emptyString, EV.notADate];
    case "deliveryAddress":
      return [EV.emptyString];
    case "deliveryDate":
      return [EV.emptyString];
    case "deliveryTime":
      return [EV.emptyString];
    case "contactPerson":
      return [EV.emptyString];
    case "giverLimit":
      return [EV.emptyString, EV.notANumber];
    case "email":
      return [EV.emptyString, EV.notAnEmail];
    case "phoneNumber":
      return [EV.emptyString, EV.notAPhoneNumber];
  }
  return [
    (s: string) => {
      return true;
    },
  ];
};

const getErrorMessages = (field: string) => {
  switch (field) {
    case "eventName":
      return [EE.emptyString];
    case "municipality":
      return [EE.emptyString];
    case "startDate":
      return [EE.emptyString, EE.wrongDateFormat];
    case "endDate":
      return [EE.emptyString, EE.wrongDateFormat];
    case "deliveryAddress":
      return [EE.emptyString];
    case "deliveryDate":
      return [EE.emptyString];
    case "deliveryTime":
      return [EE.emptyString];
    case "contactPerson":
      return [EE.emptyString];
    case "giverLimit":
      return [EE.emptyString, EE.notANumber];
    case "email":
      return [EE.emptyString, EE.notAnEmail];
    case "phoneNumber":
      return [EE.emptyString, EE.notAPhoneNumber];
  }
};

interface Props {
  event: EventContent;
  handleEventChange: (updatedEvent: EventContent, id: string) => void;
  onDelete: (id: any) => void;
  id: string;
}

const EventInformation: React.FC<Props> = ({ event, handleEventChange, onDelete, id }) => {
  const classes = useStyles();
  const [viewErrorNumber, setViewErrorNumber] = useState<number>(1);
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<EventContent>(event);
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState<string>("");
  const [openInformation, setOpenInformation] = useState<boolean>(false);
  const [validEventState, setValidEventState] = useState({
    ...initValidEventState,
  });
  const [allFieldsValid, setAllFieldsValid] = useState<boolean>(false);
  const everythingValid = () => {
    return Object.values(validEventState).every((value) => {
      return value === true;
    });
  };
  const incrementErrorNum = (field: string, fieldValue: string) => {
    if (!fieldIsValid(field, fieldValue)) {
      setViewErrorNumber(viewErrorNumber + 1);
    }
  };
  const fieldIsValid = (field: string, fieldValue: string) => {
    let allIsValid = true;
    const validators = getValidators(field);
    validators.forEach((validator) => {
      if (!validator(fieldValue)) {
        allIsValid = false;
      }
    });
    return allIsValid;
  };
  const handleSaveConfirmation = (response: boolean) => {
    if (response) {
      handleEventChange(formValues, id);
    }
    setOpenSaveConfirmation(false);
  };
  const handleDeleteConfirmation = (response: boolean) => {
    if (response) {
      onDelete(id);
    }
    setOpenDeleteConfirmation(false);
  };
  const getValiditySetter = (target: string) => (isValid: boolean) => {
    setValidEventState((prev) => {
      prev[target] = isValid;
      return prev;
    });
  };
  const handleSaveClick = () => {
    if (everythingValid()) {
      setActiveEdit(false);
      setOpenSaveConfirmation(true);
    } else {
      //Informs user know that some fields are not filled out properly
      setOpenInformation(true);
    }
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
    setDeleteConfirmationText("Er du sikker på at du ønsker å slette dette eventet?");
    setOpenDeleteConfirmation(true);
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
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("eventName")}
        setIsValids={getValiditySetter("eventName")}
        errorMessages={getErrorMessages("eventName")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.eventName = e.target.value;
          setFormValues(copy);
          incrementErrorNum("eventName", e.target.value);
        }}
        value={formValues.eventName}
        name="eventName"
        label="Eventnavn"
        disabled={!activeEdit}
      />
    </Grid>,
    // municipality
    <Grid key={1} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("municipality")}
        setIsValids={getValiditySetter("municipality")}
        errorMessages={getErrorMessages("municipality")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.municipality = e.target.value;
          setFormValues(copy);
          incrementErrorNum("municipality", e.target.value);
        }}
        value={formValues.municipality}
        name="municipality"
        label="Kommune"
        disabled={!activeEdit}
      />
    </Grid>,
    // startDate
    <Grid key={2} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("startDate")}
        setIsValids={getValiditySetter("startDate")}
        errorMessages={getErrorMessages("startDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.startDate = e.target.value;
          setFormValues(copy);
          incrementErrorNum("startDate", e.target.value);
        }}
        value={formValues.startDate}
        name="startDate"
        label="Start-dato (åååå-mm-dd)"
        disabled={!activeEdit}
      />
    </Grid>,
    // endDate
    <Grid key={3} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("endDate")}
        setIsValids={getValiditySetter("endDate")}
        errorMessages={getErrorMessages("endDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.endDate = e.target.value;
          setFormValues(copy);
          incrementErrorNum("endDate", e.target.value);
        }}
        value={formValues.endDate}
        name="endDate"
        label="Slutt-dato  (åååå-mm-dd)"
        disabled={!activeEdit}
      />
    </Grid>,
    // deliveryAddress
    <Grid key={4} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("deliveryAddress")}
        setIsValids={getValiditySetter("deliveryAddress")}
        errorMessages={getErrorMessages("deliveryAddress")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.deliveryAddress = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.deliveryAddress}
        name="deliveryAddress"
        label="Leverings Adresse"
        disabled={!activeEdit}
      />
    </Grid>,
    // deliveryDate
    <Grid key={5} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("deliveryDate")}
        setIsValids={getValiditySetter("deliveryDate")}
        errorMessages={getErrorMessages("deliveryDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.deliveryDate = e.target.value;
          setFormValues(copy);
          incrementErrorNum("deliveryDate", e.target.value);
        }}
        value={formValues.deliveryDate}
        name="deliveryDate"
        label="Leverings-dato"
        disabled={!activeEdit}
      />
    </Grid>,
    <Grid key={"deliveryTime"} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("deliveryTime")}
        setIsValids={getValiditySetter("deliveryTime")}
        errorMessages={getErrorMessages("deliveryTime")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.deliveryTime = e.target.value;
          setFormValues(copy);
          incrementErrorNum("deliveryTime", e.target.value);
        }}
        value={formValues.deliveryTime}
        name="deliveryTime"
        label="Leverings-Klokkeslett"
        disabled={!activeEdit}
      />
    </Grid>,
    // contactPerson
    <Grid key={6} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("contactPerson")}
        setIsValids={getValiditySetter("contactPerson")}
        errorMessages={getErrorMessages("contactPerson")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.contactPerson = e.target.value;
          setFormValues(copy);
          incrementErrorNum("contactPerson", e.target.value);
        }}
        value={formValues.contactPerson}
        name="contactPerson"
        label="Kontaktperson"
        disabled={!activeEdit}
      />
    </Grid>,
    //giverLimit
    <Grid key={7} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("giverLimit")}
        setIsValids={getValiditySetter("giverLimit")}
        errorMessages={getErrorMessages("giverLimit")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.giverLimit = e.target.value;
          setFormValues(copy);
          incrementErrorNum("giverLimit", e.target.value);
        }}
        value={formValues.giverLimit}
        name="giverLimit"
        label="Maks Antall Givere"
        disabled={!activeEdit}
      />
    </Grid>,
    //email
    <Grid key={8} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("email")}
        setIsValids={getValiditySetter("email")}
        errorMessages={getErrorMessages("email")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.email = e.target.value;
          setFormValues(copy);
          incrementErrorNum("email", e.target.value);
        }}
        value={formValues.email}
        name="email"
        label="Kontaktemail"
        disabled={!activeEdit}
      />
    </Grid>,
    //phoneNumber
    <Grid key={9} item>
      <InputValidator
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("phoneNumber")}
        setIsValids={getValiditySetter("phoneNumber")}
        errorMessages={getErrorMessages("phoneNumber")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.phoneNumber = e.target.value;
          setFormValues(copy);
          incrementErrorNum("phoneNumber", e.target.value);
        }}
        value={formValues.phoneNumber}
        name="phoneNumber"
        label="Kontakt telefon"
        disabled={!activeEdit}
      />
    </Grid>,
  ];

  return (
    <Grid container direction="row">
      {form}
      <Grid item>
        <InformationBox
          open={openInformation}
          text={"Vennligst fyll ut gyldige verider i alle felter"}
          handleClose={() => {
            setOpenInformation(false);
          }}
        />
        <ConfirmationBox
          open={openSaveConfirmation}
          text={"Er du sikker på at du vil lagre endringene?"}
          handleClose={() => {
            setOpenSaveConfirmation(false);
          }}
          handleResponse={handleSaveConfirmation}
        />
        <ConfirmationBox
          open={openDeleteConfirmation}
          text={`Er du sikker på at du ønsker å slette event (${formValues.eventName}-${formValues.municipality}) ?`}
          handleClose={() => {
            setOpenDeleteConfirmation(false);
          }}
          handleResponse={handleDeleteConfirmation}
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
