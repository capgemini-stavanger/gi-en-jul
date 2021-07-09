import Gender from "../../common/enums/Gender";

interface IFormPerson {
  age: string;
  gender: Gender;
  wish?: string; // Age-adjusted gift if undefined
  isValidAge: boolean;
  isValidGender: boolean;
  isValidWish: boolean;
}

export default IFormPerson;
