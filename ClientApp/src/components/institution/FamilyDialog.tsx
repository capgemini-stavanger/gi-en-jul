 import {
     Button, 
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle, 
 } from "@material-ui/core";
 import {RecipientType, SelectedConnectionType} from "../../common/components/Types";
 import Recipient from "../admin/overview/Recipient";
 import ApiService from "../../common/functions/apiServiceClass";
 import { useEffect, useState, useCallback} from "react";

 const initState: SelectedConnectionType= {
      recipient: {} as RecipientType,
  };

interface IFamilyDialog{
     open: boolean;
     accessToken: string; 
     institution?: string;
     handleClose : () => void;
 }
 
const FamilyDialog: React.FC<IFamilyDialog> = ({ open, accessToken,institution, handleClose}) => {
/*
  const apiservice = new ApiService(accessToken);
  const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
 
    const fetchRecipients = () =>{
        apiservice
        .get("Recipient", { params: { Institution: institution } })
        .then((resp) => {
          setRecipientData(resp.data)})
        .catch((errorStack) => {
          console.error(errorStack)
        });
    }
    
      useEffect(() => {
          fetchRecipients();
      }, []);
 */   
    
    return (
         <div>
             <Dialog fullWidth={true} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                 <DialogTitle id="alert-dialog-title">
                     {"Tidligere registrerte familier"}
                 </DialogTitle>
                 <DialogContent>
                     <DialogContentText id="alert-dialog-description">
                         <p>Liste over familier</p>
                     </DialogContentText>
                     Kommer snart
                     {/* <Recipient data={recipientData} accessToken={accessToken} refreshRecipients={() => ""}/> */}
                 </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Lukk vindu
                    </Button>
                </DialogActions>
             </Dialog>
         </div>
     );
 };

 export default FamilyDialog;