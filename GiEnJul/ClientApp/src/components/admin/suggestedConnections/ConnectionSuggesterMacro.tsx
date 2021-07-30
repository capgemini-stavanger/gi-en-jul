import React, { useState } from "react";
import RecipientSuggestions from "./RecipientTable";

function ConnectionSuggesterMacro() {
  const [selectedRecipient, setSelectedRecipient] = useState<[string, string]>([
    "",
    "",
  ]);

  const updateSelectedRecipient = (newSelected: [string, string]): void => {
    setSelectedRecipient(newSelected);
  };

  return (
    <>
      <RecipientSuggestions selectRecipient={updateSelectedRecipient} />
    </>
  );
}

export default ConnectionSuggesterMacro;
