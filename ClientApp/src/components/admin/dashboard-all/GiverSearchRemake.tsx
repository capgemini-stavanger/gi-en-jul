import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
import { GiverType } from "../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Props = {
  giverData: GiverType;
  giverIndex: number;
  selectedGiverIndex: number;
  setSelectedGiverIndex: () => void;
};

const GiverSearchRemake: React.FC<Props> = ({
  giverData,
  giverIndex,
  selectedGiverIndex,
  setSelectedGiverIndex,
}) => {
  const classes = useStyles();

  const [personExpanded, setPersonExpanded] = useState(false);

  return (
    <>
      <Box
        className={
          giverIndex == selectedGiverIndex ? classes.accordionSelected : classes.accordionNormal
        }
        onClick={(event) => {
          event.stopPropagation();
          setSelectedGiverIndex();
        }}
      >
        {personExpanded ? (
          <Button onClick={() => setPersonExpanded(false)}>
            <ExpandLessIcon />
          </Button>
        ) : (
          <Button onClick={() => setPersonExpanded(true)}>
            <ExpandMoreIcon />
          </Button>
        )}
      </Box>
    </>
  );
};
export default React.memo(GiverSearchRemake);

// https://github.com/caseywebdev/react-list

// Faster, but look into rendering instead
/*
<Box
  className={
    giverIndex == selectedGiverIndex ? classes.accordionSelected : classes.accordionNormal
  }
  onClick={(event) => {
    event.stopPropagation();
    setSelectedGiverIndex();
  }}
>
  <Box>
    {personExpanded ? (
      <Button onClick={() => setPersonExpanded(false)}>
        <ExpandLessIcon />
      </Button>
    ) : (
      <Button onClick={() => setPersonExpanded(true)}>
        <ExpandMoreIcon />
      </Button>
    )}
  </Box>
  {personExpanded && <Box>EXPANDED</Box>}
</Box>
*/

// Accordion seems too slow for this many entries, check list instead
/*
<Accordion
  expanded={personExpanded}
  className={
    giverIndex == selectedGiverIndex ? classes.accordionSelected : classes.accordionNormal
  }
  onClick={(event) => {
    event.stopPropagation();
    setSelectedGiverIndex();
  }}
>
  <AccordionSummary>
    <Typography>{giverData.fullName}</Typography>
    {personExpanded ? (
      <Button onClick={() => setPersonExpanded(false)}>
        <ExpandLessIcon />
      </Button>
    ) : (
      <Button onClick={() => setPersonExpanded(true)}>
        <ExpandMoreIcon />
      </Button>
    )}
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
      sit amet blandit leo lobortis eget.
    </Typography>
  </AccordionDetails>
</Accordion>
*/
