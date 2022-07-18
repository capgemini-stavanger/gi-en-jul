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
import { GiverType, RecipientType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Props = {
  recipientData: RecipientType;
  recipientIndex: number;
  selectedRecipientIndex: number;
  setSelectedRecipient: () => void;
  setSelectedRecipientIndex: () => void;
};

const RecipientDataCard: React.FC<Props> = ({
  recipientData,
  recipientIndex,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
}) => {
  const classes = useStyles();

  const [personExpanded, setPersonExpanded] = useState(false);

  return (
    <>
      <Accordion
        expanded={personExpanded}
        className={
          recipientIndex == selectedRecipientIndex
            ? classes.accordionSelected
            : classes.accordionNormal
        }
        onClick={(event) => {
          event.stopPropagation();
          setSelectedRecipient();
          setSelectedRecipientIndex();
        }}
      >
        <AccordionSummary>
          <Typography>{recipientData.institution}</Typography>
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
export default RecipientDataCard;
