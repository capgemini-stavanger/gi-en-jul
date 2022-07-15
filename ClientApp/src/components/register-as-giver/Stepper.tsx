import { Grid, Typography } from "@material-ui/core";
import { Brightness1Outlined, Remove } from "@material-ui/icons";
import React, { useEffect } from "react";
import useStyles from "./Styles";

interface iStepper {
  state: number;
}

const Stepper: React.FC<iStepper> = ({ state }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Brightness1Outlined style={{ color: "#49a591", fontSize: "45px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px", width: "20px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
      </Grid>
      <Grid item>
        <Brightness1Outlined style={{ color: "#49a591", fontSize: "45px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px", width: "20px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
      </Grid>
      <Grid item>
        <Brightness1Outlined style={{ color: "#49a591", fontSize: "45px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px", width: "20px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
        <Remove style={{ color: "#49a591", fontSize: "30px" }} />
      </Grid>
      <Grid item>
        <Brightness1Outlined style={{ color: "#49a591", fontSize: "45px" }} />
      </Grid>
    </Grid>
  );
};

export default Stepper;
