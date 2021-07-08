import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  ExpandMore,
  Group,
  Phone,
  Mail,
  CheckRounded,
  CloseRounded,
} from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import { GiverType } from "../overview/Giver";

type Props = {
  data: [GiverType] | [];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    matched: {
      color: "#fff",
      backgroundColor: green[500],
    },
    notMatched: {
      color: "#FF0000",
      backgroundColor: red[500],
    },
  })
);

const Datatable: React.FC<Props> = ({ data }) => {
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

  const handleMatched = (input: Boolean) => {
    if (input) {
      return classes.matched;
    } else {
      return classes.notMatched;
    }
  };

  return (
    <Container>
      {data.map((x) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{x.fullName}</Typography>
            <Typography className={classes.secondaryHeading}>
              <Group />
              {formatFamily(x.maxRecievers)}
            </Typography>
            <Typography>
              <Avatar className={handleMatched(x.hasConfirmedMatch)}>
                {x.hasConfirmedMatch ? (
                  <CheckRounded style={{ color: "#FFFFFF" }} />
                ) : (
                  <CloseRounded style={{ color: "#FFFFFF" }} />
                )}
              </Avatar>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>
              <Phone /> {x.phoneNumber}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              <Mail />
              {x.email}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Datatable;
