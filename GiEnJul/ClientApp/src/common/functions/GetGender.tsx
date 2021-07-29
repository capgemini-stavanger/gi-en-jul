import { capitalize } from "@material-ui/core";
import { GENDERS } from "../constants/Genders";

export function getGender(key: number) {
  const gender = GENDERS.find((element) => element.value == key)?.text;
  if (gender == null) return "Udefinert";
  return capitalize(gender);
}
