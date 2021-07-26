import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: 'white'
  }, 

}));
export default useStyles;