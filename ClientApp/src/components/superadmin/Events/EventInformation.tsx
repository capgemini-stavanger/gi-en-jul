import { Button, Grid } from "@material-ui/core";
import InputValidator from "components/shared/input-fields/validators/InputValidator";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "components/register-as-giver/Styles";

export interface EventContent {
<<<<<<< HEAD
  eventName: string;
  municipality: string;
=======
  partitionKey: string; // eventName (Jul{YY})
  eventName: string; // Jul{YY}
  rowKey: string; // city (location)
  city: string; // location
>>>>>>> 8c9a88e (started on editing and adding of events)
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  deliveryGPS: string;
  deliveryTime: string;
  contactPerson: string;
  giverLimit: number;
  email: string;
  facebook: string; //url
  instagram: string; // url
  image: string; // url
  phoneNumber: string;
}

export const EventContentInit: EventContent = {
  partitionKey: "", // eventName (Jul{YY})
  eventName: "", // Jul{YY}
  rowKey: "", // city (location)
  city: "", // location
  startDate: "", // YYYY-MM-DDThh:mm:ssZ
  endDate: "", // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: "",
  deliveryDate: "",
  deliveryGPS: "",
  deliveryTime: "",
  contactPerson: "",
  giverLimit: 0,
  email: "",
  facebook: "", //url
  instagram: "", // url
  image: "", // url
  phoneNumber: "",
};

const managableEventContent: string[] = [
  // "partitionKey", // eventName (Jul{YY})
  "eventName", // Jul{YY}
  // "rowKey", // city (location)
  "city", // location
  "startDate", // YYYY-MM-DDThh:mm:ssZ
  "endDate", // YYYY-MM-DDThh:mm:ssZ
  "deliveryAddress",
  "deliveryDate",
  // "deliveryGPS",
  "deliveryTime",
  "contactPerson",
  "giverLimit",
  "email",
  // "facebook", //url
  // "instagram", // url
  // "image", // url
  "phoneNumber",
];

interface Props {
  event: EventContent;
  accessToken: string;
}

const EventInformation: React.FC<Props> = ({ event, accessToken }) => {
  const addEvent = () => {};
  const updateEvent = () => {};
  const deleteEvent = () => {};
  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<EventContent | undefined>(undefined);
  const [form, setForm] = useState<JSX.Element[]>();
  const classes = useStyles();
  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(e.target.value);
  };
  const fillForm = () => {
    const builtForm = managableEventContent.map((label, index) => {
      const eventMap = new Map(Object.entries(event));
      const value = eventMap.get(label);
      return (
        <Grid key={index} item>
          <InputValidator
            viewErrorTrigger={0}
            validators={[
              (s) => {
                return true;
              },
            ]}
            // setIsValids={getValiditySetter("contactName")}
            errorMessages={["Vennligst skriv inn et navn"]}
            onChange={onFormChange}
            value={value ? value : "Har ingen verdi"}
            name="cname"
            id="kontaktnavn"
            label={label}
            disabled={!activeEdit}
          />
        </Grid>
      );
    });
    setForm(builtForm);
  };

  useEffect(fillForm, [activeEdit, event]);

  return (
    <Grid container direction="row">
      {form}
      <Grid item>
        <Button
          onClick={() => {
            setActiveEdit(!activeEdit);
          }}
        >
          <EditOutlinedIcon className={classes.icon}></EditOutlinedIcon>
        </Button>
        <Button>
          <ClearIcon className={classes.icon}></ClearIcon>
        </Button>
      </Grid>
    </Grid>
  );
};
export default EventInformation;
