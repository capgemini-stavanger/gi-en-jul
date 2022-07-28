import { Button, Grid } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import React, { useState } from "react";
import useStyles from "components/superadmin/Events/Styles";
import { EventErrors as EE, EventInputValidators as EV } from "./EventValidation";
import ConfirmationBox from "components/shared/ConfirmationBox";
import InformationBox from "components/shared/InformationBox";
import { EventContent } from "./EventType";
import SelectForm from "components/shared/input-fields/SelectForm";

const getValidators = (field: string) => {
  switch (field) {
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
  }
  return [() => true];
};

const getErrorMessages = (field: string) => {
  switch (field) {
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
  }
  return [];
};

type ValidEventEntry = {
  [valid: string]: boolean;
};

const initValidEventState: ValidEventEntry = {
  startDate: false,
  endDate: false,
  deliveryAddress: false,
  deliveryDate: false,
  deliveryTime: false,
  giverLimit: false,
};

interface Props {
  event: EventContent;
  handleEventChange: (updatedEvent: EventContent, id: string) => void;
  onDelete: (id: string) => void;
  id: string;
  existingEventNames: string[];
  existingMunicipalities: string[];
}

const EventInformation: React.FC<Props> = ({
  event,
  handleEventChange,
  onDelete,
  id,
  existingEventNames,
  existingMunicipalities,
}) => {
  const classes = useStyles();
  const [viewErrorNumber, setViewErrorNumber] = useState<number>(1);
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<EventContent>(event);
  const [openSaveConfirmation, setOpenSaveConfirmation] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState<boolean>(false);
  const [informationText, setInformationText] = useState<string>("");
  const [openInformation, setOpenInformation] = useState<boolean>(false);
  const [validEventState, setValidEventState] = useState({
    ...initValidEventState,
  });

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
      setInformationText("Vennligst fyll ut gyldige verider i alle felter");
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
    setOpenDeleteConfirmation(true);
  };
  const deleteButton = (
    <Button variant="contained" onClick={handleDeleteClick}>
      Slett
    </Button>
  );

  const handleEventnameDropdownChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const val = String(e.target.value);
    const copy = {
      ...formValues,
      eventName: val,
    };
    setFormValues(copy);
  };
  const handleMunicipalityDropdownChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const val = String(e.target.value);
    const copy = {
      ...formValues,
      municipality: val,
    };
    setFormValues(copy);
  };

  const form: JSX.Element[] = [
    // eventName
    <Grid className={classes.eventBox} item key={0}>
      <SelectForm
        name="Eventnavn"
        label="Eventnavn"
        variant="outlined"
        errorMessage="Velg eventnavn"
        error={formValues.eventName == ""}
        value={formValues.eventName}
        options={existingEventNames.map((eventName) => {
          return { value: eventName, text: eventName };
        })}
        onChange={handleEventnameDropdownChange}
        disabled={!activeEdit}
        fullWidth
      />
    </Grid>,
    <Grid className={classes.eventBox} item key={1}>
      <SelectForm
        name="Municipality"
        label="Kommune"
        variant="outlined"
        errorMessage="Velg kommune"
        error={formValues.municipality == ""}
        value={formValues.municipality}
        options={existingMunicipalities.map((muni) => {
          return { value: muni, text: muni };
        })}
        onChange={handleMunicipalityDropdownChange}
        disabled={!activeEdit}
        fullWidth
      />
    </Grid>,
    // startDate
    <Grid className={classes.eventBox} key={2} item>
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
    <Grid className={classes.eventBox} key={3} item>
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
    <Grid className={classes.eventBox} key={4} item>
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
    <Grid className={classes.eventBox} key={5} item>
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
    // deliveryTime
    <Grid className={classes.eventBox} key={"deliveryTime"} item>
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
    //giverLimit
    <Grid className={classes.eventBox} key={7} item>
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
  ];

  return (
    <Grid container direction="row" className={classes.eventContainers}>
      {form}
      <Grid item>
        <InformationBox
          open={openInformation}
          text={informationText}
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
