import Gender from "../../../common/enums/Gender";

export interface GiverType {
  rowKey: string;
  partitionKey: string;

  email: string;
  fullName: string;
  maxReceivers: number;
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
  partitionKey: string;
  rowKey: string;
  wish: string;
  age: number;
  gender: Gender;
}
