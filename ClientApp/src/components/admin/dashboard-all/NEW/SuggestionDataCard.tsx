import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../Styles";
import { RecipientType } from "../../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ChatBubbleOutline,
  ErrorOutlineOutlined,
  CheckCircleOutline,
  CancelOutlined,
  PeopleOutline,
} from "@material-ui/icons";
import getGender from "common/functions/GetGender";

type Props = {
  suggestionData: RecipientType;
  suggestionIndex: number;
  selectedSuggestionIndex: number;
  setSelectedSuggestion: () => void;
  setSelectedSuggestionIndex: () => void;
};

const SuggestionDataCard: React.FC<Props> = ({
  suggestionData,
  suggestionIndex,
  selectedSuggestionIndex,
  setSelectedSuggestion,
  setSelectedSuggestionIndex,
}) => {
  const classes = useStyles();

  const [personExpanded, setPersonExpanded] = useState(false);

  return (
    <>
      <Box
        className={
          suggestionIndex == selectedSuggestionIndex
            ? classes.accordionSelected
            : classes.accordionNormal
        }
        onClick={() => {
          setSelectedSuggestion();
          setSelectedSuggestionIndex();
        }}
      >
        <Box className={classes.accordionSummary}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={2}>
              <Typography className={classes.boldText}>ID: {suggestionData.familyId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.boldText}>
                <PeopleOutline />
                {suggestionData.familyMembers.length}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {suggestionData.isSuggestedMatch ? (
                !suggestionData.hasConfirmedMatch ? (
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
                suggestionData.comment && <ChatBubbleOutline /> // remove ! to show all comments
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
        </Box>
        {personExpanded && (
          <Box margin={1}>
            <Grid item className={classes.borderInCards}>
              <Typography variant="h6" gutterBottom>
                Familie
              </Typography>
              <Grid container direction="row">
                <Grid item xs={12}>
                  {suggestionData.familyMembers.map((person, index) => (
                    <Grid
                      key={index}
                      container
                      direction="row"
                      justifyContent="space-between"
                      className={classes.personTable}
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
          </Box>
        )}
      </Box>
    </>
  );
};
export default React.memo(SuggestionDataCard);
