import Gender from "../enums/Gender";

export const GENDERS: { value: Gender; text: string }[] = [
  { value: Gender.Male, text: "Mann" },
  { value: Gender.Female, text: "Kvinne" },
  { value: Gender.Other, text: "Ikke-binær" },
];
