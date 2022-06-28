import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  Delete,
  ExpandMore,
  Group,
  LinkOff,
  Mail,
  Phone,  
  FiberManualRecord,
  Person,
} from "@material-ui/icons";
import React, { useState } from "react";
import { GiverType } from "components/shared/Types";
import Circle from "components/admin/dashboard-all/Circle";
import useStyles from "components/admin/Styles";
import formatFamily from "common/functions/GetFamilySize"
import { Alert } from "@material-ui/lab";
import DeleteTypeDialog from "components/admin/dashboard-all/DeleteTypeDialog";
import SendSingleEmail from "components/shared/EmailContentBox";
import SendIcon from '@material-ui/icons/Send';

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiver: GiverType) => void;
  refreshData: () => void;
};

const Datatable: React.FC<Props> = ({ data, handleGiverChange, refreshData }) => {
  const classes = useStyles();

  const [selectedGiver, setSelectedGiver] = useState<GiverType | false>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [open,setOpen] = useState(false);
  const [type, setType] = useState<string | null>("");
  const handleChange = (giver:GiverType) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setSelectedGiver(isExpanded ? giver : false);
    handleGiverChange(giver);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  

  return (
    <Container>
      {data.map((giver) => (
        <Accordion expanded={selectedGiver === giver}
          onChange = {handleChange(giver)}
          key={giver.rowKey}
          className={classes.accordionContainer}
        >
          
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              {giver.fullName}<br/>
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
                
              <Button variant="contained" onClick={() => {setOpen(true)}} endIcon={<SendIcon />}>
              Send Email
              </Button>
              <SendSingleEmail 
              open = {selectedGiver === giver && open}
              handleClose = {() => {setOpen(false)}}
              giver = {giver}

              ></SendSingleEmail>
            </Typography>
          </AccordionDetails>
          { giver.isSuggestedMatch &&
          <AccordionDetails>
            <Typography onClick={() => {setType(null); handleOpenDialog()}}>
              <LinkOff />
              <Button>
                Koble fra giver og familie
              </Button>
            </Typography>
          </AccordionDetails>
          }
          <AccordionDetails>
            <Typography onClick={() => {setType("Giver"); handleOpenDialog()}}>
              <Delete />
              <Button>
                Slett giver
              </Button>
            </Typography>
          </AccordionDetails>
          <DeleteTypeDialog 
          open={selectedGiver === giver && openDialog}
          handleClose={handleCloseDialog} 
          typeData={giver} 
          refreshData={refreshData} 
          type={type}
          />
        </Accordion>
        
        ))}
    </Container>
  );
};

export default React.memo(Datatable);
