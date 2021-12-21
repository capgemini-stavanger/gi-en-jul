import { useAuth0 } from "@auth0/auth0-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
  } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { GiverType } from "../../../common/components/Types";
import ApiService from "../../../common/functions/apiServiceClass";
import { isEqual } from "../../InputFields/Validators/Validators";

interface IConfirmationDialog {
    open: boolean;
    typeData: GiverType;
    handleClose: () => void;
    refreshData: () => void;
    type?: string;
  }


  const DeleteGiverDialog: FC<IConfirmationDialog> = ({
    open,
    typeData,
    handleClose,
    refreshData,
    type,
  }) => {

    const { getAccessTokenSilently } = useAuth0();
    const [userAccessToken, setUserAccessToken] = useState<string>("");
    const apiservice = new ApiService(userAccessToken);
    const [giverNameInput, setGiverNameInput] = useState("")

    const handleDeleteGiver = async () => {
      await apiservice
      .delete(`admin/${type != null ? type : 'Connection'}`, JSON.stringify( {rowKey: typeData.rowKey, partitionKey:  typeData.partitionKey, fullName: typeData.fullName} ))
      .then((response) => {
        if (response.status === 200) {
          refreshData();
        }
      })
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
    <>
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
              {`Bekreft ved å skrive givers fulle navn`}
          </DialogContentText>
          <Input type="text" value={giverNameInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGiverNameInput(e.target.value)}}  placeholder="Ola Norman" />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {handleClose(); setGiverNameInput("")}} autoFocus>
            Tilbake
          </Button>
          <Button onClick={() => {handleClose(); handleDeleteGiver(); setGiverNameInput("")}} disabled={!isEqual(typeData?.fullName, giverNameInput)} >
            Slett
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteGiverDialog;