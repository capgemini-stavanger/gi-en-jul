import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
import { RecipientType } from "../../shared/Types";
import SuggestionDataCard from "./SuggestionDataCard";
import CustomTooltip from "components/institution/CustomTooltip";

type Props = {
  suggestionData: RecipientType[];
  selectedSuggestionIndex: number;
  setSelectedSuggestion: (recipient: RecipientType) => void;
  setSelectedSuggestionIndex: (idx: number) => void;
};

const SuggestionDataTable: React.FC<Props> = ({
  suggestionData,
  selectedSuggestionIndex,
  setSelectedSuggestion,
  setSelectedSuggestionIndex,
}) => {
  const classes = useStyles();

  const [hideSuggestions, setHideSuggestions] = useState(false);

  return (
    <>
      <Grid container direction="row" alignItems="center" className={classes.tableHeadingSpace}>
        <Grid item xs={2}>
          <Box className={classes.gridBoxCenter}>
            <Typography variant="h5">Forslag</Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box className={classes.gridBoxCenter}>
            <CustomTooltip
              iconType={false}
              content={
                "Forslagene er basert på listen over familier. Blant forslagene finner man et tilfeldig forslag for hver familiestørrelse, gitt at det finnes en familie av hver størrelse"
              }
            />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.gridBoxCenter}>
            <Button
              onClick={() => {
                setHideSuggestions(!hideSuggestions);
              }}
            >
              {hideSuggestions ? "Vis forslag" : "Gjem forslag"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Divider />

      {!hideSuggestions && (
        <Box>
          {suggestionData.map((suggestion, index) => {
            return (
              <SuggestionDataCard
                key={index}
                suggestionData={suggestion}
                suggestionIndex={index}
                selectedSuggestionIndex={selectedSuggestionIndex}
                setSelectedSuggestion={() => setSelectedSuggestion(suggestion)}
                setSelectedSuggestionIndex={() => setSelectedSuggestionIndex(index)}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};
export default React.memo(SuggestionDataTable);
