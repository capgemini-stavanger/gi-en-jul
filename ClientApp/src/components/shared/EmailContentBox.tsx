import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
    TableRow,
    TableCell,
    Box,
    Table,
    TableBody,
    TableHead,
    Input,
    Select,
    MenuItem,
    Snackbar,
    IconButton,
  } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import getGender from "common/functions/GetGender";
import { PersonType, RecipientType } from "components/shared/Types";
import Gender from "common/enums/Gender";
import { GENDERS } from "common/constants/Genders";
import ApiService from "common/functions/apiServiceClass";
import { Alert } from "@material-ui/lab";
import { useAuth0  } from "@auth0/auth0-react";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "components/admin/Styles";
import {DefaultEditor} from "react-simple-wysiwyg"

interface IEditFamilyDialog {
    open: boolean;
    text: string;
}

    const EditEmailContent: FC<IEditFamilyDialog> = ({ }) => {
        

     }

    export default EditEmailContent;
