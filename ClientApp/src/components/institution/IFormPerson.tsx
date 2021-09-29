import Gender from "../../common/enums/Gender";
import { v4 as uuidv4 } from "uuid";

interface IFormPerson {
  uuid: string;
  age: string;
  month: string;
  gender: Gender;
  wish?: string; // Age-adjusted gift if undefined
  isValidAge: boolean;
  isValidGender: boolean;
  isValidWish: boolean;
}

export const getFormPerson: () => IFormPerson = () => ({
  uuid: uuidv4(),
  age: "",
  month: "",
  gender: Gender.Unspecified,
  wish: "",
  isValidAge: false,
  isValidGender: false,
  isValidWish: false,
});

export default IFormPerson;
