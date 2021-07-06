import { Alert, AlertProps } from '@material-ui/lab';
import React, { FC } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import useStyles from './Styles';


interface IAlertHover extends AlertProps {
    fadeTime?: number,  // Defaults to 4000 ms
    className?: string,
    children?: React.ReactNode,

    // Use setChildren property to reset the childen after hiding the alert. 
    // This function run 400 ms after the alert starts to hide.
    // This property is necessary for rerendering the alert with the same message.
    // Throws an error if the children property is set, but not the setChildren property.
    setChildren?: React.Dispatch<React.SetStateAction<React.ReactNode>>,
    
    id?: string,
    onClose?: (event: any) => void,
}

const AlertHover: FC<IAlertHover> = ({
    fadeTime,
    className,
    children,
    setChildren,
    id,
    onClose,
    ...rest
}) => {
    const classes = useStyles();

    const [viewAlert, setViewAlert] = useState(false);
    const [,setTimer] = useState<NodeJS.Timeout | undefined>();

    const extendedOnClose = (event: any) => {
        setViewAlert(false);
        if (onClose) onClose(event);
    }

    useEffect(() => {
        if (!children) return;
        setViewAlert(true);
        setTimer(t => {
            if (t) clearTimeout(t);
            return setTimeout(() => {
                setViewAlert(false);
                if (setChildren) setTimeout(() => setChildren(""), 400);
            }, fadeTime ? fadeTime : 4000);
        });
    }, [children, fadeTime, setViewAlert, setTimer, setChildren]);

    useEffect(() => {
        if (children && !setChildren) {
            throw Error("Cannot use the children property without the setChildren property. See documentation.");
        }
    })

    return (
        <Alert 
        id={`_alertHover ${id ? id : ""}`}
        className={`${classes.root} ${className} ${!viewAlert ? classes.hide : ""}`} 
        onClose={extendedOnClose}
        {...rest}>
            {children}
        </Alert>
    )
}

export default AlertHover;
