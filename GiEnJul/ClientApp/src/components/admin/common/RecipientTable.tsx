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
import { RecipientType } from "../overview/Types";
import useStyles from "./Styles";
import Gender from "../../../common/enums/Gender";


type Props = {
  data: RecipientType[] | [];
  handleRecipientChange: (
    newRecipientRowKey: string,
    newRecipientPartitionKey: string
  ) => void;
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
      {data.map((recipient, index) => (
        <Accordion
          onChange={() =>
            handleRecipientChange(recipient.rowKey, recipient.partitionKey)
          }
          key={`acc_recipient_${index}`}
          style={
            recipient.isSelected
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
              {recipient.referenceId}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(recipient.familyMembers.length)}
            </Typography>
            {recipient.isSuggestedMatch ? (
              <CheckRounded style={{ color: "#49a591" }} />
            ) : (
              <CloseRounded style={{ color: "#ed8175" }} />
            )}
          </AccordionSummary>
          <Divider />
          <AccordionDetails className={classes.largeColumn}>
            <Typography>Ønsker:</Typography>
          </AccordionDetails>
          {recipient.familyMembers.map((person, personIndex) => (
            <div key={`acc_person_${index}_${personIndex}`}>
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

export default DatatableRecipient;
