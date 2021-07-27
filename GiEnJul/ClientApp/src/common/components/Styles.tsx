import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topButton: {
    position: 'fixed',
    justifyContent: 'center',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    }
  },
  navContainer: {
    backgroundColor: 'transparent',
    position: 'fixed',
    border: 'none',
    boxShadow: 'none',
  },
  smallLogo: {
    marginTop: theme.spacing(2),
    },

  toolBar: {
    justifyContent: 'space-between', 
    marginTop: theme.spacing(2),
  },
  navIcon: {
    color: theme.palette.primary.light, 
  },
  buttonNext:{
    position: 'inherit',
    borderRadius: '20px',
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    textTransform: 'none',
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    }
  },
}));
export default useStyles;