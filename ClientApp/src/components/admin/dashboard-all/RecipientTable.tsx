import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
  capitalize,
  Button,
  Box,
  TextField,
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Mail,
  Phone,
  FiberManualRecord,
  Delete,
  LinkOff,
  Edit,
  ChatBubbleOutline,
} from "@material-ui/icons";
import * as React from "react";
import { RecipientType } from "components/shared/Types";
import useStyles from "components/admin/Styles";
import { useState } from "react";
import getGender from "common/functions/GetGender";
import formatFamily from "common/functions/GetFamilySize";
import DeleteTypeDialog from "components/admin/dashboard-all/DeleteTypeDialog";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";
import ConfirmationBox from "components/shared/ConfirmationBox";
import ApiService from "common/functions/apiServiceClass";

type Props = {
  data: RecipientType[] | [];
  refreshData: () => void;
  handleRecipientChange: (newRecipient: RecipientType) => void;
};

const DatatableRecipient: React.FC<Props> = ({ data, refreshData, handleRecipientChange }) => {
  const classes = useStyles();

  const [selectedRecipient, setSelectedRecipient] = useState({} as RecipientType);
  const [open, setOpen] = useState(false);
  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState<string | null>("");
  const [selected, setSelected] = useState(-1);
  const [deleteObj, setDeleteObj] = useState({});
  const [comment, setComment] = useState("");
  const [openConfirmationComment, setOpenConfirmationComment] = useState(false);
  const apiservice = new ApiService();

  const handleSelectedAccordion = (index: number) => {
    index != selected ? setSelected(index) : setSelected(-1);
  };

  const handleOpenDialog = (deleteObj: any = {}) => {
    setDeleteObj(deleteObj);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const mergeRecipientTypes = (recipient: RecipientType) => {
    return Object.assign({} as RecipientType, recipient);
  };

  const saveComment = () => {
    if (selectedRecipient) {
      apiservice
        .post("admin/recipient/addcomment", {
          event: selectedRecipient.event,
          recipientId: selectedRecipient.recipientId,
          comment: comment,
        })
        .then((resp) => {
          if (resp.status === 200) {
            selectedRecipient.comment = comment;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Container>
      {data.map((recipient, index) => (
        <Accordion
          expanded={selected == index}
          key={index}
          className={classes.accordionContainer}
          onChange={() => {
            handleRecipientChange(recipient);
            setComment(recipient.comment);
            handleSelectedAccordion(index);
          }}
        >
          <AccordionSummary
            onClick={() => {
              setSelectedRecipient(mergeRecipientTypes(recipient));
            }}
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {"id: " + recipient.familyId}
              <br />
              {recipient.referenceId && "ref: " + recipient.referenceId}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(recipient.familyMembers.length)}
            </Typography>
            {recipient.isSuggestedMatch ? (
              //Styling should be in a seperate file
              !recipient.hasConfirmedMatch ? (
                <FiberManualRecord fontSize="large" style={{ color: "#f4cf8a" }} />
              ) : (
                <FiberManualRecord fontSize="large" style={{ color: "#49a591" }} />
              )
            ) : (
              <FiberManualRecord fontSize="large" style={{ color: "#ed8175" }} />
            )}
            {recipient.comment && <ChatBubbleOutline />}
          </AccordionSummary>
          <Divider />
          <AccordionDetails className={classes.largeColumn}>
            <Typography style={{ fontWeight: 550, fontSize: 18 }}>Familiesammensetning:</Typography>
          </AccordionDetails>
          {recipient.familyMembers.map((person, index) => (
            <div key={index}>
              <AccordionDetails>
                <Typography className={classes.smallColumn}>
                  {getGender(person.gender, person.age)}
                </Typography>
                <Typography className={classes.smallColumn}> {person.age} år </Typography>
                <Typography className={classes.largeColumn}>
                  {" "}
                  {person.noWish ? person.wishes : "Giver kjøper alderstilpasset gave. "}
                  <br />
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
              Middag: {capitalize(recipient.dinner)}, Dessert: {capitalize(recipient.dessert)}{" "}
              <br />
              {recipient.note ? "Kommentar på mat: " + recipient.note : ""}
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
              <Typography className={classes.emailButton}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenMailDialog(true), setSelectedRecipient(recipient);
                  }}
                  endIcon={<SendIcon />}
                >
                  Send Email
                </Button>
              </Typography>
              <br />
              {recipient.referenceId}
            </Typography>
          </AccordionDetails>
          {recipient.isSuggestedMatch && (
            <AccordionDetails>
              <Typography
                onClick={() => {
                  setType(null);
                  handleOpenDialog({
                    event: recipient.event,
                    connectedIds: `${recipient.recipientId}_${recipient.matchedGiver}`,
                    fullName: recipient.matchedGiver,
                    familyId: recipient.familyId,
                  });
                }}
              >
                <LinkOff />
                <Button>Koble fra giver og familie</Button>
              </Typography>
            </AccordionDetails>
          )}
          {!recipient.isSuggestedMatch && (
            <AccordionDetails>
              <Typography
                onClick={() => {
                  setOpen(true);
                  setSelectedRecipient(recipient);
                }}
              >
                <Edit />
                <Button>Rediger familie</Button>
              </Typography>
            </AccordionDetails>
          )}
          <AccordionDetails>
            <Typography
              onClick={() => {
                setType("Recipient");
                handleOpenDialog(recipient);
              }}
            >
              <Delete />
              <Button>Slett familie</Button>
            </Typography>
            <Divider />
            <Box>
              <TextField
                id="outlined-multiline-static"
                variant="outlined"
                label="Kommentar"
                multiline
                rows={4}
                value={comment ? comment : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setComment(e.target.value);
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setOpenConfirmationComment(true);
                }}
              >
                Lagre
              </Button>

              <ConfirmationBox
                open={openConfirmationComment}
                text={"Ønsker du å lagre kommentaren?"}
                handleResponse={saveComment}
                handleClose={() => {
                  setOpenConfirmationComment(false);
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <SendEmailContent
        open={selectedRecipient && openMailDialog}
        handleClose={() => {
          setOpenMailDialog(false);
        }}
        email={selectedRecipient.contactEmail}
        fullName={selectedRecipient.contactFullName}
      />

      <EditFamilyDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        refreshRecipients={() => refreshData()}
        recipient={selectedRecipient}
      />

      <DeleteTypeDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        typeData={deleteObj}
        refreshData={refreshData}
        type={type}
      />
    </Container>
  );
};

export default React.memo(DatatableRecipient);
