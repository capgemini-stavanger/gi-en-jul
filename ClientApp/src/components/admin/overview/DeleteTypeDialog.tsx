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
import ApiService from "../../../common/functions/apiServiceClass";
import { isEqual } from "../../InputFields/Validators/Validators";

interface IConfirmationDialog {
    open: boolean;
    typeData: any;
    handleClose: () => void;
    refreshData: () => void;
    type?: string | null;
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
    const [validationInput, setGiverNameInput] = useState("")

    const handleDeleteGiver = async () => {
      await apiservice
      .delete(`admin/${type != null ? type : 'Connection'}`, JSON.stringify( {rowKey: typeData.rowKey, partitionKey:  typeData.partitionKey} ))
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
          {`Slett ${type ? `${type=="Giver" ? "Giver" : "Familie"}` : "kobling"}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {`Bekreft ved å skrive inn ${type ? `${type=="Giver" ? 'giveren sitt fulle navn' : 'familiens id'}` : "fullt navn eller id"}`}
          </DialogContentText>
          <Input type="text" value={validationInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGiverNameInput(e.target.value)}}  placeholder={`${type=="Giver" ? 'Ola Normann' : "123"}`} />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {handleClose(); setGiverNameInput("")}} autoFocus>
            Tilbake
          </Button>
          <Button onClick={() => {handleClose(); handleDeleteGiver(); setGiverNameInput("")}} disabled={!isEqual(typeData?.fullName, validationInput) && !isEqual(typeData?.familyId, validationInput)} >
            Slett
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteGiverDialog;