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
  noWish: boolean;
  wishes: IFormWish[];
  isValidAge: boolean;
  isValidGender: boolean;
}

export interface IFormWish {
  wish: string[];
  category: number;
  isValidWish: boolean;
}

export enum WishCategory {
  Location,
  Size,
  Specifiction,
}
export enum TotalWish {
  Category,
  LocationOrSpecification,
  Size,
}

export interface IContactState {
  persons: IFormPerson[];
  location: string;
  dinner: IFoodFormData;
  dinners: string;
  dessert: IFoodFormData;
  desserts: string;
  specialNeeds: string;
  pid: string;
  pidError: boolean;
  pidHelperText: string;
  contact: IContact;
}

export type PersonType = {
  Wishes: string[];
  Age: number;
  Months: number;
  Gender: Gender;
  NoWish: boolean;
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
  months: "1",
  gender: Gender.Unspecified,
  noWish: false,
  wishes: [getFormWish()],
  isValidAge: true,
  isValidGender: false,
});

export const getFormWish: () => IFormWish = () => ({
  wish: ["", "", ""],
  category: -1,
  isValidWish: false,
});

export const initFormDataState: () => IContactState = () => ({
  persons: [getFormPerson()],
  location: "",
  dinner: initFoodFormData,
  dinners: "",
  dessert: initFoodFormData,
  desserts: "",
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
  contactPhone: true,
  contactEmail: true,
};
