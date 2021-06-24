import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    section: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(4),
    },
  }));

  export default useStyles;