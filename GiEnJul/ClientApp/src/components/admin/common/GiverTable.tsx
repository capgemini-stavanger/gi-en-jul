import * as React from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
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
};

const Datatable: React.FC<Props> = ({ data }) => {
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

  const deleteGiver = () => {

  }

  return (
    <Container>
      {data.map((giver) => (
        <Accordion
        key={giver.partitionKey}>
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
            <Avatar className={handleMatched(giver.hasConfirmedMatch)}>
              {giver.hasConfirmedMatch ? (
                <CheckRounded style={{ color: "#FFFFFF" }} />
              ) : (
                <CloseRounded style={{ color: "#F36161" }} />
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
          {/* <AccordionActions>
            <Button size="small" onClick={deleteGiver}> Slett giver</Button>
          </AccordionActions> */}
        </Accordion>
      ))}
    </Container>
  );
};

export default Datatable;
