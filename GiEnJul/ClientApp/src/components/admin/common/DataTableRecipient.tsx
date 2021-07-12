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
import { RecipientType } from "../overview/Recipient";
import useStyles from "./Styles";

type Props = {
  data: [RecipientType] | [];
};

const DatatableRecipient: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  const formatFamily = (input: Number) => {
    if (input < 3) {
      return "< 3";
    }
    if (input < 5 && input > 3) {
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
      {data.map((x) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{x.referenceId}</Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(x.familyMembers.length)}
            </Typography>
              <Avatar className={handleMatched(x.hasConfirmedMatch)}>
                {x.hasConfirmedMatch ? (
                  <CheckRounded style={{ color: "#FFFFFF" }} />
                ) : (
                  <CloseRounded style={{ color: "#F36161" }} />
                )}
              </Avatar>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {x.contactPhoneNumber}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              <Mail />
              {x.contactEmail}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default DatatableRecipient;