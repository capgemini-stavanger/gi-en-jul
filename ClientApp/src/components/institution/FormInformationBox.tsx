import { Grid, Typography } from "@material-ui/core";
import useStyles from "./Styles";
import { FC } from "react";
import { FiberManualRecord } from "@material-ui/icons";

interface IFormBoxInfo {
  info: string;
  index: number;
}

const FormInformationBox: FC<IFormBoxInfo> = ({ index, info }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2} alignContent="space-between">
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography className={classes.infoBoxCircleText}>{index}</Typography>
            <FiberManualRecord className={classes.infoBoxCircle} fontSize="large" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography className={classes.formInfoBoxText}>{info}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormInformationBox;
