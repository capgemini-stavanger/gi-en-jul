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
  data: [GiverType] | [];
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

  return (
    <Container>
      {data.map((x) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{x.fullName}</Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(x.maxRecievers)}
            </Typography>
            <Typography>
              <Avatar className={handleMatched(x.hasConfirmedMatch)}>
                {x.hasConfirmedMatch ? (
                  <CheckRounded style={{ color: "#FFFFFF" }} />
                ) : (
                  <CloseRounded style={{ color: "#FFFFFF" }} />
                )}
              </Avatar>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {x.phoneNumber}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              <Mail />
              {x.email}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Datatable;