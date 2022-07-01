import { Dialog, Grid, Typography } from "@material-ui/core";
import useStyles from "components/shared/Styles";
import React from "react";
import { Button } from "reactstrap";

interface IConfirmation {
  open: boolean;
  text: string;
  handleClose: () => void;
  handleResponse: (response: boolean) => void;
}

const ConfirmationBox: React.FC<IConfirmation> = ({ open, handleClose, handleResponse, text }) => {
  const classes = useStyles();

  return (
    <Dialog open={open}>
      <Grid direction="row">
        <Grid item>
          <Typography className={classes.footerText} variant="h6">
            {text}
          </Typography>
        </Grid>
        <Grid item>
          <Grid direction="row">
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  handleResponse(false);
                  handleClose();
                }}
              >
                Nei
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  handleResponse(true);
                  handleClose();
                }}
              >
                Ja
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationBox;
