import { useAuth0 } from "@auth0/auth0-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input
  } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { deleteGiverType } from "../../../common/components/Types";
import ApiService from "../../../common/functions/apiServiceClass";
import { isEqual } from "./../../InputFields/Validators/Validators"

interface IConfirmationDialog {
    open: boolean;
    giverData?: deleteGiverType;
    handleClose: () => void;
  }
  
  const DeleteGiverDialog: FC<IConfirmationDialog> = ({
    open,
    giverData,
    handleClose,
  }) => {

    const { getAccessTokenSilently } = useAuth0();
    const [userAccessToken, setUserAccessToken] = useState<string>("");
    const apiservice = new ApiService(userAccessToken);
    const [giverNameInput, setGiverNameInput] = useState("")

    const handleDeleteGiver = async (deleteGiverData?: deleteGiverType) => {
      console.log(deleteGiverData);
      await apiservice
      .delete("admin/Giver", JSON.stringify( deleteGiverData ))
      .catch((errorStack) => {
        console.error(errorStack);
      });
    }

    async function getUserAccessToken(): Promise<string> {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    }

    useEffect(() => {
      getUserAccessToken().then((resp: string) => {
        setUserAccessToken(resp);
      });
    });

    return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Slett giver?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {`Bekreft ved å skrive navn til giver`}
          </DialogContentText>
          <Input type="text" value={giverNameInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGiverNameInput(e.target.value)}}  placeholder="Ola Norman" />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {handleClose()}} autoFocus>
            Tilbake
          </Button>
          <Button onClick={() => {handleClose(); handleDeleteGiver(giverData)}} disabled={!isEqual(giverData?.fullName, giverNameInput)} >
            Slett
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteGiverDialog;