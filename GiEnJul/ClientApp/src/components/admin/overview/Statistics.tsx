import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { GiverType, RecipientType, SelectedConnectionType } from "./Types";
import { FiberManualRecord } from "@material-ui/icons";

type IStatistics = {
  givers: GiverType[] | [];
  recipients: RecipientType[] | [];
};

const Statistics: React.FC<IStatistics> = ({ givers, recipients }) => {
  const totalGivers: number = givers.length;
  const totalRecipints: number = recipients.length;
  let suggestedMatch: number = 0;
  let confirmedMatch: number = 0;
  givers.map((giver) => {
    if (giver.isSuggestedMatch) {
      if (giver.hasConfirmedMatch) {
        confirmedMatch++;
      } else {
        suggestedMatch++;
      }
    }
  });
  const giversWithoutRecipient: number = totalGivers - suggestedMatch;
  const recipientsWithoutGiver: number = totalRecipints - suggestedMatch;

  return (
    <>
      <Grid 
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center">
        <Grid item>
          <Typography>Antall familier:</Typography>
          <Typography>
            Totalt: {totalRecipints.toString()} <br />
            Uten giver: {recipientsWithoutGiver.toString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Antall givere:</Typography>
          <Typography>
            Totalt: {totalGivers.toString()} <br />
            Uten giver: {giversWithoutRecipient.toString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>Koblinger:</Typography>
          <Typography>
            <FiberManualRecord /> {suggestedMatch.toString()} <br />
            <FiberManualRecord /> {confirmedMatch.toString()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
