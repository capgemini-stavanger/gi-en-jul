import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import { Delete, ExpandMore, Group, LinkOff, Mail, Phone } from "@material-ui/icons";
import React, { useState } from "react";
import { GiverType } from "components/shared/Types";
import Circle from "components/admin/dashboard-all/Circle";
import useStyles from "components/admin/Styles";
import formatFamily from "common/functions/GetFamilySize";
import DeleteTypeDialog from "components/admin/dashboard-all/DeleteTypeDialog";
import SendEmailContent from "components/shared/SendEmailContent";
import SendIcon from "@material-ui/icons/Send";

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
  const [deleteObj, setDeleteObj] = useState({});

  const handleChange =
    (giver: GiverType) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setSelectedGiver(isExpanded ? giver : false);
      handleGiverChange(giver);
    };

  const handleOpenDialog = (deleteObj: any = {}) => {
    setDeleteObj(deleteObj);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {giver.phoneNumber}
            </Typography>
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
            typeData={deleteObj}
            refreshData={refreshData}
            type={type}
          />
        </Accordion>
      ))}
    </Container>
  );
};

export default React.memo(Datatable);
