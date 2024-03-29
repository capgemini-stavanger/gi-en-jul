export interface EventContent {
  id: string; // unique id, should be eventName + municipality
  eventName: string; // Jul{YY}
  municipality: string; // location
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  signUpDueDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  // deliveryGPS: string;
  deliveryTime: string;
  giverLimit: string;
}
export interface EventContentDto {
  eventName: string; // Jul{YY}
  municipality: string; // location
  startDate: string; // YYYY-MM-DDThh:mm:ssZ
  endDate: string; // YYYY-MM-DDThh:mm:ssZ
  signUpDueDate: string; // YYYY-MM-DDThh:mm:ssZ
  deliveryAddress: string;
  deliveryDate: string;
  // deliveryGPS: string;
  deliveryTime: string;
  giverLimit: number;
}
export const EventContentInit = (): EventContent => {
  return {
    id: "",
    eventName: "", // Jul{YY}
    municipality: "", // location
    startDate: "", // YYYY-MM-DDThh:mm:ssZ
    endDate: "", // YYYY-MM-DDThh:mm:ssZ
    signUpDueDate: "", // YYYY-MM-DDThh:mm:ssZ
    deliveryAddress: "",
    deliveryDate: "",
    // deliveryGPS: "",
    deliveryTime: "",
    giverLimit: "",
  };
};

export const Dto2EventContent = (ecd: EventContentDto): EventContent => {
  return {
    ...ecd,
    id: ecd.eventName + ecd.municipality,
    giverLimit: ecd.giverLimit.toString(),
    startDate: new Date(ecd.startDate).toISOString().split("T")[0],
    endDate: new Date(ecd.endDate).toISOString().split("T")[0],
    signUpDueDate: !ecd.signUpDueDate
      ? ""
      : new Date(ecd.signUpDueDate).toISOString().split("T")[0],
  };
};

export const EventContent2Dto = (ec: EventContent) => {
  return {
    ...ec,
    giverLimit: parseInt(ec.giverLimit),
  };
};

export const ConvertDateToLocalString = (date: Date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};
