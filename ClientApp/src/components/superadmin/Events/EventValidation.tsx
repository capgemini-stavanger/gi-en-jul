export const EventErrors = {
  emptyString: "Kan ikke være en tom string",
  keyCombinationExists: "Event / Kommune kombinasjonen finnes allerede",
  wrongDateFormat: "Vennligst skriv inn dato på formen åååå-mm-dd",
  notANumber: "Vennligst tast inn et tall",
  notAnEmail: "Vennligst fyll inn en gyldig email",
  notAPhoneNumber: "Vennligst fyll inn ett gyldig telefonnr",
};

export const EventInputValidators = {
  emptyString: (s: string) => {
    return s.length > 0;
  },
  // combination is eventName:string + municipality:string
  keyCombinationExists: (combinations: string[], newCombination: string) => {
    return !combinations.includes(newCombination);
  },
  notANumber: (maybeNumber: string) => {
    return !isNaN(+maybeNumber);
  },
  notAnEmail: (maybeEmail: string) => {
    return !!String(maybeEmail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },
  notADate: (maybeDate: string) => {
    return !!Date.parse(maybeDate);
  },
  notAPhoneNumber: (maybePhoneNumber: string) => {
    return !!String(maybePhoneNumber)
      .replace(/\s/g, "")
      .match(/^(0047|\+47|47)?[2-9]\d{7}$/);
  },
};

// export function isNotNull(inputValue: string) {
//   return !!inputValue;
// }

// export function isInt(inputValue: string) {
//   if (parseInt(inputValue) >= 0) {
//     return true;
//   }
//   return false;
// }

// export function isPhoneNumber(inputValue: string) {
//   // Returns true if norwegian number or foreign number starting with +{countryCode}
//   inputValue = inputValue.trim();
//   return !!validator.isNumeric(inputValue);
// }

// export function isEmail(inputValue: string) {
//   return validator.isEmail(inputValue.trim());
// }

// export function isEqual(inputValue1?: string, inputValue2?: string) {
//   return !!(inputValue1?.toLowerCase() == inputValue2?.toLowerCase());
// }
