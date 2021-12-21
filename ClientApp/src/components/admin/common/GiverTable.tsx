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
  Mail,
  Phone,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { GiverType } from "../../../common/components/Types";
import DeleteGiverDialog from "../overview/DeleteGiverDialog";
import Circle from "./Circle";
import useStyles from "./Styles";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (newGiver: GiverType) => void;
  refreshData: () => void;
};

const Datatable: React.FC<Props> = ({ data, handleGiverChange, refreshData }) => {
  const classes = useStyles();

  const [selectedGiver, setSelectedGiver] = useState<GiverType | false>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleChange = (giver:GiverType) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setSelectedGiver(isExpanded ? giver : false);
    handleGiverChange(giver);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const formatFamily = (input: Number) => {
    if (input === 2) {
      return "< 3";
    }
    if (input === 5) {
      return "3 - 5";
    } else {
      return "> 5";
    }
  };

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
              {giver.fullName}
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
            <Typography>
              <Mail />
              {giver.email}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography onClick={handleOpenDialog}>
              <Delete />
              <Button>
                Slett giver
              </Button>
            </Typography>
          </AccordionDetails>
          <DeleteGiverDialog 
          open={selectedGiver === giver && openDialog}
          handleClose={handleCloseDialog} 
          giverData={{rowKey: giver.rowKey, partitionKey:  giver.partitionKey, fullName: giver.fullName}} 
          refreshData={refreshData} 
          />
        </Accordion>
        
        ))}
    </Container>
  );
};

export default React.memo(Datatable);
