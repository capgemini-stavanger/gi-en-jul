export interface ICategories {
  type: string;
  sub1?: string;
}

export interface ISizes {
  type: string;
  s1?: string;
  s2?: string;
  s3?: string;
  s4?: string;
  s5?: string;
  s6?: string;
  s7?: string;
  s8?: string;
  s9?: string;
  s10?: string;
}

export const Categories: ICategories[] = [
  { type: "Klær", sub1: "kjole" },
  { type: "Sko", sub1: "støvler" },
  { type: "Gavekort", sub1: "sentrum" },
  { type: "Leker" },
  { type: "Annet", sub1: "" },
];
