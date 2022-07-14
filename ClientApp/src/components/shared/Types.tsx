import Gender from "common/enums/Gender";

export interface GiverType {
  email: string;
  eventName: string;
  fullName: string;
  hasConfirmedMatch: boolean;
  isSuggestedMatch: boolean;
  location: string;
  matchedRecipient?: string;
  matchedFamilyId?: string;
  maxReceivers: number;
  partitionKey: string;
  rowKey: string;
  phoneNumber: string;
  cancelFeedback: string;
  cancelDate: Date;
  cancelFamilyId: string;
  comment: string;
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
  hasConfirmedMatch: boolean;
  isSuggestedMatch: boolean;
  location: string;
  matchedGiver?: GiverType;
  comment: string;
}
export interface PersonType {
  partitionKey: string;
  rowKey: string;
  wish: string;
  age: number;
  months: number;
  gender: Gender;
  comment: string;
}

export interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}
