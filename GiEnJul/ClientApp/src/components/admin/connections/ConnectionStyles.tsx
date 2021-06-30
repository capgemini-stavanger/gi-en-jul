import { makeStyles, createStyles, Theme } from '@material-ui/core';

const ConnectionStyle = makeStyles((theme: Theme) =>
    createStyles
    ({
        root: {
            width: '100%',
            fontWeight: "bold",
            "& .MuiTypography-body1": {
                color: "000000",
            },
            "& #filterText":{
                borderBottom: "0.2em solid",
                borderBottomColor: "#e6e6e6",
            },
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '50%',
            flexShrink: 0,
            alignItems:"center",
        },
        confirmedBox: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '50%',
            alignItems: "center",
        },
        items: {
            margin:"1em",
            fontWeight: "bold",
            fontSize: "1.5em",
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
        accordion: {
            "& #ConnectionsAccord": {
                backgroundColor: "#e6e6e6",
                fontColor: "FFFFFF",
            }
        },
        searchBoxL: {
            flexBasis: "50%",
            justifyContent: "flex-start",
        },
        searchBoxR: {
            flexBasis: "50%",
            justifyContent: "flex-end",
        },
        filterItem: {
            marginLeft: "1em",
            flexBasis: '33.33%',
        },
    }),
);

export default ConnectionStyle;