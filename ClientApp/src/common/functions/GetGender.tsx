import Gender from "../enums/Gender";

export function getGender(gender: Gender, age: number) {
  if (age === undefined || age < 18) {
    switch (gender) {
      case Gender.Other:
        return "Ukjent";
      case Gender.Male:
        return "Gutt";
      case Gender.Female:
        return "Jente";
    }
  } else {
    switch (gender) {
      case Gender.Other:
        return "Ukjent";
      case Gender.Male:
        return "Mann";
      case Gender.Female:
        return "Kvinne";
    }
    return "Udefinert";
  }
}
