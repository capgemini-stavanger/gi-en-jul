import Gender from "../enums/Gender";

export interface SelectedConnectionType {
    giver?: GiverType;
    recipient: RecipientType;
  }
  
  export interface GiverType {
    email: string;
    eventName: string;
    fullName: string;
    hasConfirmedMatch: Boolean;
    isSuggestedMatch: Boolean;
    location: string;
    matchedRecipient?: string;
    maxReceivers: Number;
    partitionKey: string;
    rowKey: string;
    phoneNumber: string;
  }
  
  export interface RecipientType {
    contactEmail: string;
    contactFullName: string;
    contactPhoneNumber: string;
    dessert: string;
    dinner: string;
    eventName: string;
    familyMembers: PersonType[];
    hasConfirmedMatch: Boolean;
    institution: string;
    isSuggestedMatch: Boolean;
    location: string;
    matchedGiver?: GiverType;
    note: string;
    partitionKey: string;
    referenceId: string;
    rowKey: string;
    familyId: number;
  }
  export interface PersonType {
    partitionKey: string;
    rowKey: string;
    wish: string;
    age: Number;
    gender: Gender;
    comment: string;
  }
