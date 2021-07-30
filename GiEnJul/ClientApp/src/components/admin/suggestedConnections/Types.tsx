import Gender from "../../../common/enums/Gender";

export interface GiverType {
  email: string;
  fullName: string;
  maxReceivers: Number;
  rowKey: string;
}

export interface RecipientType {
  rowKey: string;
  partitionKey: string;
  familyId: string;

  dinner: string;
  dessert: string;
  note: string;

  contactFullName: string;
  contactEmail: string;
  contactPhoneNumber: string;

  institution: string;
  referenceId: string;

  familyMembers: PersonType[];
}
export interface PersonType {
  rowKey: string;
  wish: string;
  age: Number;
  gender: Gender;
}
