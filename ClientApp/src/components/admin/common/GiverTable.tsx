import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  Delete,
  ExpandMore,
  Group,
  Mail,
  Phone,
} from "@material-ui/icons";
import React, { useState } from "react";
import { GiverType } from "../../../common/components/Types";
import Circle from "./Circle";
import useStyles from "./Styles";

type Props = {
  data: GiverType[] | [];
  handleOpen: () => void;
  handleGiverChange: (newGiver: GiverType) => void;
};

const Datatable: React.FC<Props> = ({ data, handleGiverChange, handleOpen }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<GiverType | false>(false);
  const handleChange = (giver:GiverType) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? giver : false);
    handleGiverChange(giver);
  };

  const formatFamily = (input: Number) => {
    if (input === 2) {
      return "< 3";
    }
    if (input === 5) {
      return "3 - 5";
    } else {
      return "> 5";
    }
  };

  return (
    <Container>
      {data.map((giver) => (
        <Accordion expanded={expanded===giver}
          onChange = {handleChange(giver)}
          key={giver.rowKey}
          className={classes.accordionContainer}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {giver.fullName}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(giver.maxReceivers)}
            </Typography>
            {giver.isSuggestedMatch ? (
              //Styling should be in a seperate file
              !giver.hasConfirmedMatch ? (
                <Circle color="yellow" />
              ) : (
                <Circle color="green" />
              )
            ) : (
              <Circle color="red" />
            )}
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {giver.phoneNumber}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              <Mail />
              {giver.email}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography onClick={handleOpen}>
              <Delete />
              <Button>
                Slett giver
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        ))}
    </Container>
  );
};

export default React.memo(Datatable);
