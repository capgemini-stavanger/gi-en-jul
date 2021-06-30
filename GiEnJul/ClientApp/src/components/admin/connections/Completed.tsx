import { Accordion, AccordionDetails, AccordionSummary, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import Circle from '../common/Circle';
import { Box } from '@material-ui/core';
import ConnectionsField from './ConnectionsField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles
    ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
            alignItems:"center",
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        items: {
            margin:"1em",
        },
        downwardsContainer: {
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
        },
        downwardHeader: {
            display: "flex",
            width: "100%",
            justifyContent:"space-between",
        },
        headerItems: {
            marginRight: "65%",
            marginLeft: "2em",
        
        },
        container: {
            display: "flex",
            width: "100%",
        },
        headerGrid: {

        },
    }),
);

interface ICompletedProps {
    //Need to implement connections dict
    // The information should come from the macrocomponent
}

const Completed: React.FC<ICompletedProps> = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Accordion defaultExpanded>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                justify-content="space between"
                >   
                    <Box display="flex" className={classes.heading} align-items="center">
                        <Typography component="h4" className={classes.items} >FULLFØRTE KOBLINGER</Typography>
                    </Box>
                    <Box display="flex" className={classes.heading} align-items="center">
                        <Circle prop1={"green"}/>
                        <Typography className={classes.items}>Bekreftet</Typography>
                    </Box>
                    <Box display="flex" className={classes.heading} align-items="center" justifyContent="flex-start">
                        <Circle prop1={"yellow"}/>
                        <Typography className={classes.items}>Ikke Bekreftet</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.downwardsContainer}>
                        <Box className={classes.container} justifyContent="flex-end">
                            <Grid container spacing={2}>
                                <Grid item xs>
                                    <Typography component="h2" className={classes.items} >Familie</Typography>
                                </Grid>
                                <Grid item xs></Grid>
                                <Grid item xs></Grid>
                                <Grid item xs></Grid>
                                <Grid item xs>    
                                    <Typography component="h2" className={classes.items} >Giver</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <ConnectionsField personcount={5} recipientnumber={"NAV2ET"} giverfullname={"Johann Boi"} status={false} />
                        <ConnectionsField personcount={3} recipientnumber={"BARNQS"} giverfullname={"Johann Boi"} status={true} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default Completed;