import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Mail,
  Phone,
  FiberManualRecord,
} from "@material-ui/icons";
import * as React from "react";
import Gender from "../../../common/enums/Gender";
import { RecipientType } from "../overview/Types";
import useStyles from "./Styles";

type Props = {
  data: RecipientType[] | [];
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const DatatableRecipient: React.FC<Props> = ({
  data,
  handleRecipientChange,
}) => {
  const classes = useStyles();

  const formatFamily = (input: Number) => {
    if (input < 3) {
      return "< 3";
    }
    if (input > 5) {
      return "> 5";
    } else {
      return "3 - 5";
    }
  };

  const handleGender = (gender: Gender, age: Number) => {
    if (age < 18) {
      switch (gender) {
        case Gender.Other:
          return "Ukjent";
        case Gender.Male:
          return "Gutt";
        case Gender.Female:
          return "Jente";
        default:
      }
    } else {
      switch (gender) {
        case Gender.Other:
          return "Ukjent";
        case Gender.Male:
          return "Mann";
        case Gender.Female:
          return "Kvinne";
        default:
      }
    }
  };

  return (
    <Container>
      {data.map((recipient) => (
        <Accordion
          onChange={() => handleRecipientChange(recipient)}
          key={recipient.rowKey}
          className={classes.accordionContainer}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {recipient.familyId}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(recipient.familyMembers.length)}
            </Typography>
            {recipient.isSuggestedMatch ? (
              //Styling should be in a seperate file
              !recipient.hasConfirmedMatch ? (
                <FiberManualRecord
                  fontSize="large"
                  style={{ color: "#f4cf8a" }}
                />
              ) : (
                <FiberManualRecord
                  fontSize="large"
                  style={{ color: "#49a591" }}
                />
              )
            ) : (
              <FiberManualRecord
                fontSize="large"
                style={{ color: "#ed8175" }}
              />
            )}
          </AccordionSummary>
          <Divider />
          <AccordionDetails className={classes.largeColumn}>
            <Typography>Ønsker:</Typography>
          </AccordionDetails>
          {recipient.familyMembers.map((person) => (
            <div key={person.rowKey}>
              <AccordionDetails>
                <Typography className={classes.smallColumn}>
                  {handleGender(person.gender, person.age)}
                </Typography>
                <Typography className={classes.smallColumn}>
                  {" "}
                  {person.age} år{" "}
                </Typography>
                <Typography className={classes.largeColumn}>
                  {" "}
                  {person.wish}{" "}
                </Typography>
              </AccordionDetails>
              <Divider />
            </div>
          ))}
          <AccordionDetails>
            <Typography className={classes.mediumColumn}>
              Matønsker:{" "}
            </Typography>
            <Typography className={classes.largeColumn}>
              {recipient.dinner}, {recipient.dessert} {recipient.note}
            </Typography>
          </AccordionDetails>
          <Divider />
          <AccordionDetails>
            <Typography className={classes.mediumColumn}>
              Kontaktperson:
            </Typography>
            <Typography className={classes.largeColumn}>
              {recipient.contactFullName}
              <br />
              <Phone /> {recipient.contactPhoneNumber}
              <br />
              <Mail /> {recipient.contactEmail}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default React.memo(DatatableRecipient);
