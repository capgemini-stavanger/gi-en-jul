import { Dialog, Grid, Typography } from "@material-ui/core";
import useStyles from "components/shared/Styles";
import React from "react";
import { Button } from "reactstrap";

interface IInforrmation {
  open: boolean;
  text: string;
  handleClose: () => void;
}

const InformationBox: React.FC<IInforrmation> = ({ open, handleClose, text }) => {
  const classes = useStyles();

  return (
    <Dialog open={open}>
      <Grid container className={classes.popupContainer} direction="column">
        <Grid item>
          <Typography className={classes.popupText} variant="h6">
            {text}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="center">
            <Grid item style={{ marginBottom: "10px" }}>
              <Button variant="contained" onClick={handleClose}>
                Lukk
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default InformationBox;
