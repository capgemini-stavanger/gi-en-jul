import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../Styles";
import { GiverType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Circle from "components/admin/dashboard-all/Circle";

type Props = {
  giverData: GiverType;
  giverIndex: number;
  selectedGiverIndex: number;
  setSelectedGiver: () => void;
  setSelectedGiverIndex: () => void;
  giverTable: boolean;
};

const DataCard: React.FC<Props> = ({
  giverData,
  giverIndex,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
  giverTable,
}) => {
  const classes = useStyles();

  const [personExpanded, setPersonExpanded] = useState(false);

  return (
    <>
      <Accordion
        expanded={personExpanded}
        className={
          giverIndex == selectedGiverIndex ? classes.accordionSelected : classes.accordionNormal
        }
        onClick={(event) => {
          event.stopPropagation();
          setSelectedGiver();
          setSelectedGiverIndex();
        }}
      >
        <AccordionSummary>
          <Typography>{giverData.fullName}</Typography>
          {giverData.isSuggestedMatch ? (
            //Styling should be in a seperate file
            !giverData.hasConfirmedMatch ? (
              <Circle color="yellow" />
            ) : (
              <Circle color="green" />
            )
          ) : (
            <Circle color="red" />
          )}
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
    </>
  );
};
export default DataCard;
