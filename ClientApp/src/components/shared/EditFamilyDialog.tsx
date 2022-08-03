import {
  Box,
  Button,
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
import ConfirmationBox from "./ConfirmationBox";
import SelectForm from "./input-fields/SelectForm";
import useUser from "hooks/useUser";
import InformationBox from "components/shared/InformationBox";
import getGender from "common/functions/GetGender";

interface IEditFamilyDialog {
  onClose: () => void;
  open: boolean;
  refreshRecipients: () => void;
  recipient: RecipientType;
  isInstitution: boolean;
  accessToken: string;
}

const EditFamilyDialog: FC<IEditFamilyDialog> = ({
  onClose,
  open,
  refreshRecipients,
  recipient,
  isInstitution,
  accessToken,
}) => {
  const classes = useStyles();

  const apiservice = new ApiService(accessToken);
  const { institution, location, email } = useUser();

  const [recipientData, setRecipientData] = useState(recipient);
  const [openUpdateConfirmBox, setOpenUpdateConfirmBox] = useState(false);
  const [openCloseConfirmBox, setOpenCloseConfirmBox] = useState(false);
  const [municipalityEmail, setMunicipalityEmail] = useState("");
  const [openInformation, setOpenInformation] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setRecipientData(recipient);
      fetchMuncipalityEmail();
    }
  }, [open]);

  // A very general STATIC check change, just to have something in the email template
  const checkChanges = () => {
    const changes: string[] = [];
    if (recipient.dinner != recipientData.dinner) changes.push("Middag");
    if (recipient.dessert != recipientData.dessert) changes.push("Dessert");
    if (recipient.note != recipientData.note) changes.push("Kommentar");
    if (recipient.familyMembers.length != recipientData.familyMembers.length) {
      changes.push("Antall familie medlemmer");
    } else {
      for (let i = 0; i < recipient.familyMembers.length; i++) {
        if (recipient.familyMembers[i].age != recipientData.familyMembers[i].age) {
          if (changes?.indexOf("Alder") < 0) changes.push("Alder");
        }
        if (recipient.familyMembers[i].months != recipientData.familyMembers[i].months) {
          if (changes?.indexOf("Måned") < 0) changes.push("Måned");
        }
        if (recipient.familyMembers[i].gender != recipientData.familyMembers[i].gender) {
          if (changes?.indexOf("Kjønn") < 0) changes.push("Kjønn");
        }
        if (recipient.familyMembers[i].wishes != recipientData.familyMembers[i].wishes) {
          if (changes?.indexOf("Ønsker") < 0) changes.push("Ønsker");
        }
      }
    }
    return changes;
  };

  const fetchMuncipalityEmail = () => {
    apiservice
      .get("Municipality/email")
      .then((resp) => {
        setMunicipalityEmail(resp.data);
      })
      .catch((errorStack) => {
        console.error(errorStack.response.data);
      });
  };

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
    let strAge = e.target.value;
    let intMonths = 0;
    const intAge = Math.floor(parseInt(strAge));
    strAge = intAge.toString();
    if (intAge !== NaN) {
      if (intAge > 130) {
        strAge = "130";
      } else if (intAge < 0) {
        strAge = "0";
      }
    } else if (intAge != 0) {
      intMonths = 0;
    } else {
      return;
    }
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          age: parseInt(strAge),
          months: intMonths,
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };

  const onMonthsChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let strMonths = e.target.value;
    const intMonths = Math.floor(parseInt(strMonths));
    strMonths = intMonths.toString();
    if (intMonths !== NaN) {
      if (intMonths > 130) {
        strMonths = "130";
      } else if (intMonths < 0) {
        strMonths = "0";
      }
    } else {
      return;
    }
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          months: parseInt(strMonths),
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
          if (isInstitution) {
            sendEmailToMunicipality();
          }
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  async function sendEmailToMunicipality() {
    let emailContent =
      "Dette er de nye endringene til familie: " + recipientData.familyId + " </br>";
    const updateChanges = checkChanges();
    updateChanges.map((change) => {
      emailContent += change + "<br>";
    });
    await apiservice
      .post(
        "email/sendFromUser",
        JSON.stringify({
          Subject: "Oppdatert familie",
          Content: emailContent,
          FromEmail: email,
          ToEmail: municipalityEmail,
          FromName: institution,
          ToName: "Gi en jul " + location,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          setOpenInformation(true);
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
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
              <Typography variant="h5">Matønsker</Typography>
              <Grid
                container
                spacing={3}
                direction="row"
                alignItems="center"
                className={classes.headerSpacing}
              >
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
              <Typography variant="h5">Familiesammensetning</Typography>
              <Grid container direction="column" spacing={3} className={classes.headerSpacing}>
                {recipientData.familyMembers?.map((familyMember: PersonType, fIndex: number) => (
                  <Grid item key={fIndex}>
                    <Grid container spacing={2} direction="row" alignItems="center">
                      <Grid item xs={2}>
                        <SelectForm
                          name="gender"
                          label="Kjønn"
                          variant="outlined"
                          value={familyMember.gender}
                          options={GENDERS.map((o) => {
                            return {
                              value: o.value,
                              text: getGender(o.value, familyMember.age),
                            };
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
                      {familyMember.age == 0 && (
                        <Grid item xs={2}>
                          <TextField
                            type="number"
                            label="Måneder"
                            variant="outlined"
                            value={familyMember.months || "0"}
                            onChange={onMonthsChange(fIndex)}
                            fullWidth
                          />
                        </Grid>
                      )}
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

      <InformationBox
        open={openInformation}
        text={"En mail med endringer er blitt sendt til kommunen"}
        handleClose={() => {
          setOpenInformation(false);
        }}
      />
    </>
  );
};

export default EditFamilyDialog;
