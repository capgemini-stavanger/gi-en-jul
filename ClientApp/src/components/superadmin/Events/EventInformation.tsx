import { Grid } from "@material-ui/core";

export interface EventContent {
  partitionKey: string; // used when fetching event
  rowKey: string; // used when fetching event
  eventName: string; // used when creating event
  city: string; // used when creating event
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  deliveryGPS: null; // unused
  deliveryTime: string;
  contactPerson: string;
  giverLimit: number;
  email: string;
  facebook: string; //url
  instagram: string; // url
  image: string; // url
  phoneNumber: string;
}

interface Props {
  event: Event;
  accessToken: string;
}

const EventInformation: React.FC<Props> = () => {
  // const EventInformation: React.FC<Props> = ({ event, accessToken }) => {
  //   const updateEvent = () => {};
  //   const deleteEvent = () => {};

  return (
    <Grid container>
      <Grid item></Grid>
    </Grid>
  );
};
export default EventInformation;
