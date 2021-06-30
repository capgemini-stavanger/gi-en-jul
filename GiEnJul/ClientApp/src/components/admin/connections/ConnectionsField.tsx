import { Accordion, AccordionDetails, AccordionSummary, Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';

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
                    <Typography className={classes.items}>{props.status ? "Bekreftet" : "Ikke Bekreftet"}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box width="100%" display="flex" flex-grow="1">
                    <div >Familie</div>
                    <div margin-left="100px">Giver</div>
                </Box>
            </AccordionDetails>
        </Accordion>
    </div>
    );
}

export default ConnectionsField;
