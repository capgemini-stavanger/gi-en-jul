import { Container, Typography } from "@material-ui/core";
import * as React from "react";
import useStyles from "./Styles";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Typography className={classes.footerText}>
          Gi en jul &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </>
  );
};
export default Footer;
