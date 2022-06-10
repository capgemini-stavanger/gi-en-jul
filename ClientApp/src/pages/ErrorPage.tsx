import { Container, Typography } from "@material-ui/core";
import LogOutButton from "components/login/LogOutButton";

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
      <LogOutButton />
    </Container>
  );
}

export default ErrorPage;
