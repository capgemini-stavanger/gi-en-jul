import * as React from "react";
import { Container, Typography } from "@material-ui/core";

interface Props {
  ErrorText: string;
  ErrorCode?: number;
}

function ErrorPage({ ErrorText, ErrorCode }: Props) {
  return (
    <Container className="page-container">
      <Typography className="title" variant="h1">
        {ErrorCode}
      </Typography>
      <Typography className="errorText" variant="h2">
        {ErrorText}
      </Typography>
    </Container>
  );
}

export default ErrorPage;
