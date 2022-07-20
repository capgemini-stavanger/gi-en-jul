export interface EventContent {
  id: string; // unique id, should be eventName + municipality
  eventName: string; // Jul{YY}
  municipality: string; // location
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  // deliveryGPS: string;
  deliveryTime: string;
  contactPerson: string;
  giverLimit: string;
  email: string;
  // facebook: string; //url
  // instagram: string; // url
  // image: string; // url to contact person image
  phoneNumber: string;
}
export interface EventContentDto {
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
export const EventContentInit = (): EventContent => {
  return {
    id: "",
    eventName: "", // Jul{YY}
    municipality: "", // location
    startDate: "", // YYYY-MM-DDThh:mm:ssZ
    endDate: "", // YYYY-MM-DDThh:mm:ssZ
    deliveryAddress: "",
    deliveryDate: "",
    // deliveryGPS: "",
    deliveryTime: "",
    contactPerson: "",
    giverLimit: "",
    email: "",
    // facebook: "", //url
    // instagram: "", // url
    // image: "", // url to contact person image
    phoneNumber: "",
  };
};

export const Dto2EventContent = (ecd: EventContentDto): EventContent => {
  return {
    ...ecd,
    id: ecd.eventName + ecd.municipality,
    giverLimit: ecd.giverLimit.toString(),
    startDate: new Date(ecd.startDate).toISOString().split("T")[0],
    endDate: new Date(ecd.endDate).toISOString().split("T")[0],
  };
};

export const EventContent2Dto = (ec: EventContent) => {
  return {
    ...ec,
    giverLimit: parseInt(ec.giverLimit),
    startDate: new Date(ec.startDate).toISOString(),
    endDate: new Date(ec.endDate).toISOString(),
  };
};
