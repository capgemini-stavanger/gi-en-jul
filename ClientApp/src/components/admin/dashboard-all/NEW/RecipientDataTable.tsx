import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import useStyles from "../Styles";
import { GiverType, RecipientType } from "../../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import RecipientDataCard from "./RecipientDataCard";

// Scrollbar style https://codesandbox.io/s/mz4lg?file=/src/CustomScrollbar.js:0-43

type Props = {
  recipientData: RecipientType[];
  selectedRecipientIndex: number;
  setSelectedRecipient: (giver: RecipientType) => void;
  setSelectedRecipientIndex: (idx: number) => void;
};

const RecipientDataTable: React.FC<Props> = ({
  recipientData,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
}) => {
  const classes = useStyles();

  return (
    <>
      RECIPIENT FILTER
      <Virtuoso
        totalCount={recipientData.length}
        itemContent={(index) => (
          <RecipientDataCard
            recipientData={recipientData[index]}
            recipientIndex={index}
            selectedRecipientIndex={selectedRecipientIndex}
            setSelectedRecipient={() => setSelectedRecipient(recipientData[index])}
            setSelectedRecipientIndex={() => setSelectedRecipientIndex(index)}
          />
        )}
      />
    </>
  );
};
export default RecipientDataTable;
