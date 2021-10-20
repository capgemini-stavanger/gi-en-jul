 import {
     Button, 
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle
 } from "@material-ui/core";
 import {GiverType, RecipientType, SelectedConnectionType} from "../admin/overview/Types";
 import Recipient from "../admin/overview/Recipient";
 import ApiService from "../../common/functions/apiServiceClass";
 import { useEffect, useState, useCallback} from "react";
 import useUser from '../../hooks/useUser';

 const initState: SelectedConnectionType= {
    recipient: undefined,
  };

 interface IFamilyDialog{
     open: boolean;
     accessToken: string; 
     handleClose : () => void;
 }
 
const FamilyDialog: React.FC<IFamilyDialog> = ({accessToken, open, handleClose}) => {
    const [recipientData, setRecipientData] = useState<RecipientType[] | []>([]);
    const [selectedConnection, setSelectedConnection] = useState<SelectedConnectionType>(initState);
    const apiservice = new ApiService(accessToken);

    const { institution } = useUser();
    console.log("new", institution)

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
                recipient: undefined,
              };
            });
          } else {
            setSelectedConnection((prevState) => {
              return {
                ...prevState,
                recipient: newRecipient,
              };
            });
          }
        }
      }, []);
    return (
         <div>
             <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                 <DialogTitle id="alert-dialog-title">
                     {"Tidligere registrerte familier"}
                 </DialogTitle>
                 <DialogContent>
                     <DialogContentText id="alert-dialog-description">
                         <p>Liste over familier</p>
                     </DialogContentText>
                     <Recipient data={recipientData} handleRecipientChange={handleRecipientChange}/>
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