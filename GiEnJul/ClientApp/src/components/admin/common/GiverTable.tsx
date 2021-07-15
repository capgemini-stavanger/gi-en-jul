import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Phone,
  Mail,
  CheckRounded,
  CloseRounded,
} from "@material-ui/icons";
import { GiverType } from "../overview/Giver";
import useStyles from "./Styles";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiverRowKey: string,
  newGiverPartitionKey: string) => void;
};



const Datatable: React.FC<Props> = ({ data, handleGiverChange }) => {
  const classes = useStyles();

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

  const handleMatched = (input: Boolean) => {
    if (input) {
      return classes.matched;
    } else {
      return classes.notMatched;
    }
  };


  return (
    <Container>
      {data.map((giver) => (
        <Accordion
        onChange={() => handleGiverChange(giver.rowKey, giver.partitionKey)}
        key={giver.rowKey}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{giver.fullName}</Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(giver.maxRecievers)}
            </Typography>
            <Avatar className={handleMatched(giver.isSuggestedMatch)}>
              {giver.isSuggestedMatch ? (
                <CheckRounded style={{ color: "#49a591" }} />
              ) : (
                <CloseRounded style={{ color: "#ed8175" }} />
              )}
            </Avatar>
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
        </Accordion>
      ))}
    </Container>
  );
};

export default Datatable;
