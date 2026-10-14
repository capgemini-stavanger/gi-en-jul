import {
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Check, Close, WarningRounded } from "@material-ui/icons";
import ApiService from "common/functions/apiServiceClass";
import { EmailStatus } from "components/shared/Types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useStyles from "./Styles";

type Props = {
  giverId?: string;
  recipientId?: string;
  open: boolean;
  handleClose: () => void;
  accessToken: string;
  name?: string;
};

export const EmailLog = ({ open, handleClose, giverId, recipientId, accessToken, name }: Props) => {
  const [loading, setLoading] = useState(false);
  const apiservice = new ApiService(accessToken);
  const classes = useStyles();

  const [logData, setLogData] = useState<EmailStatus[]>([]);

  const getEmailLog = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    if (recipientId?.length) {
      await apiservice
        .get(`emailStatus/recipient/${recipientId}`)
        .then((resp) => {
          setLogData(resp.data);
        })
        .catch(() => {
          setLogData([]);
        });
    }

    if (giverId?.length) {
      await apiservice
        .get(`emailStatus/giver/${giverId}`)
        .then((resp) => {
          setLogData(resp.data);
        })
        .catch(() => {
          setLogData([]);
        });
    }

    setLoading(false);
  }, [recipientId, giverId]);

  useEffect(() => {
    if (open && (giverId?.length || recipientId?.length)) {
      getEmailLog();
    }
  }, [getEmailLog, open, giverId, recipientId]);

  const rows = useMemo(() => {
    return logData.map((l, i) => (
      <TableRow key={i}>
        <TableCell>{l.email}</TableCell>
        <TableCell>{l.title}</TableCell>
        <TableCell>
          {l.isDelivered ? (
            <Check style={{ color: "rgb(49, 145, 8)" }} />
          ) : (
            <Close style={{ color: "rgb(127, 3, 3)" }} />
          )}
        </TableCell>
        <TableCell>
          {l.hasWarning && <WarningRounded style={{ color: "rgb(225, 150, 34)" }} />}
        </TableCell>
      </TableRow>
    ));
  }, [logData]);
  return (
    <Dialog open={open} PaperProps={{ className: classes.emailLogPaper }}>
      <Grid container direction="column" className={classes.emailLogContainer}>
        <Grid container className={classes.emailLogHeader} justifyContent="space-between">
          <Grid item>
            <Typography variant="h3">Email log {name?.length && "- " + name} </Typography>
          </Grid>
          <IconButton onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
        </Grid>
        <Grid item className={classes.emailLogBody}>
          {loading && <CircularProgress />}
          {!loading && (
            <TableContainer className={classes.emailLogTable}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Tittel</TableCell>
                    <TableCell>Er levert</TableCell>
                    <TableCell>Har feil</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};
