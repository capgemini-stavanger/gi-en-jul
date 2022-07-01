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
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.footerText} variant="h6">
            {text}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default InformationBox;
