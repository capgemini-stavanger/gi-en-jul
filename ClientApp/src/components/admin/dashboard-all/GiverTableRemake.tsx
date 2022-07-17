import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./Styles";
import { GiverType } from "../../shared/Types";
import { Virtuoso } from "react-virtuoso";
import GiverDataRemake from "./GiverDataRemake";

type Props = {
  giverData: GiverType[];
  selectedGiverIndex: number;
  setSelectedGiverIndex: (idx: number) => void;
};

const GiverTableRemake: React.FC<Props> = ({
  giverData,
  selectedGiverIndex,
  setSelectedGiverIndex,
}) => {
  const classes = useStyles();

  const [testFilter, setTestFilter] = useState<GiverType[]>([]);

  // INVESTIGATE THIS SOLUTION
  useEffect(() => {
    setTestFilter([...giverData]);
  }, [giverData]);

  // INVESTIGATE THE INDEX SOLUTION -> Once filtered, the index does not correspond entierly (?)
  return (
    <>
      <Box className={classes.giverTable}>
        GIVER FILTER
        <Button onClick={() => setTestFilter(testFilter.slice(5, 20))}> FILTER </Button>
        <Button onClick={() => console.log(selectedGiverIndex)}> CHECK </Button>
        <Virtuoso
          style={{ height: "450px" }}
          totalCount={testFilter.length}
          itemContent={(index) => (
            <GiverDataRemake
              giverData={testFilter[index]}
              giverIndex={index}
              selectedGiverIndex={selectedGiverIndex}
              setSelectedGiverIndex={() => setSelectedGiverIndex(index)}
            />
          )}
        />
      </Box>
    </>
  );
};
export default GiverTableRemake;
