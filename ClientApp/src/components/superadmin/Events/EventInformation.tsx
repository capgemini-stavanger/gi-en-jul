import { Grid } from "@material-ui/core";

export interface EventContent {
  eventName: string;
  municipality: string;
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  deliveryGPS: null;
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
