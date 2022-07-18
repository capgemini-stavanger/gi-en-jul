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
import { GiverType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
} from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";

type Props = {
  giverData: GiverType;
  giverIndex: number;
  selectedGiverIndex: number;
  setSelectedGiver: () => void;
  setSelectedGiverIndex: () => void;
};

const GiverDataCard: React.FC<Props> = ({
  giverData,
  giverIndex,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
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
          <Grid container xs={12} justifyContent="space-between">
            <Grid item xs={2}>
              <Typography>{giverData.fullName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                <PeopleOutline />
                {formatFamily(giverData.maxReceivers)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {giverData.isSuggestedMatch ? (
                !giverData.hasConfirmedMatch ? (
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
                !giverData.comment && <ChatBubbleOutline /> // remove ! to show all comments
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
export default GiverDataCard;
