import { Button, Grid, TableCell, TableRow } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import React, { useState } from "react";
import useStyles from "components/superadmin/Styles";
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

const EventRow: React.FC<Props> = ({
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
    <Button variant="contained" className={classes.button} onClick={handleSaveClick}>
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
    <Button variant="contained" className={classes.buttonError} onClick={handleDeleteClick}>
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

  const tableCells: JSX.Element[] = [
    // eventName
    <TableCell key={0}>
      <SelectForm
        name="Eventnavn"
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
    </TableCell>,
    <TableCell key={1}>
      <SelectForm
        name="Municipality"
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
    </TableCell>,
    // startDate
    <TableCell key={2} width="140px">
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
        // label="Start-dato (åååå-mm-dd)"
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
    // endDate
    <TableCell key={3} width="140px">
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
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
    // deliveryAddress
    <TableCell key={4}>
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
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
    // deliveryDate
    <TableCell key={5} width="140px">
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
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
    // deliveryTime
    <TableCell key={"deliveryTime"}>
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
        // label="Leverings-Klokkeslett"
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
    //giverLimit
    <TableCell key={7} width="100px">
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
        label=""
        disabled={!activeEdit}
      />
    </TableCell>,
  ];

  return (
    <TableRow className={classes.tableBody}>
      {tableCells}
      <TableCell>
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
        <Grid container direction="row">
          {activeEdit ? (
            <>
              {cancelButton} {saveButton}
            </>
          ) : (
            <>
              {editButton} {deleteButton}
            </>
          )}
        </Grid>
      </TableCell>
    </TableRow>
  );
};
export default EventRow;
