import validator from "validator";

export function isNotNull(inputValue: string) {
    return !!inputValue;
}

export function isPhoneNumber(inputValue: string) {
    // Returns true if norwegian number or foreign number starting with +{countryCode}
    return !!(validator.isMobilePhone(inputValue, ["nb-NO", "nn-NO"]) ||
        (inputValue && inputValue.startsWith("+") && validator.isMobilePhone(inputValue)));
}

export function isEmail(inputValue: string) {
    return validator.isEmail(inputValue);
}
