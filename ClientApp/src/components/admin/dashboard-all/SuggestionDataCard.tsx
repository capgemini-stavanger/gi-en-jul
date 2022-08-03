import { Box, Button, Grid, Tooltip, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
import { RecipientType } from "../../shared/Types";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ChatBubbleOutline, CancelOutlined } from "@material-ui/icons";
import getGender from "common/functions/GetGender";
import PeopleIcon from "@material-ui/icons/People";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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
            <Grid item xs={3}>
              <Typography
                className={suggestionIndex == selectedSuggestionIndex ? classes.boldText : ""}
              >
                ID: {suggestionData.familyId}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                className={suggestionIndex == selectedSuggestionIndex ? classes.boldText : ""}
              >
                <PeopleIcon />
                {suggestionData.familyMembers.length}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                className={suggestionIndex == selectedSuggestionIndex ? classes.boldText : ""}
              >
                <CancelOutlined className={classes.noneIcon} />
                Ikke koblet
              </Typography>
            </Grid>
            <Grid item xs={1}>
              {suggestionData.comment && <ChatBubbleOutline />}
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
            <Grid container direction="column" spacing={2} wrap="nowrap">
              <Grid item className={classes.borderInCards}>
                <Typography variant="h6" gutterBottom>
                  Matønsker
                </Typography>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      className={classes.personTable}
                    >
                      <Grid item xs={2}>
                        <Typography>{suggestionData.dinner}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography>{suggestionData.dessert}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>{suggestionData.note}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
                        className={
                          index == suggestionData.familyMembers.length - 1
                            ? classes.personTable
                            : classes.personTableBorder
                        }
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
              {suggestionData.comment && (
                <Grid item className={classes.borderInCards}>
                  <Typography variant="h6" gutterBottom>
                    Kommentar fra administratorer {"  "}
                    <Tooltip
                      placement="top"
                      title="Kommentaren er lagt igjen av andre administratorer, og informasjonen er viktig å være klar over ved eventuelle valg. Om valg gjøres som tilsvarer at kommentaren bør oppdateres, kan dette gjøres i tabellen nedenfor."
                    >
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </Typography>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Typography> {suggestionData.comment} </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};
export default React.memo(SuggestionDataCard);
