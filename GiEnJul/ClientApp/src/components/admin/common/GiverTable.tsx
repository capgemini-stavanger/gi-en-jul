import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  CheckRounded,
  CloseRounded,
  ExpandMore,
  Group,
  Mail,
  Phone,
  HourglassEmpty,
} from "@material-ui/icons";
import React from "react";
import { GiverType, SelectedConnectionType } from "../overview/Types";
import useStyles from "./Styles";

type Props = {
  data: GiverType[] | [];
  handleGiverChange: (
    newGiver: GiverType
  ) => void;
  selectedConnection: SelectedConnectionType;
};

const Datatable: React.FC<Props> = ({
  data,
  handleGiverChange,
  selectedConnection,
}) => {
  const classes = useStyles();

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
        <Accordion
          onChange={() => handleGiverChange(giver)}
          key={giver.rowKey}
          //Styling should be in a seperate file
          //This is not working atm because selectedConnection is a ref and will not rerender this component.
          // style={
          //   giver.rowKey === selectedConnection.giverRowKey &&
          //   !giver.isSuggestedMatch
          //     ? {
          //         background:
          //           "linear-gradient(45deg, #D6F0EB 30%, #E2FFF9 90%)",
          //       }
          //     : { background: "white" }
          // }
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
                <HourglassEmpty style={{ color: "#f4cf8a" }}/>
              ) : (
                <CheckRounded style={{ color: "#49a591" }} />
              )
            ) : (
              <CloseRounded style={{ color: "#ed8175" }} />
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
        </Accordion>
      ))}
    </Container>
  );
};

export default React.memo(Datatable);
