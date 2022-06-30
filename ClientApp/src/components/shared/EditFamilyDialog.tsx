import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "components/admin/Styles";
import { PersonType, RecipientType } from "./Types";
import getGender from "common/functions/GetGender";
import { GENDERS } from "common/constants/Genders";
import Gender from "common/enums/Gender";
import ApiService from "common/functions/apiServiceClass";
import { useAuth0 } from "@auth0/auth0-react";

interface IEditFamilyDialog {
  onClose: () => void;
  open: boolean;
  refreshRecipients: () => void;
  recipient: RecipientType;
}

const EditFamilyDialog: FC<IEditFamilyDialog> = ({
  onClose,
  open,
  refreshRecipients,
  recipient,
}) => {
  const classes = useStyles();

  const { getAccessTokenSilently } = useAuth0();
  const [userAccessToken, setUserAccessToken] = useState<string>("");
  const apiservice = new ApiService(userAccessToken);

  const [recipientData, setRecipientData] = useState(recipient);

  useEffect(() => {
    setRecipientData(recipient); // Set when loading the component
    getUserAccessToken().then((resp: string) => {
      setUserAccessToken(resp);
    });
  }, [open]); // By using the parameter, it only happens when RECIPIENT changes, which is every time it is loaded

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
  const onWishChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          wish: e.target.value,
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const onCommentChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientData((prev) => ({
      ...prev,
      familyMembers: [
        ...prev.familyMembers.slice(0, index),
        {
          ...prev.familyMembers[index],
          comment: e.target.value,
        },
        ...prev.familyMembers.slice(index + 1),
      ],
    }));
  };
  const newFamilyMember = () => {
    const newRecipient = {
      age: 0,
      months: 0,
      gender: 9,
      partitionKey: recipientData.rowKey,
      wish: "",
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
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };
  const updateFamily = () => {
    if (confirm("Are you sure you want to update the family?")) {
      updateRecipient();
      onClose();
    }
  };
  const closeEditing = () => {
    if (confirm("Are you sure you want to exit? Updates will be lost")) {
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
        <IconButton className={classes.rightMiddleAlign} aria-label="close" onClick={closeEditing}>
          <CloseIcon />
        </IconButton>

        <Box sx={{ m: 5 }}>
          <Grid container spacing={2} direction="column">
            <Typography variant="h4"> Familie: {recipientData.familyId} </Typography>

            <Grid item>
              <Typography variant="h5">Matønsker </Typography>
              <Grid container spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <TextField
                    type="text"
                    label="Middag"
                    value={recipientData.dinner}
                    onChange={onDinnerChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    label="Dessert"
                    value={recipientData.dessert}
                    onChange={onDessertChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    label="Kommentar"
                    value={recipientData.note}
                    onChange={onNoteChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="h5"> Familiesammensetning </Typography>
              {recipientData.familyMembers?.map((familyMember: PersonType, fIndex: number) => (
                <Grid container spacing={5} direction="row" alignItems="center" key={fIndex}>
                  <Grid item>
                    <InputLabel htmlFor="kjonn-header" shrink>
                      Kjønn
                    </InputLabel>
                    <Select
                      inputProps={{
                        name: "kjonn",
                        id: "kjonn-header",
                      }}
                      style={{ height: 25 }}
                      value={familyMember.gender}
                      onChange={(e) => {
                        onChangeGender(fIndex, e);
                      }}
                    >
                      {GENDERS.map((gender, gIndex) => {
                        return (
                          <MenuItem key={gIndex} value={gender.value.toString()}>
                            {getGender(gender.value, familyMember.age)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Alder"
                      value={familyMember.age}
                      onChange={onAgeChange(fIndex)}
                      style={{ width: 50 }}
                    />
                    <TextField
                      type="number"
                      label="Måneder"
                      value={familyMember.months}
                      onChange={onMonthsChange(fIndex)}
                      style={{ width: 50 }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="text"
                      label="Ønske"
                      value={familyMember.wish ? familyMember.wish : ""}
                      onChange={onWishChange(fIndex)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="text"
                      label="Kommentar"
                      value={familyMember.comment ? familyMember.comment : ""}
                      onChange={onCommentChange(fIndex)}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="close" onClick={() => removeFamilyMember(fIndex)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={newFamilyMember}>Nytt familiemedlem</Button>
          </DialogActions>
        </Box>

        <DialogActions>
          <Button onClick={updateFamily}>Oppdater Familie</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditFamilyDialog;
