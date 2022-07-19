import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Delete,
  ExpandMore,
  Group,
  LinkOff,
  Mail,
  Phone,
  ChatBubbleOutline,
  CheckSharp,
} from "@material-ui/icons";
import React, { useState } from "react";
import { GiverType } from "components/shared/Types";
import Circle from "components/admin/dashboard-all/Circle";
import useStyles from "components/admin/Styles";
import formatFamily from "common/functions/GetFamilySize";
import DeleteTypeDialog from "components/admin/dashboard-all/DeleteTypeDialog";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";
import ApiService from "common/functions/apiServiceClass";
import ConfirmationBox from "components/shared/ConfirmationBox";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiver: GiverType) => void;
  refreshData: () => void;
};

const Datatable: React.FC<Props> = ({ data, handleGiverChange, refreshData }) => {
  const classes = useStyles();
  const [selectedGiver, setSelectedGiver] = useState<GiverType | false>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string | null>("");
  const [dialogPayload, setDialogPayload] = useState({});
  const [comment, setComment] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("Er du sikker?");
  const [openConfirmationComment, setOpenConfirmationComment] = useState(false);
  const apiservice = new ApiService();

  const handleChange =
    (giver: GiverType) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setSelectedGiver(isExpanded ? giver : false);
      handleGiverChange(giver);
      setComment(giver.comment);
    };

  const handleOpenDialog = (deleteObj: any = {}) => {
    setDialogPayload(deleteObj);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveComment = () => {
    if (selectedGiver) {
      apiservice
        .post("admin/giver/addcomment", {
          event: selectedGiver.event,
          giverId: selectedGiver.giverId,
          comment: comment,
        })
        .then((resp) => {
          if (resp.status === 200) {
            selectedGiver.comment = comment;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const openConfirmConnectionDialog = (giver: GiverType) => {
    setType(null);
    setDialogText(
      `Er du sikker på at du vil godta på vegne av ${giver.fullName} [${giver.email}]?`
    );
    setConfirmDialogOpen(true);
  };

  const confirmConnction = (giver: GiverType) => {
    apiservice
      .post("connection/confirm", {
        giverId: giver.giverId,
        recipientId: giver.matchedRecipient,
        event: giver.event,
      })
      .then((r) => {
        if (r.status === 200) {
          giver.hasConfirmedMatch = true;
        }
      });
  };

  return (
    <Container>
      {data.map((giver) => (
        <Accordion
          expanded={selectedGiver === giver}
          onChange={handleChange(giver)}
          key={giver.giverId}
          className={classes.accordionContainer}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {giver.fullName}
              <br />
            </Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(giver.maxReceivers)}
            </Typography>
            {giver.isSuggestedMatch ? (
              //Styling should be in a seperate file
              !giver.hasConfirmedMatch ? (
                <Circle color="yellow" />
              ) : (
                <Circle color="green" />
              )
            ) : (
              <Circle color="red" />
            )}
            {giver.comment && <ChatBubbleOutline />}
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {giver.phoneNumber}
            </Typography>
            <Divider />
            <Box>
              <TextField
                id="outlined-multiline-static"
                variant="outlined"
                label="Kommentar"
                multiline
                rows={4}
                value={comment}
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
          <AccordionDetails>
            <Typography className={classes.emailText}>
              <Mail />
              {giver.email}
            </Typography>
            <Typography className={classes.emailButton}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
                endIcon={<SendIcon />}
              >
                Send Email
              </Button>
            </Typography>
          </AccordionDetails>
          {giver.isSuggestedMatch && (
            <AccordionDetails>
              <Typography
                onClick={() => {
                  setType(null);
                  handleOpenDialog({
                    event: giver.event,
                    connectedIds: `${giver.matchedRecipient}_${giver.giverId}`,
                    fullName: giver.fullName,
                    familyId: giver.matchedFamilyId,
                  });
                }}
              >
                <LinkOff />
                <Button>Koble fra giver og familie</Button>
              </Typography>
            </AccordionDetails>
          )}
          {!giver.hasConfirmedMatch && giver.isSuggestedMatch && (
            <AccordionDetails>
              <Typography onClick={() => openConfirmConnectionDialog(giver)}>
                <CheckSharp />
                <Button>Godta kobling</Button>
              </Typography>
            </AccordionDetails>
          )}
          <AccordionDetails>
            <Typography
              onClick={() => {
                setType("Giver");
                handleOpenDialog(giver);
              }}
            >
              <Delete />
              <Button>Slett giver</Button>
            </Typography>
          </AccordionDetails>
          {giver.cancelFeedback && (
            <AccordionDetails>
              Avslo Kobling! (Indikert ved hul rød sirkel(?)) <br />
              &nbsp; Feedback: {giver.cancelFeedback} <br />
              &nbsp; Dato: {new Date(giver.cancelDate).toLocaleString("no-NO")} <br />
              &nbsp; Familie ID: {giver.cancelFamilyId}
            </AccordionDetails>
          )}

          <SendEmailContent
            open={selectedGiver === giver && open}
            handleClose={() => {
              setOpen(false);
            }}
            email={giver.email}
            fullName={giver.fullName}
          />

          <DeleteTypeDialog
            open={selectedGiver === giver && openDialog}
            handleClose={handleCloseDialog}
            typeData={dialogPayload}
            refreshData={refreshData}
            type={type}
          />
          <ConfirmationBox
            open={selectedGiver === giver && confirmDialogOpen}
            handleClose={() => {
              setConfirmDialogOpen(false);
            }}
            text={dialogText}
            handleResponse={() => confirmConnction(giver)}
          />
        </Accordion>
      ))}
    </Container>
  );
};

export default React.memo(Datatable);
