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
import React, { useEffect, useState } from "react";
import useStyles from "../Styles";
import { GiverType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
  LinkOutlined,
} from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";
import ConfirmationBox from "components/shared/ConfirmationBox";
import ApiService from "common/functions/apiServiceClass";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";

type Props = {
  giverData: GiverType;
  giverIndex: number;
  selectedGiverIndex: number;
  setSelectedGiver: () => void;
  setSelectedGiverIndex: () => void;
  refreshData: () => void;
  accessToken: string;
};

const GiverDataCard: React.FC<Props> = ({
  giverData,
  giverIndex,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
  refreshData,
  accessToken,
}) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);

  const [personExpanded, setPersonExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [confirmConnectDialogOpen, setConfirmConnectDialogOpen] = useState(false);
  const [deleteConnectDialogOpen, setDeleteConnectDialogOpen] = useState(false);
  const [deleteGiverDialogOpen, setDeleteGiverDialogOpen] = useState(false);
  const [openConfirmationComment, setOpenConfirmationComment] = useState(false);

  useEffect(() => {
    setComment(giverData.comment ? giverData.comment : "");
  }, []);

  // REFRESH DATA ALSO?
  const confirmConnection = (giver: GiverType) => (response: boolean) => {
    if (response) {
      apiservice
        .post("connection/confirm", {
          giverId: giver.giverId,
          recipientId: giver.matchedRecipient,
          event: giver.event,
        })
        .then((r) => {
          if (r.status === 200) {
            refreshData();
          }
        });
    }
  };

  const deleteConnection = (giver: GiverType) => (response: boolean) => {
    if (response) {
      apiservice
        .delete("admin/Connection", {
          event: giver.event,
          connectedIds: `${giver.matchedRecipient}_${giver.giverId}`,
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

  const deleteGiver = (giver: GiverType) => (response: boolean) => {
    if (response) {
      apiservice
        .delete("admin/Giver", {
          giverId: giver.giverId,
          event: giver.event,
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

  const saveComment = (response: boolean) => {
    if (response) {
      apiservice
        .post("admin/giver/addcomment", {
          event: giverData.event,
          giverId: giverData.giverId,
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
      <Accordion
        expanded={personExpanded}
        className={
          giverIndex == selectedGiverIndex ? classes.accordionSelected : classes.accordionNormal
        }
        onClick={(event) => {
          event.stopPropagation();
          setSelectedGiver();
          setSelectedGiverIndex();
        }}
      >
        <AccordionSummary className={classes.accordionSummary}>
          <Grid container justifyContent="space-between">
            <Grid item xs={2}>
              <Typography className={classes.boldText}>{giverData.fullName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.boldText}>
                <PeopleOutline />
                {formatFamily(giverData.maxReceivers)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {giverData.isSuggestedMatch ? (
                !giverData.hasConfirmedMatch ? (
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
                giverData.comment && <ChatBubbleOutline /> // remove ! to show all comments
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
          <Grid container direction="column" spacing={2}>
            <Grid item style={{ paddingTop: "0px", paddingBottom: "40px" }}>
              <Typography>{giverData.phoneNumber}</Typography>
              <Typography>{giverData.email}</Typography>
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
            <Grid item style={{ paddingTop: "40px" }} className={classes.borderInCards}>
              <Grid container direction="row" spacing={10}>
                <Grid item xs={6}>
                  <Grid container direction="column">
                    {!giverData.hasConfirmedMatch && giverData.isSuggestedMatch && (
                      <Grid item>
                        <Typography onClick={() => setConfirmConnectDialogOpen(true)}>
                          <LinkOutlined />
                          <Button className={classes.underlineText}>Godta kobling</Button>
                        </Typography>
                      </Grid>
                    )}
                    {giverData.isSuggestedMatch && (
                      <Grid item>
                        <Typography onClick={() => setDeleteConnectDialogOpen(true)}>
                          <LinkOutlined />
                          <Button className={classes.underlineText}>
                            Koble fra giver og familie
                          </Button>
                        </Typography>
                      </Grid>
                    )}
                    <Grid item>
                      <Typography onClick={() => setDeleteGiverDialogOpen(true)}>
                        <LinkOutlined />
                        <Button className={classes.underlineText}>Slett giver</Button>
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
        </AccordionDetails>

        <SendEmailContent
          open={openMailDialog}
          handleClose={() => {
            setOpenMailDialog(false);
          }}
          email={giverData.email}
          fullName={giverData.fullName}
        />
        <ConfirmationBox
          open={confirmConnectDialogOpen}
          handleClose={() => {
            setConfirmConnectDialogOpen(false);
          }}
          text={`Er du sikker på at du vil godta på vegne av ${giverData.fullName} [${giverData.email}]?`}
          handleResponse={confirmConnection(giverData)}
        />
        <ConfirmationBox
          open={deleteConnectDialogOpen}
          handleClose={() => {
            setDeleteConnectDialogOpen(false);
          }}
          text={`Er du sikker på at du fjerne giver ${giverData.fullName} [${giverData.email}] sin tilkobling? Familien vil også bli frakoblet`}
          handleResponse={deleteConnection(giverData)}
        />
        <ConfirmationBox
          open={deleteGiverDialogOpen}
          handleClose={() => {
            setDeleteGiverDialogOpen(false);
          }}
          text={`Er du sikker på at du ønsker å slette giver ${giverData.fullName} [${giverData.email}]?`}
          handleResponse={deleteGiver(giverData)}
        />
      </Accordion>
    </>
  );
};
export default React.memo(GiverDataCard);
