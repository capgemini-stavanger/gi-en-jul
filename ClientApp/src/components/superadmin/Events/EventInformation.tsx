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
    case "dueDate":
      return [EV.notEmptyOrADate];
    case "deliveryAddress":
      return [EV.emptyString];
    case "deliveryDate":
      return [EV.emptyString];
    case "deliveryTime":
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
    case "dueDate":
      return [EE.wrongDateFormat];
    case "deliveryAddress":
      return [EE.emptyString];
    case "deliveryDate":
      return [EE.emptyString];
    case "deliveryTime":
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
  initEditable: boolean;
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
  const [viewErrorNumber, setViewErrorNumber] = useState<number>(0);
  const [formValues, setFormValues] = useState<EventContent>(event);
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
      handleEventChange(formValues, id);
    } else {
      setViewErrorNumber(viewErrorNumber + 1);
      setInformationText("Vennligst fyll ut gyldige verider i alle felter");
      setOpenInformation(true);
    }
  };

  const saveButton = (
    <Button variant="contained" className={classes.button} onClick={handleSaveClick}>
      Send inn
    </Button>
  );

  const handleDeleteClick = () => {
    setOpenDeleteConfirmation(true);
  };

  const deleteButton = (
    <Button variant="contained" className={classes.buttonError} onClick={handleDeleteClick}>
      Avbryt
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
        fullWidth
      />
    </Grid>,
    // startDate
    <Grid className={classes.eventBox} key={2} item>
      <InputValidator
        className={classes.dateInput}
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("startDate")}
        setIsValids={getValiditySetter("startDate")}
        errorMessages={getErrorMessages("startDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.startDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.startDate}
        name="startDate"
        label="Start-dato (åååå-mm-dd)"
      />
    </Grid>,
    // endDate
    <Grid className={classes.eventBox} key={3} item>
      <InputValidator
        className={classes.dateInput}
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("endDate")}
        setIsValids={getValiditySetter("endDate")}
        errorMessages={getErrorMessages("endDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.endDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.endDate}
        name="endDate"
        label="Slutt-dato  (åååå-mm-dd)"
      />
    </Grid>,
    // endDate
    <Grid className={classes.eventBox} key={"dueDate"} item>
      <InputValidator
        className={classes.dateInput}
        viewErrorTrigger={viewErrorNumber}
        validators={getValidators("dueDate")}
        setIsValids={getValiditySetter("dueDate")}
        errorMessages={getErrorMessages("dueDate")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const copy = { ...formValues };
          copy.signUpDueDate = e.target.value;
          setFormValues(copy);
        }}
        value={formValues.signUpDueDate}
        name="dueDate"
        label="påmeldingsfrist  (åååå-mm-dd)"
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
        }}
        value={formValues.deliveryDate}
        name="deliveryDate"
        label="Leverings-dato"
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
        }}
        value={formValues.deliveryTime}
        name="deliveryTime"
        label="Leverings-Klokkeslett"
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
        }}
        value={formValues.giverLimit}
        name="giverLimit"
        label="Maks Antall Givere"
      />
    </Grid>,
  ];

  return (
    <Grid container direction="row" className={classes.eventContainers}>
      {form}
      <Grid item style={{ marginTop: "1.4em" }}>
        <InformationBox
          open={openInformation}
          text={informationText}
          handleClose={() => {
            setOpenInformation(false);
          }}
        />
        <ConfirmationBox
          open={openDeleteConfirmation}
          text={"Er du sikker på at du ønsker å avbryte ?"}
          handleClose={() => {
            setOpenDeleteConfirmation(false);
          }}
          handleResponse={handleDeleteConfirmation}
        />
        {
          <>
            {saveButton} {deleteButton}
          </>
        }
      </Grid>
    </Grid>
  );
};
export default EventInformation;
