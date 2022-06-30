import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  TableRow,
  TableCell,
  Box,
  Table,
  TableBody,
  TableHead,
  Input,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import getGender from "common/functions/GetGender";
import { PersonType, RecipientType } from "components/shared/Types";
import Gender from "common/enums/Gender";
import { GENDERS } from "common/constants/Genders";
import ApiService from "common/functions/apiServiceClass";
import { Alert } from "@material-ui/lab";
import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "components/admin/Styles";

interface IEditFamilyDialog {
  recipientToUpdate: RecipientType;
  onClose: () => void;
  open: boolean;
  refreshRecipients: () => void;
}

const alertState: {
  isLoading: boolean;
  msg: string;
  severity?: "error" | "info" | "success" | "warning";
  open: boolean;
} = {
  isLoading: false,
  msg: "",
  severity: undefined,
  open: false,
};

const EditFamilyDialog: FC<IEditFamilyDialog> = ({
  recipientToUpdate,
  onClose,
  open,
  refreshRecipients,
}) => {
  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }

  useEffect(() => {
    setNewRecipient(Object.assign({} as RecipientType, recipientToUpdate));
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  }, [open]);

  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const apiservice = new ApiService(userAccessToken);
  const [newRecipient, setNewRecipient] = useState(
    Object.assign({} as RecipientType, recipientToUpdate)
  );
  const [state, setState] = useState(alertState);

  const classes = useStyles();

  const setAlert = (
    open?: boolean,
    message?: string,
    severity?: "error" | "info" | "success" | "warning"
  ) => {
    setState((prev) => ({
      ...prev,
      open: open ?? prev.open,
      msg: message ?? prev.msg,
      severity: severity ?? prev.severity,
    }));
  };

  const handleAlertClose = (e: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason == "clickaway") return;
    setAlert(false);
  };

  const updateRecipient = async () => {
    await apiservice
      .put("admin/recipient", JSON.stringify(newRecipient))
      .then((response) => {
        if (response.status === 200) {
          setAlert(true, "Familie oppdatert!", "success");
          refreshRecipients();
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
        setAlert(true, "Kunne ikke oppdatere familie..", "error");
        refreshRecipients();
      });
  };

  const updateFamily = () => {
    updateRecipient();
    onClose();
  };

  const newFamilyMember = () => {
    newRecipient.familyMembers.push({
      age: 0,
      gender: 9,
      partitionKey: recipientToUpdate.rowKey,
      wish: "",
    } as PersonType);
    setNewRecipient((prev) => {
      return { ...prev };
    });
  };

  const removeFamilyMember = (index: number) => {
    setNewRecipient((prev) => {
      prev.familyMembers.splice(index, 1);
      return { ...prev };
    });
  };

  const undoChanges = () => {
    onClose();
    refreshRecipients();
  };

  return (
    <>
      <Dialog aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title" disableTypography>
          Rediger Familie
        </DialogTitle>

        <IconButton className={classes.rightMiddleAlign} aria-label="close" onClick={undoChanges}>
          <CloseIcon />
        </IconButton>

        <Box margin={2}>
          <Box margin={2}>
            <Typography variant="h6" gutterBottom component="div">
              Matønsker
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Middag</TableCell>
                  <TableCell>Dessert</TableCell>
                  <TableCell>Notat</TableCell>
                  <TableCell>Referanse Id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input
                      type="text"
                      value={newRecipient.dinner}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewRecipient((prev) => {
                          return { ...prev, dinner: e.target.value };
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={newRecipient.dessert}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewRecipient((prev) => {
                          return { ...prev, dessert: e.target.value };
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={newRecipient.note}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewRecipient((prev) => {
                          return { ...prev, note: e.target.value };
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={newRecipient.referenceId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewRecipient((prev) => {
                          return { ...prev, referenceId: e.target.value };
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box margin={2}>
            <Typography variant="h6" gutterBottom component="div">
              Familiemedlemmer
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Kjønn</TableCell>
                  <TableCell>Alder</TableCell>
                  <TableCell>Ønske</TableCell>
                  <TableCell>Kommentar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newRecipient.familyMembers.map((familyMember: PersonType, fIndex: number) => (
                  <TableRow key={fIndex}>
                    <TableCell>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={familyMember.gender}
                        label="Age"
                        type="number"
                        onChange={(event) => {
                          familyMember.gender =
                            typeof event.target.value !== "undefined"
                              ? parseInt(event.target.value as string)
                              : Gender.Unspecified;
                          setNewRecipient(JSON.parse(JSON.stringify(newRecipient)));
                        }}
                      >
                        {GENDERS.map((o, gIndex) => {
                          return (
                            <MenuItem key={gIndex} value={o.value.toString()}>
                              {getGender(o.value, familyMember.age)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        type="number"
                        value={familyMember.age}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          familyMember.age = parseInt(e.target.value);
                          setNewRecipient((prev) => {
                            return { ...prev };
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        type="text"
                        value={familyMember.wish ? familyMember.wish : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          familyMember.wish = e.target.value;
                          setNewRecipient((prev) => {
                            return { ...prev };
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        type="text"
                        value={familyMember.comment ? familyMember.comment : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          familyMember.comment = e.target.value;
                          setNewRecipient((prev) => {
                            return { ...prev };
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="close" onClick={() => removeFamilyMember(fIndex)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DialogActions>
              <Button
                onClick={() => {
                  newFamilyMember();
                }}
              >
                Nytt familiemedlem
              </Button>
            </DialogActions>
          </Box>

          <DialogActions>
            <Button onClick={updateFamily}>Oppdater Familie</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity={state.severity} onClose={handleAlertClose}>
          {state.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditFamilyDialog;
