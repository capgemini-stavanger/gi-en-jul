import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./Styles";
import { RecipientType } from "../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  LinkOutlined,
  Edit,
} from "@material-ui/icons";
import getGender from "common/functions/GetGender";
import ConfirmationBox from "components/shared/ConfirmationBox";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import ApiService from "common/functions/apiServiceClass";
import PeopleIcon from "@material-ui/icons/People";

type Props = {
  recipientData: RecipientType;
  recipientIndex: number;
  selectedRecipientIndex: number;
  setSelectedRecipient: () => void;
  setSelectedRecipientIndex: () => void;
  refreshData: () => void;
  accessToken: string;
  resetSelections: () => void;
};

const RecipientDataCard: React.FC<Props> = ({
  recipientData,
  recipientIndex,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
  refreshData,
  accessToken,
  resetSelections,
}) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);

  const [personExpanded, setPersonExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [openEditFamilyDialog, setOpenEditFamilyDialog] = useState(false);
  const [openDelConnectionDialog, setOpenDelConnectionDialog] = useState(false);
  const [openDelFamilyDialog, setOpenDelFamilyDialog] = useState(false);
  const [openConfirmationComment, setOpenConfirmationComment] = useState(false);

  useEffect(() => {
    setComment(recipientData.comment ? recipientData.comment : "");
  }, []);

  useEffect(() => {
    if (selectedRecipientIndex == -1) {
      setPersonExpanded(false);
    }
  }, [selectedRecipientIndex]);

  const deleteConnection = (recipient: RecipientType) => (response: boolean) => {
    if (response) {
      apiservice
        .delete("admin/Connection", {
          event: recipient.event,
          connectedIds: `${recipient.recipientId}_${recipient.matchedGiver}`,
        })
        .then((response) => {
          if (response.status === 200) {
            refreshData();
            setPersonExpanded(false);
            resetSelections();
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
            resetSelections();
          }
        })
        .catch((errorStack) => {
          console.error(errorStack);
        });
    }
  };

  const saveComment = (response: boolean) => {
    if (response) {
      apiservice
        .post("admin/recipient/addcomment", {
          event: recipientData.event,
          recipientId: recipientData.recipientId,
          comment: comment,
        })
        .then((resp) => {
          if (resp.status === 200) {
            refreshData();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Box
        className={
          recipientIndex == selectedRecipientIndex
            ? classes.accordionSelected
            : classes.accordionNormal
        }
        onClick={() => {
          setSelectedRecipient();
          setSelectedRecipientIndex();
        }}
      >
        <Box className={classes.accordionSummary}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography
                className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
              >
                ID: {recipientData.familyId}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
              >
                <PeopleIcon />
                {recipientData.familyMembers.length}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {recipientData.isSuggestedMatch ? (
                !recipientData.hasConfirmedMatch ? (
                  <Typography
                    className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
                  >
                    <ErrorOutlineOutlined style={{ color: "yellow" }} />
                    Foreslått
                  </Typography>
                ) : (
                  <Typography
                    className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
                  >
                    <CheckCircleOutline style={{ color: "green" }} />
                    Koblet
                  </Typography>
                )
              ) : (
                <Typography
                  className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
                >
                  <CancelOutlined style={{ color: "red" }} />
                  Ikke koblet
                </Typography>
              )}
            </Grid>
            <Grid item xs={1}>
              {recipientData.comment && <ChatBubbleOutline />}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
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
        </Box>
        {personExpanded && (
          <Box className={classes.accordionDetails}>
            <Grid
              container
              direction="column"
              spacing={2}
              className={classes.borderInCards}
              wrap="nowrap"
            >
              <Grid item>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Kontakt
                    </Typography>
                    <Typography>{recipientData.contactPhoneNumber}</Typography>
                    <Typography gutterBottom>{recipientData.contactEmail}</Typography>
                    <SendIcon />
                    <Button
                      className={classes.underlineText}
                      onClick={() => {
                        setOpenMailDialog(true);
                      }}
                    >
                      Send epost
                    </Button>
                    <SendEmailContent
                      open={openMailDialog}
                      handleClose={() => {
                        setOpenMailDialog(false);
                      }}
                      email={recipientData.contactEmail}
                      fullName={recipientData.contactFullName}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.borderInCards}>
                <Typography variant="h6" gutterBottom>
                  Familie
                </Typography>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    {recipientData.familyMembers.map((person, index) => (
                      <Grid
                        key={index}
                        container
                        direction="row"
                        justifyContent="space-between"
                        className={
                          index == recipientData.familyMembers.length - 1
                            ? classes.personTable
                            : classes.personTableBorder
                        }
                      >
                        <Grid item xs={2}>
                          <Typography>{getGender(person.gender, person.age)}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          {person.age} år
                        </Grid>
                        <Grid item xs={8}>
                          {!person.noWish ? (
                            person.wishes.map((wish, wIndex) => {
                              return (
                                <Typography key={wIndex}>
                                  Ønske {wIndex + 1}: {wish}
                                </Typography>
                              );
                            })
                          ) : (
                            <Typography>Giver kjøper alderstilpasset gave.</Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.borderInCards}>
                <Typography variant="h6" gutterBottom>
                  Administrer
                </Typography>
                <Grid container direction="row">
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
                          <EditFamilyDialog
                            open={openEditFamilyDialog}
                            onClose={() => {
                              setOpenEditFamilyDialog(false);
                            }}
                            refreshRecipients={() => refreshData()}
                            recipient={recipientData}
                            isInstitution={false}
                            accessToken={accessToken}
                          />
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
                          <ConfirmationBox
                            open={openDelConnectionDialog}
                            handleClose={() => {
                              setOpenDelConnectionDialog(false);
                            }}
                            text={`Er du sikker på at du fjerne familie id ${recipientData.familyId} [${recipientData.contactEmail}] sin tilkobling? Giver vil også bli frakoblet`}
                            handleResponse={deleteConnection(recipientData)}
                          />
                        </Grid>
                      )}
                      <Grid item>
                        <Typography onClick={() => setOpenDelFamilyDialog(true)}>
                          <LinkOutlined />
                          <Button className={classes.underlineText}>Slett familie</Button>
                        </Typography>
                        <ConfirmationBox
                          open={openDelFamilyDialog}
                          handleClose={() => {
                            setOpenDelFamilyDialog(false);
                          }}
                          text={`Er du sikker på at du ønsker å slette familie id ${recipientData.familyId} [${recipientData.contactEmail}]?`}
                          handleResponse={deleteGiver(recipientData)}
                        />
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setComment(e.target.value);
                        }}
                      />
                      <Button
                        variant="contained"
                        className={classes.commentBoxButton}
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};
export default React.memo(RecipientDataCard);
