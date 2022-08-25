import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "./Styles";
import { RecipientType, User } from "../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
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
import { RequestState } from "./OverviewMacroRemake";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import accessTokenContext from "contexts/accessTokenContext";

type Props = {
  recipientData: RecipientType;
  recipientIndex: number;
  selectedRecipientIndex: number;
  setSelectedRecipient: () => void;
  setSelectedRecipientIndex: () => void;
  refreshData: () => void;
  resetSelections: () => void;
  requestState: number;
  setRequestState: (state: number) => void;
  user: User;
};

const RecipientDataCard: React.FC<Props> = ({
  recipientData,
  recipientIndex,
  selectedRecipientIndex,
  setSelectedRecipient,
  setSelectedRecipientIndex,
  refreshData,
  resetSelections,
  requestState,
  setRequestState,
  user,
}) => {
  const classes = useStyles();
  const accessToken = useContext(accessTokenContext);
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
      if (requestState != RequestState.Waiting) {
        setRequestState(RequestState.Waiting);
        apiservice
          .delete("admin/connection", {
            event: recipient.event,
            giverId: recipient.matchedGiver,
            recipientId: recipient.recipientId,
          })
          .then((response) => {
            if (response.status === 200) {
              setRequestState(RequestState.Ok);
              refreshData();
              setPersonExpanded(false);
              resetSelections();
            }
          })
          .catch((errorStack) => {
            setRequestState(RequestState.Error);
            console.error(errorStack);
          });
      }
    }
  };

  const deleteRecipient = (recipient: RecipientType) => (response: boolean) => {
    if (response) {
      if (requestState != RequestState.Waiting) {
        setRequestState(RequestState.Waiting);
        apiservice
          .delete("admin/Recipient", {
            event: recipient.event,
            recipientId: recipient.recipientId,
          })
          .then((response) => {
            if (response.status === 200) {
              setRequestState(RequestState.Ok);
              refreshData();
              resetSelections();
            }
          })
          .catch((errorStack) => {
            setRequestState(RequestState.Error);
            console.error(errorStack);
          });
      }
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
                    <QueryBuilderOutlinedIcon className={classes.waitingIcon} />
                    Foreslått
                  </Typography>
                ) : (
                  <Typography
                    className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
                  >
                    <CheckCircleOutline className={classes.confirmIcon} />
                    Koblet
                  </Typography>
                )
              ) : (
                <Typography
                  className={recipientIndex == selectedRecipientIndex ? classes.boldText : ""}
                >
                  <CancelOutlined className={classes.noneIcon} />
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
                      toEmail={recipientData.contactEmail}
                      fullName={recipientData.contactFullName}
                      user={user}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Matønsker
                    </Typography>
                    <Typography>{recipientData.dinner}</Typography>
                    <Typography>{recipientData.dessert}</Typography>
                    <Typography>{recipientData.note}</Typography>
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
                          {person.age == 0 ? `${person.months} måneder` : `${person.age} år`}
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
                          <Typography>
                            <Edit />
                            <Button
                              className={classes.underlineText}
                              onClick={() => {
                                setOpenEditFamilyDialog(true);
                              }}
                            >
                              Rediger familie
                            </Button>
                          </Typography>
                          <EditFamilyDialog
                            open={openEditFamilyDialog}
                            onClose={() => {
                              setOpenEditFamilyDialog(false);
                            }}
                            refreshRecipients={() => refreshData()}
                            recipient={recipientData}
                            isInstitution={false}
                          />
                        </Grid>
                      )}
                      {recipientData.isSuggestedMatch && (
                        <Grid item>
                          <Typography>
                            <LinkOutlined />
                            <Button
                              className={classes.underlineText}
                              onClick={() => setOpenDelConnectionDialog(true)}
                            >
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
                        <Typography>
                          <LinkOutlined />
                          <Button
                            className={classes.underlineText}
                            onClick={() => setOpenDelFamilyDialog(true)}
                          >
                            Slett familie
                          </Button>
                        </Typography>
                        <ConfirmationBox
                          open={openDelFamilyDialog}
                          handleClose={() => {
                            setOpenDelFamilyDialog(false);
                          }}
                          text={`Er du sikker på at du ønsker å slette familie id ${recipientData.familyId} [${recipientData.contactEmail}]?`}
                          handleResponse={deleteRecipient(recipientData)}
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
