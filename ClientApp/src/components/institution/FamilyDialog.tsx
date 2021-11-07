 import {
     Button, 
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle, 
 } from "@material-ui/core";
 import {RecipientType, SelectedConnectionType} from "../admin/overview/Types";
 import Recipient from "../admin/overview/Recipient";
 import ApiService from "../../common/functions/apiServiceClass";
 import { useEffect, useState, useCallback} from "react";
 import * as Types from "../admin/suggestedConnections/Types";

 const initState: SelectedConnectionType= {
      recipient: {} as RecipientType,
      editRecipient: {} as Types.RecipientType
  };

interface IFamilyDialog{
     open: boolean;
     accessToken: string; 
     institution?: string;
     handleClose : () => void;
 }
 
const FamilyDialog: React.FC<IFamilyDialog> = ({ open, accessToken,institution, handleClose}) => {
    const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
    const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);
    const apiservice = new ApiService(accessToken);
 
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
    
    const handleRecipientChange = useCallback((newRecipient: RecipientType) => {
        if (!newRecipient.isSuggestedMatch && !newRecipient.hasConfirmedMatch) {
          if (selectedConnection.recipient?.rowKey === newRecipient.rowKey) {
            setSelectedConnection((prevState) => {
              return {
                ...prevState,
                recipient: newRecipient ?? prevState.recipient,
              };
            });
          } else {
            setSelectedConnection((prevState) => {
              return {
                ...prevState,
                recipient: prevState.recipient,
              };
            });
          }
        }
      }, []);
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
                     <Recipient data={recipientData} accessToken={""} refreshRecipients={() => ""}/>
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