import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../Styles";
import { GiverType, RecipientType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
  LinkOutlined,
  Edit,
} from "@material-ui/icons";
import getGender from "common/functions/GetGender";
import ConfirmationBox from "components/shared/confirmationBox";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import ApiService from "common/functions/apiServiceClass";

type Props = {
  recipientData: RecipientType;
  recipientIndex: number;
  selectedRecipientIndex: number;
  setSelectedRecipient: () => void;
  setSelectedRecipientIndex: () => void;
  refreshData: () => void;
  accessToken: string;
};

const RecipientDataCard: React.FC<Props> = ({
  recipientData,
  recipientIndex,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
  refreshData,
  accessToken,
}) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);

  const [personExpanded, setPersonExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [openEditFamilyDialog, setOpenEditFamilyDialog] = useState(false);
  const [openDelConnectionDialog, setOpenDelConnectionDialog] = useState(false);
  const [openDelFamilyDialog, setOpenDelFamilyDialog] = useState(false);

  const deleteConnection = (recipient: RecipientType) => (response: boolean) => {
    if (response) {
      apiservice
        .delete("admin/Connection", {
          event: recipient.event,
          connectedIds: `${recipient.recipientId}_${recipient.matchedGiver?.giverId}`,
        })
        .then((response) => {
          if (response.status === 200) {
            refreshData();
          }
        })
        .catch((errorStack) => {
          console.error(errorStack);
        });
    }
  };

  const deleteGiver = (recipient: RecipientType) => (response: boolean) => {
    if (response) {
      apiservice
        .delete("admin/Recipient", {
          event: recipient.event,
          recipientId: recipient.recipientId,
        })
        .then((response) => {
          if (response.status === 200) {
            refreshData();
          }
        })
        .catch((errorStack) => {
          console.error(errorStack);
        });
    }
  };

  return (
    <>
      <Accordion
        expanded={personExpanded}
        className={
          recipientIndex == selectedRecipientIndex
            ? classes.accordionSelected
            : classes.accordionNormal
        }
        onClick={(event) => {
          event.stopPropagation();
          setSelectedRecipient();
          setSelectedRecipientIndex();
        }}
      >
        <AccordionSummary className={classes.accordionSummary}>
          <Grid container justifyContent="space-between">
            <Grid item xs={2}>
              <Typography className={classes.boldText}>ID: {recipientData.familyId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.boldText}>
                <PeopleOutline />
                {recipientData.familyMembers.length}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {recipientData.isSuggestedMatch ? (
                !recipientData.hasConfirmedMatch ? (
                  <Typography className={classes.boldText}>
                    <ErrorOutlineOutlined style={{ color: "yellow" }} />
                    Foreslått
                  </Typography>
                ) : (
                  <Typography className={classes.boldText}>
                    <CheckCircleOutline style={{ color: "green" }} />
                    Koblet
                  </Typography>
                )
              ) : (
                <Typography className={classes.boldText}>
                  <CancelOutlined style={{ color: "red" }} />
                  Ikke koblet
                </Typography>
              )}
            </Grid>
            <Grid item xs={1}>
              {
                !recipientData.comment && <ChatBubbleOutline /> // remove ! to show all comments
              }
            </Grid>
            <Grid item xs={1}>
              {personExpanded ? (
                <Button onClick={() => setPersonExpanded(false)}>
                  <ExpandLessIcon />
                </Button>
              ) : (
                <Button onClick={() => setPersonExpanded(true)}>
                  <ExpandMoreIcon />
                </Button>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid container direction="row" justifyContent="space-between">
              <Grid item style={{ paddingTop: "0px", paddingBottom: "40px" }}>
                <Typography className={classes.boldText}>Kontaktperson</Typography>
                <Typography>{recipientData.contactPhoneNumber}</Typography>
                <Typography>{recipientData.contactEmail}</Typography>
                <SendIcon />
                <Button
                  style={{ padding: "0" }}
                  className={classes.underlineText}
                  onClick={() => {
                    setOpenMailDialog(true);
                  }}
                >
                  Send epost
                </Button>
              </Grid>
              <Grid item xs={8}>
                {recipientData.familyMembers.map((person, index) => (
                  <Grid
                    key={index}
                    container
                    direction="row"
                    justifyContent="space-between"
                    className={classes.personTable}
                  >
                    <Grid item xs={6}>
                      <Typography>
                        {getGender(person.gender, person.age)} {person.age} år
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {person.wish ? person.wish : "Giver kjøper alderstilpasset gave. "}
                      </Typography>
                      <Typography>
                        {person.comment ? "Kommentar: " + person.comment : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item style={{ paddingTop: "40px" }} className={classes.borderInCards}>
              <Grid container direction="row" spacing={10}>
                <Grid item xs={6}>
                  <Grid container direction="column">
                    {!recipientData.isSuggestedMatch && (
                      <Grid item>
                        <Typography
                          onClick={() => {
                            setOpenEditFamilyDialog(true);
                          }}
                        >
                          <Edit />
                          <Button>Rediger familie</Button>
                        </Typography>
                      </Grid>
                    )}
                    {recipientData.isSuggestedMatch && (
                      <Grid item>
                        <Typography onClick={() => setOpenDelConnectionDialog(true)}>
                          <LinkOutlined />
                          <Button className={classes.underlineText}>
                            Koble fra giver og familie
                          </Button>
                        </Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <Typography onClick={() => setOpenDelFamilyDialog(true)}>
                        <LinkOutlined />
                        <Button className={classes.underlineText}>Slett familie</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Box className={classes.commentBox}>
                    <TextField
                      className={classes.commentField}
                      id="outlined-multiline-static"
                      variant="outlined"
                      label="Kommentar"
                      multiline
                      minRows={4}
                      value={comment}
                    />
                    <Button variant="contained" className={classes.commentBoxButton}>
                      Lagre
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>

        <SendEmailContent
          open={openMailDialog}
          handleClose={() => {
            setOpenMailDialog(false);
          }}
          email={recipientData.contactEmail}
          fullName={recipientData.contactFullName}
        />
        <EditFamilyDialog
          open={openEditFamilyDialog}
          onClose={() => {
            setOpenEditFamilyDialog(false);
          }}
          refreshRecipients={() => refreshData()}
          recipient={recipientData}
        />
        <ConfirmationBox
          open={openDelConnectionDialog}
          handleClose={() => {
            setOpenDelConnectionDialog(false);
          }}
          text={`Er du sikker på at du fjerne familie id ${recipientData.familyId} [${recipientData.contactEmail}] sin tilkobling? Giver vil også bli frakoblet`}
          handleResponse={deleteConnection(recipientData)}
        />
        <ConfirmationBox
          open={openDelFamilyDialog}
          handleClose={() => {
            setOpenDelFamilyDialog(false);
          }}
          text={`Er du sikker på at du ønsker å slette familie id ${recipientData.familyId} [${recipientData.contactEmail}]?`}
          handleResponse={deleteGiver(recipientData)}
        />
      </Accordion>
    </>
  );
};
export default React.memo(RecipientDataCard);
