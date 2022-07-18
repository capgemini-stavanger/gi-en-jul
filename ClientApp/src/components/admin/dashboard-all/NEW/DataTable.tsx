import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../Styles";
import { GiverType } from "../../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import DataCard from "./DataCard";

type Props = {
  giverData: GiverType[];
  selectedGiverIndex: number;
  setSelectedGiver: (giver: GiverType) => void;
  setSelectedGiverIndex: (idx: number) => void;
  giverTable: boolean; // Determines the content of the component
};

const DataTable: React.FC<Props> = ({
  giverData,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
  giverTable,
}) => {
  const classes = useStyles();

  const [testFilter, setTestFilter] = useState<GiverType[]>([]);

  // INVESTIGATE THE INDEX SOLUTION -> Once filtered, the index does not correspond entierly (?)
  return (
    <>
      <Box className={classes.giverTable}>
        GIVER FILTER
        <Button onClick={() => setTestFilter(testFilter.slice(5, 20))}> FILTER </Button>
        <Virtuoso
          style={{ height: "450px" }}
          totalCount={giverData.length}
          itemContent={(index) => (
            <DataCard
              giverData={giverData[index]}
              giverIndex={index}
              selectedGiverIndex={selectedGiverIndex}
              setSelectedGiver={() => setSelectedGiver(giverData[index])}
              setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
              giverTable={giverTable}
            />
          )}
        />
      </Box>
    </>
  );
};
export default DataTable;
