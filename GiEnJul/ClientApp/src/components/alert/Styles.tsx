import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        position: "fixed",
        transform: "translate(-50%, 0)",
        left: "50%",
        top: "15%",
        zIndex: 1600,
        opacity: "90%",
    },
    hide: {
        visibility: "hidden",
        opacity: "0",
        transition: "all .4s",
    }
});

export default useStyles;