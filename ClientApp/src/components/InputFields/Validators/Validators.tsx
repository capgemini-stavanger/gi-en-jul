import validator from "validator";

export function isNotNull(inputValue: string) {
  return !!inputValue;
}

export function isInt(inputValue: string) {
  if (parseInt(inputValue) >= 0) {
    return true;
  }
  return false;
}

export function isPhoneNumber(inputValue: string) {
  // Returns true if norwegian number or foreign number starting with +{countryCode}
  inputValue = inputValue.trim();
  return !!(
    validator.isNumeric(inputValue)
  );
}

export function isEmail(inputValue: string) {
  return validator.isEmail(inputValue.trim());
}

export function isEqual(inputValue1?: string, inputValue2?: string) {
  return !!(inputValue1?.toLowerCase() == inputValue2?.toLowerCase());
}