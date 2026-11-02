import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SendIcon from "@material-ui/icons/Send";
import { DefaultEditor } from "react-simple-wysiwyg";
import ApiService from "common/functions/apiServiceClass";
import { User } from "components/shared/Types";

interface Props {
  accessToken: string;
  user: User;
  hideHeading?: boolean;
}

const SendLocationEmail = ({ accessToken, user, hideHeading = false }: Props) => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipientCount, setRecipientCount] = useState<number>();
  const [recipientError, setRecipientError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const location = user.location;
  const messageText = new DOMParser().parseFromString(content, "text/html").body.textContent ?? "";
  const canSend = !!location && !!recipientCount && !!subject.trim() && !!messageText.trim();

  useEffect(() => {
    let active = true;
    setRecipientCount(undefined);
    setRecipientError("");
    if (!location) return;
    new ApiService(accessToken)
      .get("admin/Overview/Givers", { params: { location } })
      .then((response) => {
        if (active) setRecipientCount(response.data.length);
      })
      .catch(() => {
        if (active) setRecipientError("Kunne ikke hente givere. Prøv å åpne fanen på nytt.");
      });
    return () => { active = false; };
  }, [accessToken, location]);

  const send = async () => {
    if (!canSend || sending) return;
    setSending(true);
    setError("");
    setSuccess("");
    try {
      await new ApiService(accessToken).post("email/givers/location", {
        Subject: subject.trim(),
        Content: content,
        Location: location,
      });
      setSuccess("Utsendingen er fullført.");
      setSubject("");
      setContent("");
    } catch {
      setError("Utsendingen kunne ikke fullføres. Noen givere kan ha mottatt e-posten. Kontroller før du prøver igjen.");
    } finally {
      setSending(false);
      setConfirmOpen(false);
    }
  };

  if (!location) {
    return <Alert severity="warning">Du har ikke blitt tildelt en lokasjon.</Alert>;
  }

  return (
    <Container maxWidth="md">
      {!hideHeading && (
        <Typography variant="h6" component="h1" gutterBottom>
          E-post til givere
        </Typography>
      )}
      <Typography color="textSecondary" gutterBottom>{location} - Aktivt arrangement</Typography>
      {recipientError ? (
        <Alert severity="error">{recipientError}</Alert>
      ) : recipientCount === undefined ? (
        <CircularProgress size={18} aria-label="Henter givere" />
      ) : (
        <Typography gutterBottom>{recipientCount} givere</Typography>
      )}
      {recipientCount === 0 && <Alert severity="info">Ingen givere i aktivt arrangement.</Alert>}
      {error && <Box my={2}><Alert severity="error">{error}</Alert></Box>}
      {success && <Box my={2}><Alert severity="success">{success}</Alert></Box>}
      <Box
        component="form"
        mt={3}
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          if (canSend && !sending) {
            setSuccess("");
            setConfirmOpen(true);
          }
        }}
      >
        <TextField
          id="location-email-subject"
          label="Emne"
          variant="outlined"
          fullWidth
          required
          value={subject}
          disabled={sending}
          onChange={(event) => setSubject(event.target.value)}
          inputProps={{ maxLength: 200 }}
        />
        <Box mt={3} mb={3} role="group" aria-labelledby="email-message-label">
          <Typography id="email-message-label" gutterBottom>Melding</Typography>
          <DefaultEditor value={content} onChange={(event) => setContent(event.target.value)} aria-label="Melding" />
        </Box>
        <Button type="submit" variant="contained" color="primary" startIcon={<SendIcon />} disabled={!canSend || sending}>
          {"Send e-post"}
        </Button>
      </Box>
      <Dialog
        open={confirmOpen}
        onClose={() => { if (!sending) setConfirmOpen(false); }}
        fullWidth
        maxWidth="sm"
        aria-labelledby="confirm-location-email-title"
      >
        <DialogTitle id="confirm-location-email-title">{"Bekreft utsending"}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Send én separat e-post til hver av de {recipientCount} giverne i {location}, aktivt arrangement?</Typography>
          <Typography variant="subtitle1" gutterBottom style={{ overflowWrap: "anywhere" }}>{subject.trim()}</Typography>
          <Typography style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{messageText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={sending}>Avbryt</Button>
          <Button
            onClick={send}
            disabled={sending || !canSend}
            variant="contained"
            color="primary"
            startIcon={sending ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
          >
            {sending ? "Sender..." : "Bekreft og send"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SendLocationEmail;