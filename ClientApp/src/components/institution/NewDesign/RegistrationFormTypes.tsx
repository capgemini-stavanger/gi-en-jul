import Gender from "common/enums/Gender";
import { v4 as uuidv4 } from "uuid";

interface IContact {
  name: string;
  phoneNumber: string;
  email: string;
}

interface IFoodFormData {
  radio: string;
  input: string;
}

export interface IFormPerson {
  uuid: string;
  age: string;
  months: string;
  gender: Gender;
  comment: string;
  wish?: string; // Age-adjusted gift if undefined
  isValidAge: boolean;
  isValidGender: boolean;
  isValidWish: boolean;
}

export interface IContactState {
  persons: IFormPerson[];
  location: string;
  dinner: IFoodFormData;
  dessert: IFoodFormData;
  specialNeeds: string;
  pid: string;
  pidError: boolean;
  pidHelperText: string;
  contact: IContact;
}

export type PersonType = {
  Wish?: string;
  Age: number;
  Months: number;
  Gender: Gender;
  Comment: string;
};

export type SubmitType = {
  Dinner?: string;
  Dessert?: string;
  Note?: string;
  Event?: string;
  Location?: string;
  ContactFullName?: string;
  ContactEmail?: string;
  ContactPhoneNumber?: string;
  Institution?: string;
  ReferenceId?: string;
  FamilyMembers?: PersonType[];
};

export const initState: {
  viewErrorTrigger: number;
  displayText: boolean;
  alert: {
    isLoading: boolean;
    msg: React.ReactNode;
    severity?: "error" | "info" | "success" | "warning";
    open: boolean;
  };
  dialog: {
    referenceId: string;
    familyId: string;
    open: boolean;
  };
} = {
  viewErrorTrigger: 0,
  displayText: false,
  alert: {
    isLoading: false,
    msg: "",
    severity: undefined,
    open: false,
  },
  dialog: {
    referenceId: "",
    familyId: "",
    open: false,
  },
};

const initFoodFormData: IFoodFormData = {
  radio: "",
  input: "",
};

export const getFormPerson: () => IFormPerson = () => ({
  uuid: uuidv4(),
  age: "0",
  months: "0",
  gender: Gender.Unspecified,
  comment: "",
  wish: "",
  isValidAge: true,
  isValidGender: false,
  isValidWish: false,
});

export const initFormDataState: () => IContactState = () => ({
  persons: [getFormPerson()],
  location: "",
  dinner: initFoodFormData,
  dessert: initFoodFormData,
  specialNeeds: "",
  pid: "",
  pidError: false,
  pidHelperText: "",
  contact: {
    name: "",
    phoneNumber: "",
    email: "",
  },
});

type ValidFormEntry = {
  [valid: string]: boolean;
};

export const initValidFormState: ValidFormEntry = {
  dinner: false,
  dessert: false,
  contactName: false,
  contactPhoneNumber: false,
  contactEmail: false,
};
