import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../Styles";
import { GiverType } from "../../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import GiverDataCard from "./GiverDataCard";

type Props = {
  giverData: GiverType[];
  selectedGiverIndex: number;
  setSelectedGiver: (giver: GiverType) => void;
  setSelectedGiverIndex: (idx: number) => void;
};

const GiverDataTable: React.FC<Props> = ({
  giverData,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
}) => {
  const classes = useStyles();

  return (
    <>
      GIVER FILTER
      <Virtuoso
        totalCount={giverData.length}
        itemContent={(index) => (
          <GiverDataCard
            giverData={giverData[index]}
            giverIndex={index}
            selectedGiverIndex={selectedGiverIndex}
            setSelectedGiver={() => setSelectedGiver(giverData[index])}
            setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
          />
        )}
      />
    </>
  );
};
export default GiverDataTable;
