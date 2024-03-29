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
  event: string;
  giverId: string;
  phoneNumber: string;
  cancelFeedback: string;
  cancelDate: Date;
  cancelFamilyId: string;
  comment: string;
}

export interface RecipientType {
  recipientId: string;
  event: string;
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
  matchedGiver?: string;
  comment: string;
}
export interface PersonType {
  recipientId: string;
  personId: string;
  wishes: string[];
  age: number;
  months: number;
  gender: Gender;
  noWish: boolean;
}

export interface SelectedConnectionType {
  giver?: GiverType;
  recipient?: RecipientType;
}

export interface User {
  location?: string;
  role?: string;
  institution?: string;
  email?: string;
}
