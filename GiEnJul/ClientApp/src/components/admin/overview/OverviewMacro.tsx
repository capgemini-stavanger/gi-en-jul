import React, { useState } from "react";
import Giver from "./Giver";
import Recipient from "./Recipient";
import { Grid,Typography } from "@material-ui/core";

function OverviewMacro() {
    return (
        <>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item xs={6}>
              <Typography variant="h4" align="center">
                Givere
              </Typography>
              <Giver />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" align="center">
                Familier
              </Typography>
              <Recipient />
            </Grid>
          </Grid>
        </>
    )

}
export default OverviewMacro;