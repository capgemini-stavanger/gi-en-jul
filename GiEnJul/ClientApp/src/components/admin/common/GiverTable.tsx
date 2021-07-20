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
import { GiverType } from "../overview/Types";
import useStyles from "./Styles";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (
    newGiverRowKey: string,
    newGiverPartitionKey: string
  ) => void;
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

  return (
    <Container>
      {data.map((giver, index) => (
        <Accordion
          onChange={() => handleGiverChange(giver.rowKey, giver.partitionKey)}
          key={`acc_giver_${index}`}
          //Styling should be in a seperate file
          style={
            giver.isSelected
              ? {
                  background:
                    "linear-gradient(45deg, #D6F0EB 30%, #E2FFF9 90%)",
                }
              : { background: "white" }
          }
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
              <CheckRounded style={{ color: "#49a591" }} />
            ) : (
              <CloseRounded style={{ color: "#ed8175" }} />
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
        </Accordion>
      ))}
    </Container>
  );
};

export default Datatable;
