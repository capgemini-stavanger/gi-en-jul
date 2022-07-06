import Gender from "common/enums/Gender";
import { v4 as uuidv4 } from "uuid";
import { getFormWish, IFormWish } from "./FormWish";

interface IFormPerson {
  uuid: string;
  age: string;
  months: string;
  gender: Gender;
  comment: string;
  wish?: string; // Age-adjusted gift if undefined
  isValidAge: boolean;
  isValidGender: boolean;
  isValidWish: boolean;
  wishes: IFormWish[];
}

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
  wishes: [],
});

export default IFormPerson;
