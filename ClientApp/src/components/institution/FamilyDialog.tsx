 import {
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
 } from "@material-ui/core";
 import {RecipientType, SelectedConnectionType} from "../../common/components/Types";
 import ApiService from "../../common/functions/apiServiceClass";
 import { useEffect, useState, useCallback} from "react";
 import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {field: "id", headerName: "Familie ID", type: "number", width: 200}, 
    {field: "refId", headerName: "Referanse ID", width: 200}, 
    {field: "contactName", headerName: "Kontaktperson navn", width: 200},
    {field: "contactMail", headerName: "Kontaktperson mail", width: 200},
    {field: "contactPhone", headerName: "Kontaktperson nummer", width: 200},
];

interface IFamilyDialog{
     open: boolean;
     accessToken: string;
     institution?: string;
     handleClose : () => void;
 }
 
const FamilyDialog: React.FC<IFamilyDialog> = ({ open, accessToken,institution, handleClose}) => {

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
    
    let rows = [];
    for(let i = 0; i<recipientData.length; i++){
        rows[i] = {id: recipientData[i].familyId, refId: recipientData[i].referenceId, contactName: recipientData[i].contactFullName, contactMail: recipientData[i].contactEmail, contactPhone: recipientData[i].contactPhoneNumber};
    }
    return (
         <div>
             <Dialog fullWidth={true} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                 <DialogTitle id="alert-dialog-title">
                     {"Tidligere registrerte familier"}
                 </DialogTitle>
                 <DialogContent style={{height:'800px'}}>
                    <DataGrid
                     rows={rows}
                     columns={columns}
                     autoPageSize
                     pagination
                     />
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