import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../Styles";
import { GiverType, RecipientType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
} from "@material-ui/icons";

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
          <Grid container xs={12} justifyContent="space-between">
            <Grid item xs={2}>
              <Typography>ID: {recipientData.familyId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                <PeopleOutline />
                {recipientData.familyMembers.length}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {recipientData.isSuggestedMatch ? (
                !recipientData.hasConfirmedMatch ? (
                  <Typography>
                    <ErrorOutlineOutlined style={{ color: "yellow" }} />
                    Foreslått
                  </Typography>
                ) : (
                  <Typography>
                    <CheckCircleOutline style={{ color: "green" }} />
                    Koblet
                  </Typography>
                )
              ) : (
                <Typography>
                  <CancelOutlined style={{ color: "red" }} />
                  Ikke koblet
                </Typography>
              )}
            </Grid>
            <Grid item xs={2}>
              {
                !recipientData.comment && <ChatBubbleOutline /> // remove ! to show all comments
              }
            </Grid>
            <Grid item xs={1}>
              {personExpanded ? (
                <Button onClick={() => setPersonExpanded(false)}>
                  <ExpandLessIcon />
                </Button>
              ) : (
                <Button onClick={() => setPersonExpanded(true)}>
                  <ExpandMoreIcon />
                </Button>
              )}
            </Grid>
          </Grid>
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
