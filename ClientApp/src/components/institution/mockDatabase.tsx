export interface ICategories {
  type: string;
  sub1: string;
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
  { type: "Annet", sub1: "" },
];

export const Sizes: ISizes[] = [
  { type: "XXXS" },
  { type: "XXS" },
  { type: "XS", s1: "XS", s2: "S", s3: "M", s4: "L", s5: "XL" },
  { type: "S", s1: "35", s2: "36", s3: "37", s4: "38", s5: "39", s6: "40" },
  { type: "M" },
  { type: "L" },
  { type: "XL" },
  { type: "XXL" },
  { type: "3XL" },
];
