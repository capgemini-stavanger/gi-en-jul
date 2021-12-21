import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
  IconButton,
  capitalize,
  Button
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Mail,
  Phone,
  FiberManualRecord,
  Delete,
} from "@material-ui/icons";
import * as React from "react";
import Gender from "../../../common/enums/Gender";
import { RecipientType } from "../../../common/components/Types";
import useStyles from "./Styles";
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";
import * as Types from "../suggestedConnections/Types";
import EditFamily from "../../../common/components/EditFamily";
import DeleteTypeDialog from "../overview/DeleteTypeDialog";

type Props = {
  data: RecipientType[] | [];
  refreshData: () => void;
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const DatatableRecipient: React.FC<Props> = ({
  data,
  refreshData,
  handleRecipientChange,
}) => {
  const classes = useStyles();

  const [selectedRecipient, setSelectedRecipient] = useState({} as Types.RecipientType)
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(-1);

  const handleSelectedAccordion = (index: number) => {
    index != selected ? setSelected(index) : setSelected(-1)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const mergeRecipientTypes = (recipient: RecipientType) => {
    return Object.assign({} as Types.RecipientType, recipient);
  }
  
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
                  {handleGender(person.gender, person.age)}
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
          <AccordionDetails>
            <Typography onClick={handleOpenDialog}>
              <Delete />
              <Button>
                Slett familie
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      { selectedRecipient.familyMembers &&
      <EditFamily
        recipientToUpdate={selectedRecipient}
        onClose={() => { setOpen(false)}}
        open={open} 
        refreshRecipients={() => refreshData()}
        />
      }
      <DeleteTypeDialog 
          open={openDialog}
          handleClose={handleCloseDialog} 
          typeData={selectedRecipient} 
          refreshData={refreshData} 
          type={"Recipient"}
          />
    </Container>
  );
};

export default React.memo(DatatableRecipient);
