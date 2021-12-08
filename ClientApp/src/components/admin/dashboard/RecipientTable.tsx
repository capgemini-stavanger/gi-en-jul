import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
  IconButton,
  capitalize
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Mail,
  Phone,
  FiberManualRecord,
} from "@material-ui/icons";
import * as React from "react";
import { RecipientType } from "components/shared/Types";
import useStyles from "components/admin/Styles";
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";
import EditFamily from "components/shared/EditFamily";
import getGender from "common/functions/GetGender";
import formatFamily from "common/functions/GetFamilySize"

type Props = {
  data: RecipientType[] | [];
  refreshRecipients: () => void;
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const DatatableRecipient: React.FC<Props> = ({
  data,
  refreshRecipients,
  handleRecipientChange,
}) => {
  const classes = useStyles();

  const [selectedRecipient, setSelectedRecipient] = useState({} as RecipientType)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(-1);

  const handleSelectedAccordion = (index: number) => {
    index != selected ? setSelected(index) : setSelected(-1)
  }

  const mergeRecipientTypes = (recipient: RecipientType) => {
    return Object.assign({} as RecipientType, recipient);
  }
  

  return (
    <Container>
      {data.map((recipient, index) => (
        <Accordion
          expanded={selected == index}
          key={recipient.rowKey}
          className={classes.accordionContainer}
          onChange={() => { handleRecipientChange(recipient) }}

          onClick={() => { handleSelectedAccordion(index) }}
        >
          <AccordionSummary
            onClick={() => {setSelectedRecipient(mergeRecipientTypes(recipient),)}}
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {"id: " + recipient.familyId}<br/>
              {recipient.referenceId && "ref: " + recipient.referenceId}
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
            <Typography>
            { !recipient.isSuggestedMatch &&
              <IconButton aria-label="expand row" size="small" onClick={() => {setOpen(true); setSelected(-1)}}>
                <EditIcon/>
              </IconButton>
              }
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className={classes.largeColumn}>
            <Typography style={{ fontWeight: 550, fontSize: 18 }} >Familiesammensetning:</Typography>
          </AccordionDetails>
          {recipient.familyMembers.map((person) => (
            <div key={person.rowKey}>
              <AccordionDetails>
                <Typography className={classes.smallColumn}>
                  {getGender(person.gender, person.age)}
                </Typography>
                <Typography className={classes.smallColumn}>
                  {" "}
                  {person.age} år{" "}
                </Typography>
                <Typography className={classes.largeColumn}>
                  {" "}
                  {person.wish ? person.wish : "Giver kjøper alderstilpasset gave. "}
                  <br/>
                  {person.comment  ? "Kommentar: "+person.comment : ""}
                </Typography>
              </AccordionDetails>
              <Divider />
            </div>
          ))}
          <AccordionDetails>
            <Typography className={classes.mediumColumn} style={{ fontWeight: 500, fontSize: 18 }}>
              Matønsker:{" "}
            </Typography>
            <Typography className={classes.largeColumn}>
              Middag: {capitalize(recipient.dinner)}, Dessert: {capitalize(recipient.dessert)} <br/>
              {recipient.note  ? "Kommentar på mat: "+recipient.note : ""}
            </Typography>
          </AccordionDetails>
          <Divider />
          <AccordionDetails>
            <Typography className={classes.mediumColumn} style={{ fontWeight: 500, fontSize: 18 }}>
              Kontaktperson:
            </Typography>
            <Typography className={classes.largeColumn}>
              {recipient.contactFullName}
              <br />
              <Phone /> {recipient.contactPhoneNumber}
              <br />
              <Mail /> {recipient.contactEmail}
              <br />
              {recipient.referenceId}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      { selectedRecipient.familyMembers &&
      <EditFamily
        recipientToUpdate={selectedRecipient}
        onClose={() => { setOpen(false)}}
        open={open} 
        refreshRecipients={() => refreshRecipients()}
        />
      }
    </Container>
  );
};

export default React.memo(DatatableRecipient);
