import Gender from "../../common/enums/Gender";

interface IInstitutionPerson {
    age: string,
    gender: Gender,
    wish?: string,  // Age adjusted gift if undefined
    isValidAge: boolean,
    isValidGender: boolean,
    isValidWish: boolean,
}

export default IInstitutionPerson;
