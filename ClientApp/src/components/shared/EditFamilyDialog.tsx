import {
  Box,
  Button,
  capitalize,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "components/admin/Styles";
import { PersonType, RecipientType } from "./Types";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import ApiService from "common/functions/apiServiceClass";
import { useAuth0 } from "@auth0/auth0-react";
import ConfirmationBox from "./ConfirmationBox";
import SelectForm from "./input-fields/SelectForm";

interface IEditFamilyDialog {
  onClose: () => void;
  open: boolean;
  refreshRecipients: () => void;
  recipient: RecipientType;
  institution: boolean;
}

const EditFamilyDialog: FC<IEditFamilyDialog> = ({
  onClose,
  open,
  refreshRecipients,
  recipient,
  institution,
}) => {
  const classes = useStyles();

  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const apiservice = new ApiService(userAccessToken);

  const [recipientData, setRecipientData] = useState(recipient);
  const [openUpdateConfirmBox, setOpenUpdateConfirmBox] = useState(false);
  const [openCloseConfirmBox, setOpenCloseConfirmBox] = useState(false);

  useEffect(() => {
    if (open) {
      setRecipientData(recipient);
      getUserAccessToken().then((resp: string) => {
        setUserAccessToken(resp);
      });
    }
  }, [open]);

  async function getUserAccessToken(): Promise<string> {
    const accessToken = await getAccessTokenSilently();
    return accessToken;
  }

  const onDinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      dinner: e.target.value,
    }));
  };
  const onDessertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      dessert: e.target.value,
    }));
  };
  const onNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      note: e.target.value,
    }));
  };
  const onChangeGender = (
    index: number,
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const newValue = e.target.value ? parseInt(e.target.value as string) : Gender.Unspecified;
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          gender: newValue,
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const onAgeChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          age: parseInt(e.target.value),
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const onMonthsChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          months: parseInt(e.target.value),
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const onWishChange =
    (fIndex: number, wIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecipientData((prev) => ({
        ...prev,
        familyMembers: [
          ...prev.familyMembers.slice(0, fIndex),
          {
            ...prev.familyMembers[fIndex],
            wishes: [
              ...prev.familyMembers[fIndex].wishes.slice(0, wIndex),
              e.target.value,
              ...prev.familyMembers[fIndex].wishes.slice(wIndex + 1),
            ],
          },
          ...prev.familyMembers.slice(fIndex + 1),
        ],
      }));
    };
  const newFamilyMember = () => {
    const newRecipient = {
      age: 0,
      months: 0,
      gender: 9,
      recipientId: recipientData.recipientId,
      wishes: [""],
    } as PersonType;

    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, newRecipient],
    }));
  };
  const removeFamilyMember = (index: number) => {
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const updateRecipient = async () => {
    await apiservice
      .put("admin/recipient", JSON.stringify(recipientData))
      .then((response) => {
        if (response.status === 200) {
          refreshRecipients();
          if (institution) {
            sendEmailToMunicipality();
          }
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  async function sendEmailToMunicipality() {
    console.log("SEND EMAIL");
    /*
    await apiservice
      .post(
        "email/send",
        JSON.stringify({
          EmailAddress: email,
          Subject: subjectInput,
          Content: html,
          RecipientName: fullName,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
      */
  }

  const handleUpdateResponse = (response: boolean) => {
    if (response) {
      updateRecipient();
      onClose();
    }
  };
  const handleCloseResponse = (response: boolean) => {
    if (response) {
      onClose();
    }
  };

  // View
  return (
    <>
      <Dialog aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title" disableTypography>
          Rediger Familie
        </DialogTitle>
        <IconButton
          className={classes.rightMiddleAlign}
          aria-label="close"
          onClick={() => setOpenCloseConfirmBox(true)}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ m: 5 }}>
          <Grid container spacing={2} direction="column">
            <Typography variant="h4"> Familie: {recipientData.familyId} </Typography>

            <Grid item>
              <Typography variant="h5" gutterBottom>
                Matønsker
              </Typography>
              <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <TextField
                    type="text"
                    label="Middag"
                    variant="outlined"
                    value={recipientData.dinner}
                    onChange={onDinnerChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    label="Dessert"
                    variant="outlined"
                    value={recipientData.dessert}
                    onChange={onDessertChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    label="Kommentar"
                    variant="outlined"
                    value={recipientData.note}
                    onChange={onNoteChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="h5" gutterBottom>
                Familiesammensetning
              </Typography>
              <Grid container direction="column" spacing={3}>
                {recipientData.familyMembers?.map((familyMember: PersonType, fIndex: number) => (
                  <Grid item key={fIndex}>
                    <Grid container spacing={2} direction="row" alignItems="center">
                      <Grid item xs={2}>
                        <SelectForm
                          name="gender"
                          label="kjønn"
                          variant="outlined"
                          value={familyMember.gender}
                          options={GENDERS.map((o) => {
                            return { value: o.value, text: capitalize(o.text) };
                          })}
                          onChange={(e) => {
                            onChangeGender(fIndex, e);
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          type="number"
                          label="Alder"
                          variant="outlined"
                          value={familyMember.age}
                          onChange={onAgeChange(fIndex)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          type="number"
                          label="Måneder"
                          variant="outlined"
                          value={familyMember.months}
                          onChange={onMonthsChange(fIndex)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        {!familyMember.noWish ? (
                          <React.Fragment>
                            {familyMember.wishes.map((wish, wIndex) => {
                              return (
                                <TextField
                                  key={wIndex}
                                  type="text"
                                  label="Ønske"
                                  variant="outlined"
                                  value={wish}
                                  onChange={onWishChange(fIndex, wIndex)}
                                  fullWidth
                                />
                              );
                            })}
                          </React.Fragment>
                        ) : (
                          <TextField
                            type="text"
                            label="Ønske"
                            variant="outlined"
                            value={"Alderstilpasset gaveønske"}
                            disabled
                            fullWidth
                          />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton aria-label="close" onClick={() => removeFamilyMember(fIndex)}>
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={newFamilyMember}>Nytt familiemedlem</Button>
          </DialogActions>
        </Box>

        <DialogActions>
          <Button onClick={() => setOpenUpdateConfirmBox(true)}>Oppdater Familie</Button>
        </DialogActions>
      </Dialog>

      <ConfirmationBox
        open={openUpdateConfirmBox}
        text={"Er du sikker på at du ønsker å lagre endringene til familien?"}
        handleClose={() => {
          setOpenUpdateConfirmBox(false);
        }}
        handleResponse={handleUpdateResponse}
      />
      <ConfirmationBox
        open={openCloseConfirmBox}
        text={"Er du sikker på at du ønsker å avbryte? Endringene vil gå tapt."}
        handleClose={() => {
          setOpenCloseConfirmBox(false);
        }}
        handleResponse={handleCloseResponse}
      />
    </>
  );
};

export default EditFamilyDialog;
