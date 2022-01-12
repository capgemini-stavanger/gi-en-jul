import Gender from "common/enums/Gender";

export interface GiverType {
  email: string;
  eventName: string;
  fullName: string;
  hasConfirmedMatch: Boolean;
  isSuggestedMatch: Boolean;
  location: string;
  matchedRecipient?: string;
  matchedFamilyId?: string;
  maxReceivers: number;
  partitionKey: string;
  rowKey: string;
  phoneNumber: string;
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

  eventName: string;
  hasConfirmedMatch: Boolean;
  isSuggestedMatch: Boolean;
  location: string;
  matchedGiver?: GiverType;
}
export interface PersonType {
  partitionKey: string;
  rowKey: string;
  wish: string;
  age: number;
  gender: Gender;
  comment: string;
}

export interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}
