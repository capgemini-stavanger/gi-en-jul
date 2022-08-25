import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@material-ui/core";
import { FC, useContext, useState } from "react";
import ApiService from "common/functions/apiServiceClass";
import { isEqual } from "components/shared/input-fields/validators/Validators";
import accessTokenContext from "contexts/accessTokenContext";

interface IConfirmationDialog {
  open: boolean;
  typeData: any;
  handleClose: () => void;
  refreshData: () => void;
  type?: string | null;
}

const DeleteTypeDialog: FC<IConfirmationDialog> = ({
  open,
  typeData,
  handleClose,
  refreshData,
  type,
}) => {
  const userAccessToken = useContext(accessTokenContext);
  const apiservice = new ApiService(userAccessToken);
  const [validationInput, setGiverNameInput] = useState("");

  const handleDeleteGiver = async () => {
    await apiservice
      .delete(`admin/${type != null ? type : "Connection"}`, JSON.stringify({ ...typeData }))
      .then((response) => {
        if (response.status === 200) {
          refreshData();
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Slett ${type ? `${type == "Giver" ? "Giver" : "Familie"}` : "kobling"}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Bekreft ved å skrive inn ${
              type
                ? `${type == "Giver" ? "giveren sitt fulle navn" : "familiens id"}`
                : "fullt navn eller id"
            }`}
          </DialogContentText>
          <Input
            type="text"
            value={validationInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGiverNameInput(e.target.value);
            }}
            placeholder={`${type == "Giver" ? "Ola Normann" : "123"}`}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setGiverNameInput("");
            }}
            autoFocus
          >
            Tilbake
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleDeleteGiver();
              setGiverNameInput("");
            }}
            disabled={
              !isEqual(typeData?.fullName, validationInput) &&
              !isEqual(typeData?.familyId, validationInput)
            }
          >
            {(type && `Slett ${type == "Giver" ? "Giver" : "Familie"}`) || "Fjern kobling"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTypeDialog;
