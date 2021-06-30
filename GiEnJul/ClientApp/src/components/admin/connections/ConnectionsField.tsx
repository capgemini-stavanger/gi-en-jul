import { Accordion, AccordionDetails, AccordionSummary, Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import Circle from '../common/Circle';

interface IConnectionsFieldProps {
    personcount: number,
    giverfullname: string,
    recipientnumber: string,
    status: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles
    ({
        root: {
            width: '100%',
            marginTop: '1em',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '50%',
            alignItems:"center",
            justifyContent: "flex-start",
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '50%',
            alignItems:"center",
            justifyContent: "flex-end",
        },
        items: {
            margin: "1em",
            flexBasis: "33,33%",
        },
        colorBox: {
            alignItems:"center",
            justifyContent: "flex-end", 
            flexBasis: "33,33%",
        },
    }),
);

const ConnectionsField: React.FC<IConnectionsFieldProps> = (props) => {

    const classes = useStyles();
  return(
    <div className={classes.root}>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
                <Box className={classes.heading} display="flex" >
                    <Typography className={classes.items}>{props.recipientnumber}</Typography>
                    <Typography className={classes.items}>Antall: {props.personcount}</Typography>
                </Box>
                <Box className={classes.secondaryHeading} display="flex" >
                    <Typography className={classes.items} >{props.giverfullname}</Typography>
                    <Box className={classes.colorBox} display="flex">
                        {props.status ? <Circle prop1={"green"}/> : <Circle prop1={"yellow"}/> }
                        <Typography className={classes.items}>{props.status ? "Bekreftet" : "Ikke Bekreftet"}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box width="100%" display="flex" flex-grow="1">
                   <Typography>Information should go here when we know how we will store it in the frontend</Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    </div>
    );
}

export default ConnectionsField;
