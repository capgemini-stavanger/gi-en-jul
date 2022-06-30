 import {
     Box,
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     IconButton,
     Input,
     TextField,
 } from "@material-ui/core";
 import {RecipientType} from "components/shared/Types";
 import ApiService from "common/functions/apiServiceClass";
 import { useEffect, useState} from "react";
 import { DataGrid, GridColDef } from '@material-ui/data-grid';
import EditFamilyDialog from "components/shared/EditFamilyDialog";
import EditIcon from '@material-ui/icons/Edit';

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
    const [familyIdInput, setFamilyIdInput] = useState("");
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editRecipient, setEditRecipient] = useState({} as RecipientType)
 
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

    const onFamilyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFamilyIdInput(e.target.value);
        
        let matchingRecipient = recipientData.find(recipient => recipient.familyId === e.target.value);
        if(matchingRecipient != undefined){
            setEditRecipient(matchingRecipient);
        } else {
            setEditRecipient({} as RecipientType);
        }
    }

    const onEditFamily = () => {
        if(editRecipient["rowKey"]){
            setShowEditDialog(true)
        }
    }

    const refreshData = () => {
        fetchRecipients();
    }
    
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

                <Box sx={{ ml: 5 }}>
                    <TextField
                        type="number"
                        label="Family ID"
                        value={familyIdInput}
                        onChange={onFamilyInputChange}
                        />
                    <IconButton aria-label="expand row" size="small" 
                        onClick={onEditFamily}>
                        <EditIcon/>
                    </IconButton>
                </Box>
                <EditFamilyDialog
                    open={showEditDialog}
                    onClose = {() => { setShowEditDialog(false) }}
                    refreshRecipients={() => refreshData()}
                    recipient={editRecipient}
                />

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