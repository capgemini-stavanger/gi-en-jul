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
import { GiverType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
  Phone,
  LinkOutlined,
} from "@material-ui/icons";
import formatFamily from "common/functions/GetFamilySize";

type Props = {
  giverData: GiverType;
  giverIndex: number;
  selectedGiverIndex: number;
  setSelectedGiver: () => void;
  setSelectedGiverIndex: () => void;
};

const GiverDataCard: React.FC<Props> = ({
  giverData,
  giverIndex,
  selectedGiverIndex,
  setSelectedGiver,
  setSelectedGiverIndex,
}) => {
  const classes = useStyles();

  const [personExpanded, setPersonExpanded] = useState(false);
  const [comment, setComment] = useState("");

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
        <AccordionSummary style={{ height: "73px" }}>
          <Grid container justifyContent="space-between">
            <Grid item xs={2}>
              <Typography>{giverData.fullName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                <PeopleOutline />
                {formatFamily(giverData.maxReceivers)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {giverData.isSuggestedMatch ? (
                !giverData.hasConfirmedMatch ? (
                  <Typography>
                    <ErrorOutlineOutlined style={{ color: "yellow" }} />
                    Foreslått
                  </Typography>
                ) : (
                  <Typography>
                    <CheckCircleOutline style={{ color: "green" }} />
                    Koblet
                  </Typography>
                )
              ) : (
                <Typography>
                  <CancelOutlined style={{ color: "red" }} />
                  Ikke koblet
                </Typography>
              )}
            </Grid>
            <Grid item xs={1}>
              {
                !giverData.comment && <ChatBubbleOutline /> // remove ! to show all comments
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
              <Button style={{ padding: "0" }} className={classes.underlineText}>
                Sendt epost
              </Button>
            </Grid>
            <Grid item style={{ paddingBottom: "10px" }} className={classes.borderInCards}>
              <Grid container direction="row" spacing={5}>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography>
                        <LinkOutlined />
                        <Button className={classes.underlineText}>Godta kobling</Button>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <LinkOutlined />
                        <Button className={classes.underlineText}>
                          Koble fra giver og familie
                        </Button>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <LinkOutlined />
                        <Button className={classes.underlineText}>Slett giver</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box className={classes.commentBox}>
                    <TextField
                      className={classes.commentField}
                      id="outlined-multiline-static"
                      variant="outlined"
                      label="Kommentar"
                      multiline
                      rows={4}
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
      </Accordion>
    </>
  );
};
export default GiverDataCard;
