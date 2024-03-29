export const EventErrors = {
  emptyString: "Feltet kan ikke være tomt",
  keyCombinationExists: "Event/Kommune kombinasjonen finnes allerede",
  wrongDateFormat: "Vennligst skriv inn dato på formen åååå-mm-dd",
  notANumber: "Vennligst skriv inn ett gyldig tall",
  notAnEmail: "Vennligst skriv inn en gyldig email",
  notAPhoneNumber: "Vennligst skriv inn ett gyldig telefonnr",
};

export const EventInputValidators = {
  emptyString: (s: string) => {
    return s === null || s.length > 0;
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
  notEmptyOrADate: (maybeDate: string) => {
    return !maybeDate || !!Date.parse(maybeDate);
  },
  notAPhoneNumber: (maybePhoneNumber: string) => {
    return !!String(maybePhoneNumber)
      .replace(/\s/g, "")
      .match(/^(0047|\+47|47)?[2-9]\d{7}$/);
  },
};
