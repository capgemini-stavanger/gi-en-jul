import { Box, Typography } from "@material-ui/core";
import useStyles from "components/admin/dashboard-all/Styles";
import React from "react";
import { Button, Container } from "reactstrap";
import {useState} from "react";

//make interface and props for variables
//make button for OK 

interface IConfirmation {
    task: string,
    handleClose: () => void, 
    //type of confirmation, task string?
}




const ConfirmationBox: React.FC<IConfirmation> = (
    {
        task,
        handleClose,
    }
) => {
    const classes = useStyles();
    const [trigger, setTrigger] = useState(false);

    const handleTrigger =() => {

    }
    
    //make constants for variables needed in pop up box 

    return (
        <>
        <Box>
            <div>
                <Typography>
                    Confirmation message. 
                </Typography>
                <Button onClick={handleClose}>
                    OK
                </Button>
            </div>
        </Box>
        </>
    );
};
export default ConfirmationBox;