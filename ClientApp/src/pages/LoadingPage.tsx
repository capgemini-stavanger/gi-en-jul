import { Box, Container, createStyles, makeStyles } from "@material-ui/core";
import * as React from "react";
import DotLoader from "common/constants/DotLoader";

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      minHeight: "70%",
    },
  })
);

const LoadingPage = () => {
  const myStyle = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="xl" className={myStyle.loader}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <DotLoader />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LoadingPage;
